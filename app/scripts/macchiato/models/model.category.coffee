class Category extends Model
   constructor: (params) ->
      @class_name: 'Category'
      @table_name: 'categories'
      @attributes: {
         name:    ''
      }
      super params