class Todo extends Model
   constructor: (params) ->
      @class_name: 'Todo'
      @table_name: 'todos'
      @attributes: {
         name:       ''
         status:     'normal'
         link:       null
         completed:  false
         today:      false
         sent_to:    null
      }
      super params
   
   # Toggle the current item from the completed state.
   complete: ->
      if !@completed
         @completed: true
      else
         @completed: false
      this.save()
      return @completed