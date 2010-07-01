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
         name:       ''
         status:     'normal'
         link:       false
         completed:  false
         idx:        false
      }
      
      # The model object will now build us something nice with
      # the properties we've just set.
      super params
   
   # Custom behaviors should go in this area.
   # ------------------------------------------------------------
   
   # Toggle the current item from the completed state.
   complete: ->
      if !@completed
         @completed: true
      else
         @completed: false
      this.save()
      return @completed
   
   # Callbacks/Overrides should go in this area.
   # ------------------------------------------------------------
   # These callbacks are just hooks to the super class. You need
   # to have these declared in order to get this behavior from
   # the current object. But luckily, if you wanted to do something
   # extra before or after the core event fires you can add your
   # own logic to these functions here.
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