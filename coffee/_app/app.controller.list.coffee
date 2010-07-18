class ListController extends Controller
   constructor: (params) ->
      @controller_type: "List"
      @attributes: jQuery.extend({
         list_selector:    null
         cell_selector:    null
         list:             null
         cell:             null
         selected_class:   "selected"
         blacklist:        []
      }, @attributes)
      super params
      if @list_selector?
         this.set_list(@list_selector)
      if @cell_selector?
         this.set_cell(@cell_selector) 
         
   index: (items) ->
      @cell: @cell.clone()
      @cell.show()
      @list.find(@cell_selector).remove()
      for idx, item of items
         this.build_cell(idx,item)
         @list.append(@cell) unless this.blacklisted(idx)
         @cell: @cell.clone()
      this.clear_blacklist()

   build_cell: (idx,item) ->
      for attribute, value of item
         binding: @cell.find(".${attribute}")
         if binding.length > 0
            if binding.attr('data-bindings')?
               for data_binding in binding.attr('data-bindings').split(' ')
                  data_binding: data_binding.split(':')
                  binding.attr(data_binding[1],item[data_binding[0]])
            children: binding.children()
            binding.html value
            binding.append children
      @cell.attr("id","${@class_name.toLowerCase()}_${idx}")
      console.log "Created cell with ID: ${@cell.attr("id")}"
   
   do_not_index: (idx) ->
      @blacklist.push(idx)
   
   blacklisted: (idx) ->
      for item in @blacklist
         return true if item == idx
      false
   
   clear_blacklist: ->
      @blacklist: []
      
   # Sets a list object for the controller.
   set_list: (selector) ->
      if $(selector).length > 0
         @list: $(selector)
         this.index() if @cell?
      else
         console.log("${@class_name} Controller could not find list with: ${selector}")
   
   set_cell: (selector) ->
      if @list?
         if $(selector).length > 0
            cell: $($(selector).first())
            @cell: cell.clone()
            cell.remove()
            @cell_selector: selector
            this.index() if @list?
         else
            console.log("${@class_name} Controller could not find cells with: ${selector}")
      else
         console.log("${@class_name} Controller could not find cells because no list has been set.")

   selected_count: ->
      return @list.find(".${@selected_class}").length if @list?
   
   destroy_cell: (idx) ->
      cell: @list.find("#${@class_name.toLowerCase()}_${idx}")
      if cell.length > 0
         item: @item.find(idx)
         item.destroy()
         cell.remove()
      else
         console.log "Could not find item to delete with id: ${id}."