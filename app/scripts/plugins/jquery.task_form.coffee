jQuery.fn.task_form: (options) ->
   # Settings
   # ------------------------------------------------
   # *   task_class: Determines if elements representing a task on the page.

   defaults: {
      task_class:            "task"
   }
   settings: jQuery.extend(defaults,options)
   $(this).each( ->
      form: $(this)
      category_id: form.find("#category").val()
      form.submit( (event) ->
         $.post("/categories/${category_id}/tasks/", form.serialize(), ((data) ->
               if data.task
                  $("#task_name").val("")
                  list:       $("#category_${category_id}")
                  new_task:   list.find(".${settings.task_class}:last-child").clone()
                  new_task.find("a").html(data.task.name).attr("href","/categories/${data.task.category_id}/tasks/${data.task.id}/complete").selectable()
                  new_task.addClass("completed").attr("style","").removeClass("selected")
                  list.append(new_task)
                  setTimeout(( -> 
                     new_task.removeClass("completed")
                  ), 100)
         ), "json")
         false
      )
   )