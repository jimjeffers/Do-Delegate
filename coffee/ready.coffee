$(document).ready( ->
   # Setup a todos list controller to display current todos.
   todos_list: new TodosListController({
      list_selector: "ul.tasks"
      cell_selector: "li.todo"
   })
   
   # Setup a todo form and bind it to the inline form on the page.
   todo_form: new TodoFormController({
      form_selector:    "#task_form"
      list_controller:  todos_list
   })
   
   # Setup a navigation controller to mimick navigation.
   todo_edit_nav: new EditNavigationController({
      navigation_selector: "section#edit"
      target_selector:     "body, ul.tasks"
      list_controller:     todos_list
      default_item:        "do"
   })
)