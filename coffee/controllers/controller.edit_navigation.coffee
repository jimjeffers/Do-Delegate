class EditNavigationController extends NavigationController
   constructor: (params)->
      @attributes: {
         edit_form_controller: null
      }
      
      super params
   
   # Custom behaviors can be added here.
   # ------------------------------------------------------------

   # Adds a form controller that can be referenced by the
   # navigation controller.
   edit_form_controller: (form_controller) ->
      if form_controller?
         @edit_form_controller: form_controller
   
   # Callbacks for inherited methods from NavigationController.
   # Feel free to override or add your own
   # ------------------------------------------------------------
   set_navigation: (selector) ->
      super selector
   
   set_button: (selector) ->
      super selector
   
   set_target: (selector) ->
      super selector
   
   select: (event) ->
      super event
   
   before_change: ->
      if @list_controller.modified()
         if confirm("You have made changed would you like to discard them?")
            return true
         else
            return false
      else
         return true
   
   new_item: (attributes) ->
      super attributes