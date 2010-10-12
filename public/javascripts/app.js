(function() {
  var EditArea, EditEvent, List, Mode, Navigation, NavigationEvent;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  };
  jQuery.fn.category_form = function(options) {
    var defaults, settings;
    defaults = {
      category_class: "category",
      list_selector: ".categories"
    };
    settings = jQuery.extend(defaults, options);
    return $(this).each(function() {
      var form;
      form = $(this);
      return form.submit(function(event) {
        var form_contents;
        form_contents = form.serialize();
        form.find("input").attr("disabled", true);
        $.post("/categories", form_contents, function(data) {
          var list, new_category;
          form.find("input").attr("disabled", false);
          if (data.category) {
            list = $(settings.list_selector);
            new_category = list.find("." + (settings.category_class) + ":last-child").clone();
            new_category.find("a").html("" + (data.category.name) + " <span class=\"focus\">0</span> <span class=\"total\">0</span>").attr("href", "/categories/" + (data.category.id) + "/tasks");
            return list.append(new_category);
          }
        }, "json");
        return false;
      });
    });
  };
  window.Mode = (function() {
    Mode = function() {};
    Mode.DO = "do";
    Mode.MOVE = "move";
    Mode.SEND = "send";
    Mode.DELETE = "delete";
    Mode.FOCUS = "focus";
    return Mode;
  }).call(this);
  window.EditEvent = (function() {
    EditEvent = function(tasks) {
      this.tasks = tasks;
      return this;
    };
    EditEvent.DELETED = "edit_deleted";
    EditEvent.SENT = "edit_sent";
    EditEvent.MOVED = "edit_moved";
    EditEvent.CREATED = "edit_created";
    return EditEvent;
  }).call(this);
  window.EditArea = (function() {
    EditArea = function(element, settings) {
      this.area = $(element);
      this.settings = jQuery.extend(EditArea.DEFAULTS, settings);
      this.forms = this.area.find(this.settings.form_selector);
      this.count = 0;
      this.items = [];
      this.do_form = this.area.find(this.settings.do_form);
      this.delete_form = this.area.find(this.settings.delete_form);
      this.focus_form = this.area.find(this.settings.focus_form);
      this.move_form = this.area.find(this.settings.move_form);
      this.send_form = this.area.find(this.settings.send_form);
      this.forms.hide();
      this.mode = this.settings.default_mode;
      this.default_form = this[this.settings.default_form];
      this.set_current_form(this.default_form);
      this.forms.submit(__bind(function(event) {}, this));
      return this;
    };
    EditArea.DEFAULTS = {
      form_selector: "form",
      do_form: "form.do",
      delete_form: "form.delete",
      focus_form: "form.focus",
      move_form: "form.move",
      send_form: "form.send",
      default_form: "do_form",
      default_mode: Mode.DO,
      count_selector: ".count"
    };
    EditArea.prototype.change = function(mode) {
      if (mode !== this.mode) {
        if (this.count < 1) {
          this.adjust_form_mode(mode);
          return true;
        }
        if (this.count > 0 && confirm("You currently have pending changes. Are you sure you want to lose them?")) {
          this.adjust_form_mode(mode);
          return true;
        } else {
          return false;
        }
      }
    };
    EditArea.prototype.adjust_form_mode = function(mode) {
      if (mode === Mode.DO) {
        this.set_current_form(this.do_form);
      } else if (mode === Mode.MOVE) {
        this.set_current_form(this.move_form);
      } else if (mode === Mode.SEND) {
        this.set_current_form(this.send_form);
      } else if (mode === Mode.DELETE) {
        this.set_current_form(this.delete_form);
      } else if (mode === Mode.FOCUS) {
        this.set_current_form(this.focus_form);
      }
      return (this.mode = mode);
    };
    EditArea.prototype.set_current_form = function(form) {
      if (this.current_form) {
        this.current_form.hide();
      }
      this.current_form = form;
      this.current_form.show();
      this.current_form_count = this.current_form.find(this.settings.count_selector);
      this.count = 0;
      this.items = [];
      return this.current_form_count.length > 0 ? this.current_form_count.html(this.count) : null;
    };
    EditArea.prototype.add_item = function(id) {
      this.items.push(id);
      this.count = this.items.length;
      return this.current_form_count.html(this.count);
    };
    EditArea.prototype.remove_item = function(id) {
      var index;
      index = this.items.indexOf(id);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.count = this.items.length;
        return this.current_form_count.html(this.count);
      }
    };
    return EditArea;
  }).call(this);
  window.List = (function() {
    List = function(element, settings) {
      var _a, _b, _c;
      this.list = $(element);
      this.settings = jQuery.extend(List.DEFAULTS, settings);
      this.links = this.list.find(this.settings.link_selector);
      this.links.selectable();
      _b = [SelectableEvent.COMPLETED, SelectableEvent.UNDONE, SelectableEvent.SELECTED, SelectableEvent.DESELECTED];
      for (_a = 0, _c = _b.length; _a < _c; _a++) {
        (function() {
          var event_type = _b[_a];
          return this.links.bind(event_type, __bind(function(event, selectable_event) {
            return this.dispatch(selectable_event);
          }, this));
        }).call(this);
      }
      return this;
    };
    List.DEFAULTS = {
      link_selector: "a",
      completed_class: "completed",
      selected_class: "selected"
    };
    List.prototype.change = function(mode, previous_mode) {
      if (mode !== this.mode) {
        this.mode = mode;
        if (previous_mode) {
          this.list.removeClass(previous_mode);
        }
        this.list.addClass(this.mode);
        return this.list.find("." + (this.settings.selected_class)).removeClass(this.settings.selected_class);
      }
    };
    List.prototype.total = function() {
      return this.links.length;
    };
    List.prototype.remaining = function() {
      return this.total() - this.list.find("." + (this.settings.completed_selector)).length;
    };
    List.prototype.dispatch = function(selectable_event) {
      return $([this]).trigger(selectable_event.type, selectable_event);
    };
    return List;
  }).call(this);
  window.NavigationEvent = (function() {
    NavigationEvent = function(mode, previous_mode) {
      this.mode = mode;
      this.previous_mode = previous_mode;
      return this;
    };
    NavigationEvent.CHANGED = "navigation_changed";
    return NavigationEvent;
  }).call(this);
  window.Navigation = (function() {
    Navigation = function(element, settings) {
      this.nav = $(element);
      this.settings = jQuery.extend(Navigation.DEFAULTS, settings);
      this.links = this.nav.find(this.settings.link_selector);
      this.links.click(__bind(function(event) {
        this.change($(event.currentTarget).attr("id"));
        return false;
      }, this));
      this.change(this.links.attr("id"));
      return this;
    };
    Navigation.DEFAULTS = {
      link_selector: "a"
    };
    Navigation.prototype.change = function(mode) {
      if (mode !== this.mode) {
        this.previous_mode = this.mode;
        this.mode = mode;
        this.nav.removeClass(this.previous_mode);
        this.nav.addClass(this.mode);
        return $(this).trigger(NavigationEvent.CHANGED, new NavigationEvent(this.mode, this.previous_mode));
      }
    };
    Navigation.prototype.revert = function() {
      if (this.previous_mode) {
        this.nav.removeClass(this.mode);
        this.nav.addClass(this.previous_mode);
        this.mode = this.previous_mode;
        return (this.previous_mode = null);
      }
    };
    return Navigation;
  }).call(this);
  jQuery.fn.selectable = function(options) {
    var SelectableEvent, defaults, settings;
    defaults = {
      selected_class: "selected",
      completed_class: "completed",
      active_class: "active",
      completed_mode: "do",
      modifier_element_class: "tasks"
    };
    settings = jQuery.extend(defaults, options);
    window.SelectableEvent = (function() {
      SelectableEvent = function(element, type) {
        this.element = element;
        this.id = element.attr("data-id");
        this.type = type;
        return this;
      };
      SelectableEvent.SELECTED = "selectable_selected";
      SelectableEvent.DESELECTED = "selectable_deselected";
      SelectableEvent.COMPLETED = "selectable_completed";
      SelectableEvent.UNDONE = "selectable_undone";
      return SelectableEvent;
    }).call(this);
    return $(this).each(function() {
      var item, modifier_element;
      item = $(this);
      if (settings.modifier_element_class) {
        modifier_element = $("." + (settings.modifier_element_class));
      }
      return item.click(function(event) {
        var selected_item;
        selected_item = $(this);
        if (modifier_element && modifier_element.hasClass(settings.completed_mode)) {
          selected_item.parent().addClass(settings.active_class);
          $.getJSON(selected_item.attr("href"), function(data) {
            if (data['new_path']) {
              selected_item.attr("href", data.new_path);
            }
            if (data['object']) {
              if (data.object.task.aasm_state === "completed") {
                selected_item.parent().addClass(settings.completed_class);
                item.trigger(SelectableEvent.COMPLETED, new SelectableEvent(item, SelectableEvent.COMPLETED));
              } else {
                selected_item.parent().removeClass(settings.completed_class);
                item.trigger(SelectableEvent.UNDONE, new SelectableEvent(item, SelectableEvent.UNDONE));
              }
              return selected_item.parent().removeClass(settings.active_class);
            }
          });
        } else {
          if (selected_item.parent().hasClass(settings.selected_class)) {
            item.trigger(SelectableEvent.DESELECTED, new SelectableEvent(item, SelectableEvent.DESELECTED));
            selected_item.parent().removeClass(settings.selected_class);
          } else {
            item.trigger(SelectableEvent.SELECTED, new SelectableEvent(item, SelectableEvent.SELECTED));
            selected_item.parent().addClass(settings.selected_class);
          }
        }
        return false;
      });
    });
  };
  jQuery.fn.task_form = function(options) {
    var defaults, settings;
    defaults = {
      task_class: "task"
    };
    settings = jQuery.extend(defaults, options);
    return $(this).each(function() {
      var category_id, form;
      form = $(this);
      category_id = form.find("#category").val();
      return form.submit(function(event) {
        ({
          form_contents: form.serialize()
        });
        form.find("input").attr("disabled", false);
        $.post("/categories/" + (category_id) + "/tasks/", form_contents, function(data) {
          var list, new_task;
          if (data.task) {
            $("#task_name").val("");
            list = $("#category_" + (category_id));
            new_task = list.find("." + (settings.task_class) + ":last-child").clone();
            new_task.find("a").html(data.task.name).attr("href", "/categories/" + (data.task.category_id) + "/tasks/" + (data.task.id) + "/complete").selectable();
            new_task.addClass("completed").attr("style", "").removeClass("selected");
            list.append(new_task);
            setTimeout(function() {
              return new_task.removeClass("completed");
            }, 100);
            return form.find("input").attr("disabled", false);
          }
        }, "json");
        return false;
      });
    });
  };
  $(document).ready(function() {
    var deselection_handler, edit_area, edit_nav, list_change_handler, navigation_change_handler, selection_handler, todo_list;
    edit_nav = new Navigation("#edit");
    todo_list = new List("ul.tasks");
    edit_area = new EditArea("section#edit-area");
    navigation_change_handler = function(event, navigation_event) {
      return edit_area.change(navigation_event.mode) ? todo_list.change(navigation_event.mode, navigation_event.previous_mode) : edit_nav.revert();
    };
    list_change_handler = function(event, selectable_event) {
      var title;
      title = $("title").html();
      return $("title").html(title.replace(/\d\/\d/, "" + (todo_list.remaining()) + "/" + (todo_list.total())));
    };
    selection_handler = function(event, selectable_event) {
      return edit_area.add_item(selectable_event.id);
    };
    deselection_handler = function(event, selectable_event) {
      return edit_area.remove_item(selectable_event.id);
    };
    $(edit_nav).bind(NavigationEvent.CHANGED, navigation_change_handler);
    $(todo_list).bind(SelectableEvent.COMPLETED, list_change_handler);
    $(todo_list).bind(SelectableEvent.UNDONE, list_change_handler);
    $(todo_list).bind(SelectableEvent.SELECTED, selection_handler);
    return $(todo_list).bind(SelectableEvent.DESELECTED, deselection_handler);
  });
})();
