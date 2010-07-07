class Controller
   constructor: (params) ->
      # Bind any attributes.
      params: {} if !params?
      for attribute, default_value of @attributes
         this[attribute]: params[attribute] || default_value
         
      if @item?
         @class_name: @item.class_name
         console.log "Initiated ${@controller_type} Controller for ${@class_name} Model."
      else
         console.log "Initiated ${@controller_type} Controller but it is not bound to a Model.."
   
   new_item: (attributes) ->
      eval("new ${@class_name}(attributes)")