jQuery.fn.keyboardable: (options) ->
   # Take in some basic defaults. I'm using the jquery.hotkeys module to allow us
   # to define keys in plain english instead of by keyCode. So we can say "return"
   # instead of "13". It makes life easier and allows us to use combinators easily
   # so we could say "shift+up" or "ctrl+up" rather than "up".
   defaults: {
      class_active:  "active"
      key_next:      "down"
      key_previous:  "up"
      key_click:     "space"
   }
   settings: jQuery.extend(defaults,options)
   
   # KeyboardNavigation class stores the objects passed to the plugin. It stores 
   # the current item and marks items as selected or deselected as you traverse
   # through them with the keyboard.
   class KeyboardNavigation
      constructor: (objects) ->
         @objects: objects
         @index: false
         @active: false
         
         # Here we bind the key events to the document so that they have a 
         # global effect on the user's keyboard input.
         $(document).bind('keydown', settings.key_next, => @next())
         $(document).bind('keydown', settings.key_previous, => @previous())
         $(document).bind('keydown', settings.key_click, => @select())
      next: ->
         if @index or @index == 0 then @index++ else @index = 0
         @activate(@index)
      previous: ->
         @index-- if @index and @index > 0
         @activate(@index)
      activate: (index) ->
         @active.removeClass(settings.class_active) if @active
         @active = $(@objects.get(index)).addClass(settings.class_active)
      select: ->
         @active.click() if @active
            
   # Store the keyboard navigation object as a global property so that 
   # it doesn't get declared multiple times. We only want one instance of this
   # object. In the future we may want to develop a way to append more objects
   # or flush the current list of objects from the navigation. This could be 
   # useful if we load in a new list via ajax, etc. etc.
   if window?
      if window.keyboard_navigation?
         keyboard_navigation: window.keyboard_navigation
      else
         keyboard_navigation: new KeyboardNavigation(this)
         window.keyboard_navigation: keyboard_navigation
   
   # Follow the convention of returning 'this' so that the plugin is chainable
   # when using it in jquery.
   this