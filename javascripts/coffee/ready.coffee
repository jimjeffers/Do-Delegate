$(document).ready( ->
   # Bind keyboard navigation.
   $("#content section > ul > li").keyboardable().clickable()
   
   # Handle specific task actions.
   key_actions: {
      'a#delete': 'd'
      'a#today':  't'
      'a#move':   'm'
      'a#send':   's'
      'a#back':   'h'
      'a#back':   'b'
   }
   
   # Bind html objects to key codes.
   for selector, key of key_actions
      $(document).bind('keydown', key, ->
         window.location: $(selector).attr("href") if $(selector).length > 0
      )
   
   # Initialize a blank Todo object.
   todo: new Todo()
   
   # Setup a todos controller and bind it to the inline form on the page.
   todo_controller: new TodosController()
   todo_controller.set_form(".edit-area form")
   todo_controller.set_list(".tasks")
   todo_controller.set_cell(".todo")
   todo_controller.index()
)