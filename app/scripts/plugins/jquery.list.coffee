# List
# ------------------------------------------------ 
# A component that tracks a list of selectable items
# setting their state when in different modes.
window.List = class List
   
   # Defaults
   # ---------------------------------------------
   # * link_selector: CSS selector used to find the link elements in the list.
   # * completed_selector: CSS selector used to find completed link elements.
   @DEFAULTS: {
      link_selector:          "a"
      completed_selector:     ".completed"
   }
   
   constructor: (element,settings) ->
      @list        = $(element)
      @settings    = jQuery.extend(List.DEFAULTS,settings)
      @links       = @list.find(@settings.link_selector)
      
      # bind an event handler to process user interaction.
      @links.selectable()
      for event_type in [SelectableEvent.COMPLETED,SelectableEvent.UNDONE,SelectableEvent.SELECTED,SelectableEvent.DESELECTED]
         @links.bind(event_type, ((event, selectable_event) =>
            this.dispatch(selectable_event)
         ))
   
      # Change method updates the internal state of the list.
      change: (mode,previous_mode) ->
         if mode != @mode
            @mode = mode
            @list.removeClass(previous_mode) if previous_mode
            @list.addClass(@mode)
   
   # Returns the length of the list.
   total: ->
      @links.length
   
   # Returns the count of incomplete items.
   remaining: ->
      this.total() - @list.find(@settings.completed_selector).length
   
   dispatch: (selectable_event) ->
      $([this]).trigger(selectable_event.type, selectable_event)