# List
# ------------------------------------------------ 
# A component that tracks a list of selectable items
# setting their state when in different modes.
window.List = class List
   
   # Defaults
   # ---------------------------------------------
   # * link_selector: CSS selector used to find the link elements in the list.
   @DEFAULTS: {
      link_selector: "a"
   }
   
   constructor: (element,settings) ->
      @list        = $(element)
      @settings    = jQuery.extend(Navigation.DEFAULTS,settings)
      @links       = @list.find(@settings.link_selector)
      
      # bind an event handler to process user interaction.
      @links.selectable()
      @links.bind(SelectableEvent.SELECTED, this.handle_selected_item)
      
   # Change method updates the internal state of the navigation and dispatches 
   # a navigation event.
   handle_selected_item: (event, selectable_event) ->
      alert selectable_event.selected
   
   # Change method updates the internal state of the list.
   change: (mode,previous_mode) ->
      if mode != @mode
         @mode = mode
         @list.removeClass(previous_mode) if previous_mode
         @list.addClass(@mode)