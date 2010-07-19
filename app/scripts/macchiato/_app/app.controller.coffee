class Controller
   constructor: (params) ->
      @type: "controller"
      # Bind any attributes.
      params: {} if !params?
      for attribute, default_value of @attributes
         this[attribute]: params[attribute] || default_value
      if @item?
         @class_name: @item.class_name
         console.log "Initiated ${@controller_type} Controller for ${@class_name} Model."
      else
         console.log "Initiated ${@controller_type} Controller but it is not bound to a Model.."
   
   # Generates a new instance of the item tied to this controller.
   new_item: (attributes) ->
      eval("new ${@class_name}(attributes)")