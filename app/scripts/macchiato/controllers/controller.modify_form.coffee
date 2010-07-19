# Handles an intermediary form that is used to process pending
# elements depending on the given mode it's navigation controller
# is set in. On that note. This controller depends on both a 
# navigation controller and a list controller. These can be set 
# during instantiation with the following parameters:
#
# * *@navigation_controller:* Stores a reference to an instance of a 
#   navigation controller which is used to determine the current mode
#   by checking the controller's selected value.
# * *@list_controller:* Stores a reference to an instance of a list 
#   controller. This list controller will be inadvertantly called
#   to run modifications based on the current mode.
# * *@mode_selector:* A css selector to reference an element
#   displaying the current mode on the form.
# * *@count_selector:* A css selector to select the element that
#   displays the count of objects changed in the form.
class ModifyFormController extends FormController
   constructor: (params) ->
      @attributes: {
         navigation_controller: null
         list_controller: null
         mode_selector: null
         count_selector: null
      }
      if @navigation_controller?
         this.set_navigation_controller @navigation_controller
      if @list_controller?
         this.set_list_controller @list_controller
      if @mode_selector?
         this.set_mode_selector @mode_selector
      super params
   
   # Sets the navigation_controller attribute.
   set_navigation_controller: (navigation_controller) ->
      if navigation_controller?
         @navigation_controller: navigation_controller
   
   # Sets the list_controller attribute.
   set_list_controller: (list_controller) ->
      if list_controller?
         @navigation_controller: list_controller
   
   # Sets the *mode_selector* attribute. Then sets a separate 
   # *@mode_label* attribute to the element returned by jquery 
   # from that selector.
   set_mode_selector: (mode_selector) ->
      if mode_selector?
         @mode_selector: mode_selector
      if @form? and @mode_selector?
         @mode_label: $(@form.find(mode_selector))
      if @mode_label.length > 0
         @mode_label.html(@navigation_controller.selected) if @navigation_controller?
      else
         @mode_label: null
   
   # Sets the *count_selector* attribute. Then sets a separate 
   # *@count_label* attribute to the element returned by jquery 
   # from that selector.
   set_count_selector: (count_selector) ->
      if count_selector?
         @count_selector: count_selector
      if @form? and @count_selector?
         @count_label: $(@form.find(count_selector))
      if @count_label.length > 0
         @count_label.html(@list_controller.modified_count) if @list_controller
      else
         @count_label: null
   
   # Extend the inherited set form method to set the mode and count selectors if
   # they were set prior to the form being established.
   set_form: (selector) ->
      super selector
      this.set_mode_selector()
      this.set_count_selector()
   