jQuery.fn.clickable: (options) ->
   # Take in some basic defaults to allow for an override of the class we toggle
   # to mark the object as selected.
   defaults: {
      class_selected:  "selected"
      selector:        "a"
   }
   settings: jQuery.extend(defaults,options)
   
   # Add a click event to each item. Toggle the on class on or off and then fire
   # a click action on the first link we find inside of that object.
   $(this).each( ->
      $(this).click( (event) ->
         item: $(this)
         link: $(item.find(settings.selector).get(0))
         if item.hasClass(settings.class_selected)
            item.removeClass(settings.class_selected)
         else
            item.addClass(settings.class_selected)
         if event.target.tagName != settings.selector.toUpperCase()
            link.click( (event) ->
               window.location: link.attr("href") if link.attr("href") and link.attr("href") != "#"
               event.stopPropagation()
            )
            link.click()
      )
   )
   