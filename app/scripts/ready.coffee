$(document).ready( ->
   
   # Initialize Components
   # ---------------------------------------------------
   edit_nav       = new Navigation("#edit")
   todo_list      = new List("ul.tasks")
   edit_area      = new EditArea("section#edit-area")
   
   # Event Handlers
   # ---------------------------------------------------
   navigation_change_handler = (event, navigation_event) ->
      if edit_area.change navigation_event.mode
         todo_list.change(navigation_event.mode, navigation_event.previous_mode)
      else
         edit_nav.revert()
   
   list_change_handler = (event, selectable_event) ->
      title = $("title").html()
      $("title").html(title.replace(/\d\/\d/, "#{todo_list.remaining()}/#{todo_list.total()}"))
   
   selection_handler = (event, selectable_event) ->
      edit_area.add_item(selectable_event.id)
   
   deselection_handler = (event, selectable_event) ->
      edit_area.remove_item(selectable_event.id)
   
   # Bind Event Listeners
   # ---------------------------------------------------
   $(edit_nav).bind(          NavigationEvent.CHANGED,      navigation_change_handler)
   $(todo_list).bind(         SelectableEvent.COMPLETED,    list_change_handler)
   $(todo_list).bind(         SelectableEvent.UNDONE,       list_change_handler)
   $(todo_list).bind(         SelectableEvent.SELECTED,     selection_handler)
   $(todo_list).bind(         SelectableEvent.DESELECTED,   deselection_handler)
   
)