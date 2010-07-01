class Todo extends Model
   constructor: (params) ->
      # Maybe there is a way to do this with metaprogramming
      # but for now we'll need to specify the name of the object
      # and the table like this.
      @class_name: 'Todo'
      @table_name: 'todos'
      
      # Declare the attributes for this object here in an hash.
      # Keys are the properties and values are their defaults.
      @attributes: {
         name:    ''
         status:  'normal'
         link:    false
         pending: false
         idx:     false
      }
      
      # The model object will now build us something nice with
      # the properties we've just set.
      super params
   
   # These callbacks are
   data: ->
      super()
      
   save: ->
      super()
      
   find: (idx) ->
      super idx
   
   all: ->
      super()
   
   destroy: ->
      super()