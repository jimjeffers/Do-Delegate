# A list controller manages a list of items. It depends on a model 
# to supply it's data. List controllers rely on binding themselves 
# to HTML elements to serve as the list and a child element to represent 
# a specific cell. Simply assign any nested element with a class that matches 
# the name of an attribute to perform databinding. If you want to bind an 
# attribute of the model to an HTML element's attributes simply use HTML5 
# data- attributes. To do this you declare:
# 
# data-binding="link:href"
#
# In other words (model attribute name):(html element attribute name). The
# above example would populate an anchor's href with the model's link 
# attribute value.
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
   
   # Regenerates the list.
   index: (items) ->
      @cell: @cell.clone()
      @cell.show()
      @list.find(@cell_selector).remove()
      for idx, item of items
         this.build_cell(idx,item)
         @list.append(@cell) unless this.blacklisted(idx)
         @cell: @cell.clone()
      this.clear_blacklist()
   
   # Performs data binding and builds individual list items as HTML.
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
   
   # Pushes a specific ID of a data object to be ignored on index.
   do_not_index: (idx) ->
      @blacklist.push(idx)
   
   # Accepts an ID and returns true if the selected item has been
   # appended to the blacklist.
   blacklisted: (idx) ->
      for item in @blacklist
         return true if item == idx
      false
   
   # Resets the blacklist.
   clear_blacklist: ->
      @blacklist: []
      
   # Sets a list object for the controller.
   set_list: (selector) ->
      if $(selector).length > 0
         @list: $(selector)
         this.index() if @cell?
      else
         console.log("${@class_name} Controller could not find list with: ${selector}")
   
   # Binds an HTML element to the cell attribute of the list controller. This uses a CSS
   # selector. The cell is stored as a jquery object.
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
   
   # Returns a count of the selected items in a list.
   selected_count: ->
      return @list.find(".${@selected_class}").length if @list?
   
   # Deletes a cell at a specified index and subsequently calls the
   # appropriate model to also delete itself from the data source.
   destroy_cell: (idx) ->
      cell: @list.find("#${@class_name.toLowerCase()}_${idx}")
      if cell.length > 0
         item: @item.find(idx)
         item.destroy()
         cell.remove()
      else
         console.log "Could not find item to delete with id: ${id}."