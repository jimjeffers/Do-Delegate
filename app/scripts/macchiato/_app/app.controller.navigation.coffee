# A navigation controller binds itself to an HTML 
# object representing page or section navigation.
# It updates the mode of the page by adding/removing
# classes to the designated HTML element it controls.
# This allows you to handle updates to the display in 
# your CSS.
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
   
   # Binds an HTML element to the instances navigation
   # attribute. This option takes in a CSS selector and
   # uses jQuery to select the HTML element. The returned
   # item is a jQuery object.
   set_navigation: (selector) ->
      if selector?
         @navigation: $(selector)
   
   # Takes a CSS selector to grab HTML elements within the
   # navigation. The navigation must be set prior to establishing 
   # a selector or no listeners will be bound.
   set_button: (selector) ->
      if selector?
         if @navigation?
            @button: @navigation.find(selector)
            @button.click( (event) =>
               this.select(event)
               false
            )
   
   # The target is an HTML element that the navigation contoller manages.
   # When you select on object in the navigation this element gets assigned
   # a class matching the name of the ID of the navigation item clicked.
   set_target: (selector) ->
      if selector?
         @target: $(selector)
   
   # This is an event handler that is bound to the navigation's button when
   # you use set_button. It updates the target element with the appropriate
   # selected item.
   select: (event) ->
      unless !this.before_change()
         @selected: $(event.target).attr(@button_attribute)
         if !@previous? || @previous != @selected
            @target.removeClass(@previous) if @previous?
            @target.addClass(@selected)
            @list_controller.index() if @list_controller?
            @previous: @selected
   
   # WIP: This is a hook you can override in your parent classes to handle 
   # custom events prior to select firing. You can cancel a selection from
   # happening by returning false. If you return true the navigation change
   # will update as expected.
   before_change: ->
      true