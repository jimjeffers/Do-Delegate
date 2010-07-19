class Model
   constructor: (params) ->
      @type: "model"
      params: {} if !params?
      @attributes: jQuery.extend({
         idx: null
      }, @attributes)
      for attribute, default_value of @attributes
         this[attribute]: params[attribute] || default_value
   
   belongs_to: (model) ->
      if model.type == "model"
         @parent_model: model
         @parent_model_class_name: model.class_name
            
   # An alias for to make _data() accessible to the public API.
   all: ->
      this._data()

   # Create or updates the current object as a JSON object 
   # provided an index is passed or not.
   save: ->
      table: this._data()
      item: {}
      for attribute, default_value of @attributes
         item[attribute]: this[attribute]
      console.log "Index is currently set to ${@idx}"
      if !@idx?
         console.log "New record."
         @idx: this._increment()
      table[@idx]: item
      console.log "Attempted to save item at index: ${@idx}"
      this._commit table
      true

   # Removes the current object from the JSON object and commits
   # the changes to local storage.
   destroy: ->
      table: this._data()
      console.log @idx
      console.log(table[@idx])
      delete table[@idx]
      this._commit table

   # Finds a specific JSON object at the requested index.
   find: (query) ->
      table: this._data()
      if query?
         if typeof(query) == "string"
            item: table[query]
            if item?
               attributes: {}
               for attribute, default_value of @attributes
                  if attribute == "idx"
                     console.log("Setting index to: ${query}")
                     attributes[attribute]: query
                  else   
                     attributes[attribute]: item[attribute]
               return eval("new ${@class_name}(attributes)")
            else
               return null
         else if typeof(query) == "object"
            for idx, record of table
               for attribute, value of query
                  delete table[idx] if record[attribute]? and record[attribute] != value
                  return
            return table
      else
         return null
   
   # Returns a JSON object parsed from a string stored in
   # the web browsers local storage. The key used to reference
   # this object is stored in the @table_name attribute in a 
   # model.
   _data: ->
      storage: localStorage.getItem @table_name
      try
         items: JSON.parse(storage)
      catch error
         alert error
         items: {}
      items
   
   # Stringifies a JSON object and stores it by creating or
   # overwriting a string assigned to the key specified in
   # @table_name for the given model.
   _commit: (table) ->
      localStorage.setItem(@table_name, JSON.stringify(table))
   
   # Increments the current index value.
   _increment: ->
      localStorage.setItem("${@table_name}_idx",this._index()+1)
      return this._index();
   
   # Returns the current index value stored in a separate local
   # storage string under the value #{@table_name}_idx for example:
   # "users_idx" for a class with @table_name: "users"
   _index: ->
      index: localStorage.getItem("${@table_name}_idx")
      if !index?
         localStorage.setItem("${@table_name}_idx",1)
         index: 1
      return parseInt index