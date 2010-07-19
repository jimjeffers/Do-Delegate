class NavigationController extends Controller
   constructor: (params)->
      @controller_type: "Navigation"
      @attributes: jQuery.extend({
         navigation_selector:    null
         button_selector:        'a'
         target_selector:        'body'
         button_attribute:       'id'
         navigation:             null
         button:                 null
         target:                 null
         selected:               null
         previous:               null
         list_controller:        null
         default_item:           null
      }, @attributes)
      super params
      if @navigation_selector?
         this.set_navigation @navigation_selector
      if @button_selector?
         this.set_button @button_selector
      if @target_selector?
         this.set_target @target_selector
      if @default_item? and @navigation? and @target?
         @navigation.find("#${@default_item}").click()

   set_navigation: (selector) ->
      if selector?
         @navigation: $(selector)
   
   set_button: (selector) ->
      if selector?
         if @navigation?
            @button: @navigation.find(selector)
            @button.click( (event) =>
               this.select(event)
               false
            )
   
   set_target: (selector) ->
      if selector?
         @target: $(selector)
   
   select: (event) ->
      unless !this.before_change()
         @selected: $(event.target).attr(@button_attribute)
         if !@previous? || @previous != @selected
            @target.removeClass(@previous) if @previous?
            @target.addClass(@selected)
            @list_controller.index() if @list_controller?
            @previous: @selected
   
   before_change: ->
      true