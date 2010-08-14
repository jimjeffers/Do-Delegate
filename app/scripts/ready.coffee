$(document).ready( ->
   # Set the modifier controls for altering tasks if the
   # such menu is present on the current page.
   $("#edit").edit_navigation({list_selector: '.tasks'})
   
   # Allow task items to be selectable.
   $("ul.tasks > li.task a").selectable({modifier_element_id: 'tasks_list'})
)