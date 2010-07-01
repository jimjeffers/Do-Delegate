class Category extends Model
   constructor: (params) ->
      # Maybe there is a way to do this with metaprogramming
      # but for now we'll need to specify the name of the object
      # and the table like this.
      @class_name: 'Category'
      @table_name: 'categories'
      
      # Declare the attributes for this object here in an hash.
      # Keys are the properties and values are their defaults.
      @attributes: {
         name:    ''
         idx:     false
      }
      
      # The model object will now build us something nice with
      # the properties we've just set.
      super params
      
   data: ->
      super @table_name
      
   save: ->
      super @idx
   
   find: (idx) ->
      super idx