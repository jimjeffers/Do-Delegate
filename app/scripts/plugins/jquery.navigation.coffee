# Custom Event: Navigation
# ------------------------------------------------ 
# Define the NavigationEvent object to the global namespace.
window.NavigationEvent = class NavigationEvent
   # Create static types to keep event listeners DRY.
   @CHANGED: "navigation_changed"
   constructor: (mode,previous_mode) ->
      @mode = mode
      @previous_mode = previous_mode

# Navigation
# ------------------------------------------------ 
# A component that adjusts and stores it's state resulting
# from user interaction.
window.Navigation = class Navigation
   
   # Defaults
   # ---------------------------------------------
   # * link_selector: CSS selector used to find the link elements in the navigation.
   @DEFAULTS: {
      link_selector: "a"
   }
   
   constructor: (element,settings) ->
      @nav         = $(element)
      @settings    = jQuery.extend(Navigation.DEFAULTS,settings)
      @links       = @nav.find(@settings.link_selector)
      
      # bind an event handler to process user interaction.
      @links.click( (event) =>
         this.change $(event.currentTarget).attr("id")
         # Prevent the event from propogating.
         false
      )
      
      # Select the first item in the navigation by default.
      this.change @links.attr("id")
      
   # Change method updates the internal state of the navigation and dispatches 
   # a navigation event.
   change: (mode) ->
      if mode != @mode
         @previous_mode = @mode
         @mode = mode
         @nav.removeClass(@previous_mode)
         @nav.addClass(@mode)
         $(this).trigger(NavigationEvent.CHANGED, new NavigationEvent(@mode,@previous_mode))
   
   # Reverts the navigation back to it's prior state.
   revert: ->
      if @previous_mode
         @nav.removeClass(@mode)
         @nav.addClass(@previous_mode)
         @mode = @previous_mode
         @previous_mode = null