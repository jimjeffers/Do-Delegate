class EditNavigationController extends NavigationController
   constructor: (params)->
      @attributes: {
         edit_form_controller: null
      }
      super params

   # Adds a form controller that can be referenced by the
   # navigation controller.
   edit_form_controller: (form_controller) ->
      if form_controller?
         @edit_form_controller: form_controller
   
   # Overides the hook method in the super class to only return true if
   # the list controller isn't being modified. By returning false
   # we intercept the click event and prevent it from firing. This is to
   # prompt the user in order to prevent them from losing any unsaved 
   # changes.
   before_change: ->
      if @list_controller.modified()
         if confirm("You have made changed would you like to discard them?")
            return true
         else
            return false
      else
         return true