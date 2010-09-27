jQuery.fn.selectable = (options) ->
   # Settings
   # ------------------------------------------------
   # *   selected_class: Determines if elements are selected on the list.
   # *   completed_class: The class that represents an item has been completed.
   # *   active_class: The mode that denotes that selections incur a
   #     a state change for the selected tasks.
   # *   completed_mode: The mode that actually handles completion.
   # *   modifier_element_class: A CSS class used to select the list element(s)
   #     on the page. This is used to determine the current modifier mode for
   #     selected actions.
   defaults =
      selected_class:            "selected"
      completed_class:           "completed"
      active_class:              "active"
      completed_mode:            "do"
      modifier_element_class:    "tasks"
   
   settings = jQuery.extend(defaults,options)
   
   # Custom Event: Selectable
   # ------------------------------------------------ 
   # Define the SelectableEvent object to the global namespace.
   window.SelectableEvent = class SelectableEvent
      # Create static types to keep event listeners DRY.
      @SELECTED:     "selectable_selected"
      @DESELECTED:   "selectable_deselected"
      @COMPLETED:    "selectable_completed"
      @UNDONE:       "selectable_undone"
      constructor: (element, type) ->
         @element    = element
         @id         = element.attr("id")
         @type       = type
      
   
   # Implementation
   # ------------------------------------------------
   $(this).each( ->
      item = $(this)
      if settings.modifier_element_class
         modifier_element = $(".#{settings.modifier_element_class}")
      item.click( (event) ->
         selected_item = $(this)
         if modifier_element and modifier_element.hasClass(settings.completed_mode)
            selected_item.parent().addClass(settings.active_class)
            $.getJSON(selected_item.attr("href"), ((data) ->
               if data['new_path']
                  selected_item.attr("href", data.new_path)
               if data['object']
                  if data.object.task.aasm_state == "completed"
                     selected_item.parent().addClass(settings.completed_class)
                     item.trigger(SelectableEvent.COMPLETED, new SelectableEvent(item,SelectableEvent.COMPLETED))
                  else
                     selected_item.parent().removeClass(settings.completed_class)
                     item.trigger(SelectableEvent.UNDONE, new SelectableEvent(item,SelectableEvent.UNDONE))
                  selected_item.parent().removeClass(settings.active_class)
            ))
         else
            if selected_item.parent().hasClass(settings.selected_class)
               item.trigger(SelectableEvent.DESELECTED, new SelectableEvent(item,SelectableEvent.DESELECTED))
               selected_item.parent().removeClass(settings.selected_class)
            else
               item.trigger(SelectableEvent.SELECTED, new SelectableEvent(item,SelectableEvent.SELECTED))
               selected_item.parent().addClass(settings.selected_class)
         false
      )
   )