class Controller
   constructor: ->
      @class_name: @item.class_name
      console.log "Initiated ${@class_name} controller."
   
   set_form: (controller) ->
      @form.submit( (event) =>
         this.process_form(event)
      )
   
   index: (items) ->
      @cell: @cell.clone()
      @list.find(@cell_selector).remove()
      for idx, item of items
         this.build_cell(idx,item)
         @list.append(@cell)
         @cell: @cell.clone()
   
   build_cell: (idx,item) ->
      for attribute, value of item
         binding: @cell.find(".${attribute}")
         if binding.length > 0
            binding.html value
      @cell.attr("id","${@class_name.toLowerCase()}_${idx}")
   
   set_item: (item) ->
      @item: item
      if @form.find("input[name='idx']").length < 1
         @form.append("<input name='idx' type='hidden' value='false'/>")
      for attribute, default_value of @item.attributes
         field: @form.find("input[name='${attribute}']")
         if field.length > 0
            field.val(@item[attribute])
   
   set_list: (selector) ->
      if $(selector).length > 0
         @list: $(selector)
      else
         console.log("${@class_name} controller could not find list with: ${selector}")
      
   set_cell: (selector) ->
      if @list?
         if $(selector).length > 0
            @cell: $($(selector).first())
            @cell_selector: selector
         else
            console.log("${@class_name} controller could not find cells with: ${selector}")
      else
         console.log("${@class_name} controller could not find cells because no list has been set.")
   
   process_form: (event) ->   
      @item: this.new_item() if !@item?
      attributes: {}
      for attribute, default_value of @item.attributes
         field: @form.find("input[name='${attribute}']")
         attributes[attribute]: field.val() if field.length > 0
      this.new_item(attributes)
   
   new_item: (attributes) ->
      eval("new ${@class_name}(attributes)")
   
   parse_id: (id) ->
      id.split("_")[1]
   
   destroy_cell: (id) ->
      cell: @list.find("#${id}")
      if cell.length > 0
         @item.find(this.parse_id(cell.attr("id")))
         @item.destroy()
         cell.remove()
      else
         console.log "Could not find item to delete with id: ${id}."