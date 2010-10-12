# Global Object: Modes
# ------------------------------------------------ 
# Define the Modes object to the global namespace.
window.Mode = class Mode
   # Create static types to keep event listeners DRY.
   @DO:     "do"
   @MOVE:   "move"
   @SEND:   "send"
   @DELETE: "delete"
   @FOCUS:  "focus"

# Custom Event: Edit
# ------------------------------------------------ 
# Define the EditEvent object to the global namespace.
window.EditEvent = class EditEvent
   # Create static types to keep event listeners DRY.
   @DELETED:   "edit_deleted"
   @SENT:      "edit_sent"
   @MOVED:     "edit_moved"
   @CREATED:   "edit_created"
   constructor: (tasks) ->
      @tasks = tasks

# Edit Area
# ------------------------------------------------ 
# A component that controls and manages the forms
# in the edit area.
window.EditArea = class EditArea
   
   # Defaults
   # ---------------------------------------------
   # * form_selector: CSS selector used to find the form objects embedded in the edit area.
   @DEFAULTS: {
      form_selector:    "form"
      do_form:          "form.do"
      delete_form:      "form.delete"
      focus_form:       "form.focus"
      move_form:        "form.move"
      send_form:        "form.send"
      default_form:     "do_form"
      default_mode:     Mode.DO
      count_selector:   ".count"
   }
   
   constructor: (element,settings) ->
      @area          = $(element)
      @settings      = jQuery.extend(EditArea.DEFAULTS,settings)
      @forms         = @area.find(@settings.form_selector)
      @count         = 0
      @items         = []
      
      # Bind forms.
      @do_form       = @area.find(@settings.do_form)
      @delete_form   = @area.find(@settings.delete_form)
      @focus_form    = @area.find(@settings.focus_form)
      @move_form     = @area.find(@settings.move_form)
      @send_form     = @area.find(@settings.send_form)
      
      # Hide all forms.
      @forms.hide()
      
      # Show the default mode and form.
      @mode          = @settings.default_mode
      @default_form  = this[@settings.default_form]
      this.set_current_form(@default_form)
      
      # bind an event handler to process user interaction.
      @forms.submit( (event) =>
         #alert $(event.currentTarget).attr("action")
         #false
      )
      
   # Changes the current form depending on the updated mode.
   change: (mode) ->
      if mode != @mode
         if @count < 1
            this.adjust_form_mode(mode)
            return true
         if @count > 0 and confirm("You currently have pending changes. Are you sure you want to lose them?")
            this.adjust_form_mode(mode)
            return true
         else
            return false
   
   adjust_form_mode: (mode) ->
      if mode == Mode.DO
         this.set_current_form @do_form
      else if mode == Mode.MOVE
         this.set_current_form @move_form
      else if mode == Mode.SEND
         this.set_current_form @send_form
      else if mode == Mode.DELETE
         this.set_current_form @delete_form
      else if mode == Mode.FOCUS
         this.set_current_form @focus_form
      @mode = mode
      
   # Sets and displays the current form and resets its count if applicable.
   set_current_form: (form) ->
      @current_form.hide() if @current_form
      @current_form = form
      @current_form.show()
      @current_form_count = @current_form.find(@settings.count_selector)
      @count = 0
      @items = []
      if @current_form_count.length > 0
         @current_form_count.html(@count)
   
   add_item: (id) ->
      @items.push(id)
      @count = @items.length
      @current_form_count.html(@count)
   
   remove_item: (id) ->
      index = @items.indexOf(id)
      if index != -1
         @items.splice(index, 1)
         @count = @items.length
         @current_form_count.html(@count)