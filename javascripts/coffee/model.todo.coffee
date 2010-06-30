class Todo
   constructor: (params) ->
      @name: params['name'] || false
      @status: params['status'] || 'normal'
      @link: params['link'] || false
      @pending: params['pending'] || false
      @idx: params['idx'] || false
      
   data: ->
      storage: localStorage.getItem 'todos'
      alert storage
      if storage?
         todos: JSON.parse(storage)
      else
         todos: {idx:0}
      todo
      
   save: ->
      todo: { 
         name: @name
         status: @status
         link: @link
         pending: @pending
      }
      todos: this.data()
      @idx: todos.idx+1 if !@idx
      alert @idx
      todos[@idx]: todo
      todos.idx = @idx
      localStorage.setItem('todos', JSON.stringify(todos))
      
   find: (idx) ->
      todo: object[idx]
      if todo?
         return new Todo({
            name: todo.name
            status: todo.status
            link: todo.link
            pending: todo.pending
            index: idx
         })
      else
         return false

