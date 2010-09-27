(function() {
  var List, Navigation, NavigationEvent;
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
  window.List = (function() {
    List = function(element, settings) {
      this.list = $(element);
      this.settings = jQuery.extend(Navigation.DEFAULTS, settings);
      this.links = this.list.find(this.settings.link_selector);
      this.links.selectable();
      this.links.bind(SelectableEvent.SELECTED, this.handle_selected_item);
      return this;
    };
    List.DEFAULTS = {
      link_selector: "a"
    };
    List.prototype.handle_selected_item = function(event, selectable_event) {
      return alert(selectable_event.selected);
    };
    List.prototype.change = function(mode, previous_mode) {
      if (mode !== this.mode) {
        this.mode = mode;
        if (previous_mode) {
          this.list.removeClass(previous_mode);
        }
        return this.list.addClass(this.mode);
      }
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
        change(this.previous_mode);
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
      SelectableEvent = function(element, selected) {
        this.element = element;
        this.id = element.attr("id");
        this.selected = selected;
        return this;
      };
      SelectableEvent.SELECTED = "selectable_selected";
      SelectableEvent.DESELECTED = "selectable_deselected";
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
              } else {
                selected_item.parent().removeClass(settings.completed_class);
              }
              return selected_item.parent().removeClass(settings.active_class);
            }
          });
        } else {
          if (selected_item.parent().hasClass(settings.selected_class)) {
            item.trigger(SelectableEvent.DESELECTED, new SelectableEvent(item, false));
            selected_item.parent().removeClass(settings.selected_class);
          } else {
            item.trigger(SelectableEvent.SELECTED, new SelectableEvent(item, true));
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
    var edit_navigation, navigation_change_handler, todo_list;
    edit_navigation = new Navigation("#edit");
    todo_list = new List("ul.tasks");
    navigation_change_handler = function(event, navigation_event) {
      return todo_list.change(navigation_event.mode, navigation_event.previous_mode);
    };
    $(edit_navigation).bind(NavigationEvent.CHANGED, navigation_change_handler);
    $("#task_form").task_form();
    return $("#new_category").category_form({
      list_selector: "ul.projects"
    });
  });
})();
