class Model
   constructor: (params) ->
      params: {} if !params?
      for attribute, default_value of @attributes
         this[attribute]: params[attribute] || default_value
   
   # Grabs and parses JSON data from local storage.
   data: ->
      storage: localStorage.getItem @table_name
      try
         @items: JSON.parse(storage)
      catch error
         alert error
         @items: {idx:0}
      @items
   
   # Converts JSON data to string and saves to local storage.
   commit: (table) ->
      localStorage.setItem(@table_name, JSON.stringify(table))
   
   # Will create or update the current object as a JSON object 
   # provided an index is passed or not.
   save: ->
      table: this.data()
      item: {}
      for attribute, default_value of @attributes
         item[attribute]: this[attribute]
      console.log "Index is currently set to ${@idx}"
      if @idx == "false" || !@idx
         console.log "New record."
         @idx: table.idx+1
         table.idx: @idx
      table[@idx]: item
      console.log "Attempted to save item at index: ${@idx}"
      this.commit table
      true

   # Removes the current object from the JSON object.
   destroy: ->
      table: this.data()
      #delete table[@idx]
      this.commit table
         
   # Finds a specific json object at the requested index.
   find: (idx) ->
      table: this.data()
      item: table[idx]
      if item?
         attributes: {}
         for attribute, default_value of @attributes
            if attribute == "idx"
               attributes[attribute]: idx
            else   
               attributes[attribute]: item[attribute]
         return eval("new ${@class_name}(attributes)")
      else
         return false
   
   # An alias for data()
   all: ->
      this.data()