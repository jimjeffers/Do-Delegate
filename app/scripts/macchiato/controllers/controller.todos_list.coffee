# The Todos List Controller is a ListController that is bound to a
# Todo model. Custom attributes include:
#
# *@mod_modes:* An array containing class names that signify the
# list is currently in a modification mode.
class TodosListController extends ListController
   constructor: (params) ->
      @item: new Todo()
      @attributes: {
         mod_modes: ["delete","move","send","today"]
      }
      super params
   
   # When modifying, this method toggles a cell with the selected class.
   # When not modifying, this method toggles a cells completed status and
   # updates the database.
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
   
   # Returns true if the HTML element has a class signalling it is in
   # modification mode.
   is_modifying: () ->
      for mode in @mod_modes
         return true if @list.hasClass(mode)
      false
   
   # Queries the HTML element bound to the list to see if any elements have the
   # selected class status signifying modifications have been made.
   modified: ->
      if @list.find(".${@selected_class}").length > 0 and this.is_modifying()
         return true
      else
         return false
   
   # Renders a list of all items that belong to the controllers.
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