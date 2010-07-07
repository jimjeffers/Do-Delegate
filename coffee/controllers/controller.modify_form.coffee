class TodoFormController extends FormController
   constructor: (params) ->
      # We set the item for the type of object the controller maintains
      # by storing an instance of that model as a property of the
      # controller.
      @item: new Todo()
      
      # We call the controller super method to setup any simple bindings
      # for inherited functionality.
      super params
   
   # Custom behaviors can be added here.
   # ------------------------------------------------------------
   

   # Callbacks for inherited methods from ListController.
   # Feel free to override or add your own
   # ------------------------------------------------------------
   
   # Pass a css selector to grab the form object you want to bind
   # the controller to.
   set_form: (selector) ->
      super selector
      
   # Sets the passed item as the current item property of the class.
   # Additionally, this binds that specific item to the controllers form.
   set_item: (item) ->
      super item
   
   # Sets a list controller to the form object.
   set_list_controller: (list_controller) ->
      super list_controller
      
   # Saves or updates the controller's item
   process_form: (event) ->
      # Comment out super event if you do not want to edit or create a record.
      # @item: super event
      
      # Stop the form event from propogating.
      false