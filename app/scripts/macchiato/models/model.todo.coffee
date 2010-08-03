class Todo extends WebModel
   constructor: (params) ->
      @class_name: 'Task'
      @table_name: 'tasks'
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
         this.send_as('completed')
      else
         this.send_as('undo')
      return @completed