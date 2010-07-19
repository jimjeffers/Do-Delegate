class TodoFormController extends FormController
   constructor: (params) ->
      @item: new Todo()
      super params
   
   # Saves or updates the controller's item. Returns false to stop
   # the form submission from propogating.
   process_form: (event) ->
      @item: super event
      if @item.save()
         this.set_item this.new_item()         
         if @list_controller?
            @list_controller.index()
      false