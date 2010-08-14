jQuery.fn.edit_navigation: (options) ->
   # Settings
   # ------------------------------------------------
   # *   link_selector: CSS selector used to find the link elements in the navigation.
   # *   list_selector: Allows you to pass a CSS selector for an associate list
   #     element.
   # *   selected_class: Determines if elements are selected on the list.
   # *   completed_mode: The mode that actually handles completion. Tasks that are selected in this
   #     state are toggled to a completed class in the modifier modes.
   # *   completed_class: The class used to persist completed tasks while a modifier is in use.
   # *   confirmation_message: A string displayed if we want to confirm the discarding of changes.
   defaults: {
      link_selector:          "a"
      list_selector:          false
      selected_class:         "selected"
      completed_mode:         "do"
      completed_class:        "completed"
      confirmation_message:   "You have made several changes are you sure you want to discard them?"
   }
   settings: jQuery.extend(defaults,options)
   
   # Add a click event to each item. Toggle the on class on or off and then fire
   # a click action on the first link we find inside of that object.
   $(this).each( ->
      nav: $(this)
      links: nav.find(settings.link_selector)
      if settings.list_selector
         list: $(settings.list_selector)
      else
         list: false
      
      # Everything happens in the click handler for the nav items links.
      links.click( (event) ->
         selected_link: $(this)
         if !nav.hasClass(selected_link.attr("id"))
            
            # A long condition here. We check for the existance of a managed list.
            # We only allow submission if there is no list, or if the list has no 
            # selected items. If there is a list and there are selected items we
            # use a javascript confirm to ensure the user really wants to move on.
            if !list or 
               list.find(".${settings.selected_class}").length == 0 or 
               list.hasClass(settings.completed_mode) or
               list.find(".${settings.selected_class}").length > 0 and confirm(settings.confirmation_message)
               if selected_link.attr("id") != ""
                  
                  # Manage list nodes if they exist.
                  if list
                     
                     # If we're switching out of the completed mode we'll convert selected elements to completed 
                     # elements so that they'll perist.
                     if selected_link.attr("id") != settings.completed_mode and list.hasClass(settings.completed_mode)
                        list.find(".${settings.selected_class}").addClass(settings.completed_class).removeClass(settings.selected_class)
                     
                     # If we're switching back to the completed mode we'll convert the completed elements back to
                     # selected elements. But we'll do this after we undo all of the selected items
                     else if selected_link.attr("id") == settings.completed_mode and !nav.hasClass(settings.completed_mode)
                        list.find(".${settings.selected_class}").removeClass(settings.selected_class)
                        list.find(".${settings.completed_class}").removeClass(settings.completed_class).addClass(settings.selected_class)
                     
                     # If we're switching between modifiers we'll only need to ensure the selected elements are reset.
                     else
                        list.find(".${settings.selected_class}").removeClass(settings.selected_class)
                  
                  # This loop updates the class of the nav and it's associated list object depending
                  # on the current nav item selected.
                  for managed_element in [nav, list]
                     if managed_element
                        for link in links
                           managed_element.removeClass($(link).attr("id"))
                        managed_element.addClass(selected_link.attr("id"))
         
         # Stop event propogation.
         false
      )
   )
