class TodosListController extends ListController
   constructor: (params) ->
      # We set the item for the type of object the controller maintains
      # by storing an instance of that model as a property of the
      # controller.
      @item: new Todo()
      
      # Custom attributes.
      @attributes: {
         mod_modes: ["delete","move","send","today"]
      }
      
      # We call the controller super method to setup any simple bindings
      # for inherited functionality.
      super params
   
   # Custom behaviors can be added here.
   # ------------------------------------------------------------
      
   # Marks a cell as pending.
   check_cell: (idx) ->
      item: @item.find(idx)
      unless this.is_modifying()
         if item.complete()
            console.log('Enabled item.')
            @list.find("#todo_${idx}").addClass(@selected_class)
         else
            console.log('Disabled item.')
            @list.find("#todo_${idx}").removeClass(@selected_class)
      else
         @list.find("#todo_${idx}").toggleClass(@selected_class)
   
   # Returns a cache of modified cells.
   is_modifying: () ->
      for mode in @mod_modes
         return true if @list.hasClass(mode)
      false
   
   modified: ->
      if @list.find(".${@selected_class}").length > 0 and this.is_modifying()
         return true
      else
         return false
   
   # Callbacks for inherited methods from ListController.
   # Feel free to override or add your own
   # ------------------------------------------------------------
   
   # Sets a list object for the controller.
   set_list: (selector) ->
      super selector
   
   # Sets an HTML object to be used as a cell for displaying instances of the item.
   set_cell: (selector) ->
      super selector
      
   # Sets the passed item as the current item property of the class.
   # Additionally, this binds that specific item to the controllers form.
   set_item: (item) ->
      super item
   
   # This is just a callback to implement functionality from the 
   # controller superclass.
   new_item: (attributes) ->
      super attributes
   
   # Renders a list of the controllers element.
   index: () ->
      super @item.all()
      
   # Use this to override or add additional behavior to how items are
   # rendered as cells.
   build_cell: (idx,item) ->
      super(idx,item)
      if item?
         if item.completed and this.is_modifying()
            this.do_not_index(idx)
         else if item.completed
            @cell.addClass(@selected_class)
         else
            @cell.removeClass(@selected_class)
         @cell.click( (event) =>
            this.check_cell(idx)
            false
      )
         
   # Destroys a cell.
   destroy_cell: (idx) ->
      super idx