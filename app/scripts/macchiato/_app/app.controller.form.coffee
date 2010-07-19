class FormController extends Controller
   constructor: (params)->
      @controller_type: "Form"
      @attributes: jQuery.extend({
         form_selector:    null
         form:             null
         list_controller:  null
      }, @attributes)
      super params
      if @form_selector?
         this.set_form(@form_selector)
   
   # Takes a CSS selector to bind a form to the
   # the current instance of the controller.
   set_form: (selector) ->
      @form: $(selector)   
      @form.submit( (event) =>
         this.process_form(event)
      )
   
   # Takes a new item and binds it's values to the
   # form bound to this controller.
   set_item: (item) ->
      @item: item
      if @form.find("input[name='idx']").length < 1
         @form.append("<input name='idx' type='hidden' value='false'/>")
      for attribute, default_value of @item.attributes
         field: @form.find("input[name='${attribute}']")
         if field.length > 0
            field.val(@item[attribute])
   
   # Processes the form and returns a new item with the given attributes
   # from the values passed in from the form.
   process_form: (event) ->
      @item: this.new_item() if !@item?
      attributes: {}
      for attribute, default_value of @item.attributes
         field: @form.find("input[name='${attribute}']")
         attributes[attribute]: field.val() if field.length > 0
      this.new_item(attributes)
   
   # Sets a list controller to the form object.
   set_list_controller: (list_controller) ->
      @list_controller: list_controller