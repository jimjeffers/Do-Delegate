$(document).ready( ->
   # Set the modifier controls for altering tasks if the
   # such menu is present on the current page.
   
   # Initialize Components
   # ---------------------------------------------------
   edit_navigation   = new Navigation("#edit")
   todo_list         = new List("ul.tasks")
   
   # Event Handlers
   # ---------------------------------------------------
   navigation_change_handler = (event, navigation_event) ->
      todo_list.change(navigation_event.mode, navigation_event.previous_mode)
   
   # Bind Event Listeners
   # ---------------------------------------------------
   $(edit_navigation).bind(NavigationEvent.CHANGED, navigation_change_handler)
   
   # Bind to any task forms that may exist on the page.
   $("#task_form").task_form()
   
   # Bind to any project forms that may exist on the page.
   $("#new_category").category_form(
      list_selector: "ul.projects"
   )
)