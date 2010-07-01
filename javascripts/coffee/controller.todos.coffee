class TodosController extends Controller
   constructor: ->
      # We set the item for the type of object the controller maintains
      # by storing an instance of that model as a property of the
      # controller.
      @item: new Todo()
      
      # The form property stores a jQuerytized instance of our form
      # object embedded on the page.
      @form: false
      
      # The cell object stores a representation of a cell node we use
      # to render that object.
      @cell: false
      
      # We call the controller super method to setup any simple bindings
      # for inherited functionality.
      super()
   
   # Renders a list of the controllers element.
   index: () ->
      super @item.all()
   
   # Use this to override or add additional behavior to how items are
   # rendered as cells.
   build_cell: (idx,item) ->
      super(idx,item)
      if item?
         if item.pending
            @cell.addClass("selected")
         else
            @cell.removeClass("selected")
         @cell.click( (event) =>
            if @list.hasClass("delete")
               this.destroy_cell(idx)
            else
               this.check_cell(idx)
            false
      )
      console.log "Cell successfuly created!"
   
   # Pass a css selector to grab the form object you want to bind
   # the controller to.
   set_form: (selector) ->
      @form: $(selector)
      super()
         
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
   
   # Saves or updates the controller's item
   process_form: (event) ->
      @item: super event
      if @item.save()
         this.set_item this.new_item()
      this.index()
      false
   
   # Destroys a cell.
   destroy_cell: (idx) ->
      super idx
   
   # Marks a cell as pending.
   check_cell: (idx) ->
      item: @item.find(idx)
      if !item.pending
         console.log('Enabled item.')
         item.pending: true
         @list.find("#todo_${idx}").addClass('selected')
      else
         console.log('Disabled item.')
         item.pending: false
         @list.find("#todo_${idx}").removeClass('selected')
      item.save()