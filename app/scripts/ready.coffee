$(document).ready( ->
   # Set the modifier controls for altering tasks if the
   # such menu is present on the current page.
   $("#edit").edit_navigation({list_selector: '.tasks'})
   
   # Allow task items to be selectable.
   $("ul.tasks > li.task a").selectable()
      
   # Bind to any task forms that may exist on the page.
   $("#task_form").task_form()
   
   # Bind to any project forms that may exist on the page.
   $("#new_category").category_form({list_selector: "ul.projects"})
)