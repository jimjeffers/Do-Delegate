jQuery.fn.selectable: (options) ->
   # Settings
   # ------------------------------------------------
   # *   selected_class: Determines if elements are selected on the list.
   # *   completed_mode: The mode that actually handles completion.
   defaults: {
      selected_class:         "selected"
      active_class:           "active"
      completed_mode:         "do"
      modifier_element_id:    false
   }
   settings: jQuery.extend(defaults,options)
   
   $(this).each( ->
      item: $(this)
      if settings.modifier_element_id
         modifier_element: $("#${settings.modifier_element_id}")
      item.click( (event) ->
         selected_item: $(this)
         if modifier_element and modifier_element.hasClass(settings.completed_mode)
            selected_item.parent().addClass(settings.active_class)
            $.getJSON(selected_item.attr("href"), ((data) ->
               if data['new_path']
                  selected_item.attr("href", data.new_path)
               if data['object']
                  if data.object.task.aasm_state == "completed"
                     selected_item.parent().addClass(settings.selected_class)
                  else
                     selected_item.parent().removeClass(settings.selected_class)
                  selected_item.parent().removeClass(settings.active_class)
            ))
         else
            if selected_item.parent().hasClass(settings.selected_class)
               selected_item.parent().removeClass(settings.selected_class)
            else
               selected_item.parent().addClass(settings.selected_class)
         false
      )
   )