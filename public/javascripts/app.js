(function(){
  var Category, Controller, EditNavigationController, FormController, ListController, Model, ModifyFormController, NavigationController, Todo, TodoFormController, TodosListController, WebModel;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    var ctor = function(){ };
    ctor.prototype = parent.prototype;
    child.__superClass__ = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
  };
  Controller = function(params) {
    var _a, _b, attribute, default_value;
    this.type = "controller";
    if (!(typeof params !== "undefined" && params !== null)) {
      params = {};
    }
    _a = this.attributes;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      default_value = _a[attribute];
      this[attribute] = params[attribute] || default_value;
    }}
    if ((typeof (_b = this.item) !== "undefined" && _b !== null)) {
      this.class_name = this.item.class_name;
      console.log(("Initiated " + (this.controller_type) + " Controller for " + (this.class_name) + " Model."));
    } else {
      console.log(("Initiated " + (this.controller_type) + " Controller but it is not bound to a Model.."));
    }
    return this;
  };
  Controller.prototype.new_item = function(attributes) {
    return eval(("new " + (this.class_name) + "(attributes)"));
  };

  FormController = function(params) {
    var _a;
    this.controller_type = "Form";
    this.attributes = jQuery.extend({
      form_selector: null,
      form: null,
      list_controller: null
    }, this.attributes);
    FormController.__superClass__.constructor.call(this, params);
    (typeof (_a = this.form_selector) !== "undefined" && _a !== null) ? this.set_form(this.form_selector) : null;
    return this;
  };
  __extends(FormController, Controller);
  FormController.prototype.set_form = function(selector) {
    this.form = $(selector);
    return this.form.submit((function(__this) {
      var __func = function(event) {
        return this.process_form(event);
      };
      return (function() {
        return __func.apply(__this, arguments);
      });
    })(this));
  };
  FormController.prototype.set_item = function(item) {
    var _a, _b, attribute, default_value, field;
    this.item = item;
    this.form.find("input[name='idx']").length < 1 ? this.form.append("<input name='idx' type='hidden' value='false'/>") : null;
    _a = []; _b = this.item.attributes;
    for (attribute in _b) { if (__hasProp.call(_b, attribute)) {
      default_value = _b[attribute];
      _a.push((function() {
        field = this.form.find(("input[name='" + (attribute) + "']"));
        return field.length > 0 ? field.val(this.item[attribute]) : null;
      }).call(this));
    }}
    return _a;
  };
  FormController.prototype.process_form = function(event) {
    var _a, _b, attribute, attributes, default_value, field;
    if (!(typeof (_a = this.item) !== "undefined" && _a !== null)) {
      this.item = this.new_item();
    }
    attributes = {};
    _b = this.item.attributes;
    for (attribute in _b) { if (__hasProp.call(_b, attribute)) {
      default_value = _b[attribute];
      field = this.form.find(("input[name='" + (attribute) + "']"));
      if (field.length > 0) {
        attributes[attribute] = field.val();
      }
    }}
    return this.new_item(attributes);
  };
  FormController.prototype.set_list_controller = function(list_controller) {
    this.list_controller = list_controller;
    return this.list_controller;
  };

  ListController = function(params) {
    var _a, _b;
    this.controller_type = "List";
    this.attributes = jQuery.extend({
      list_selector: null,
      cell_selector: null,
      list: null,
      cell: null,
      selected_class: "selected",
      blacklist: []
    }, this.attributes);
    ListController.__superClass__.constructor.call(this, params);
    (typeof (_a = this.list_selector) !== "undefined" && _a !== null) ? this.set_list(this.list_selector) : null;
    (typeof (_b = this.cell_selector) !== "undefined" && _b !== null) ? this.set_cell(this.cell_selector) : null;
    return this;
  };
  __extends(ListController, Controller);
  ListController.prototype.index = function(items) {
    var _a, idx, item;
    this.cell = this.cell.clone();
    this.cell.show();
    this.list.find(this.cell_selector).remove();
    _a = items;
    for (idx in _a) { if (__hasProp.call(_a, idx)) {
      item = _a[idx];
      this.build_cell(idx, item);
      if (!(this.blacklisted(idx))) {
        this.list.append(this.cell);
      }
      this.cell = this.cell.clone();
    }}
    return this.clear_blacklist();
  };
  ListController.prototype.build_cell = function(idx, item) {
    var _a, _b, _c, _d, _e, attribute, binding, children, data_binding, value;
    _a = item;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      value = _a[attribute];
      binding = this.cell.find(("." + (attribute)));
      if (binding.length > 0) {
        if ((typeof (_e = binding.attr('data-bindings')) !== "undefined" && _e !== null)) {
          _c = binding.attr('data-bindings').split(' ');
          for (_b = 0, _d = _c.length; _b < _d; _b++) {
            data_binding = _c[_b];
            data_binding = data_binding.split(':');
            binding.attr(data_binding[1], item[data_binding[0]]);
          }
        }
        children = binding.children();
        binding.html(value);
        binding.append(children);
      }
    }}
    this.cell.attr("id", ("" + (this.class_name.toLowerCase()) + "_" + (idx)));
    return console.log(("Created cell with ID: " + (this.cell.attr("id"))));
  };
  ListController.prototype.do_not_index = function(idx) {
    return this.blacklist.push(idx);
  };
  ListController.prototype.blacklisted = function(idx) {
    var _a, _b, _c, item;
    _b = this.blacklist;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      item = _b[_a];
      if (item === idx) {
        return true;
      }
    }
    return false;
  };
  ListController.prototype.clear_blacklist = function() {
    this.blacklist = [];
    return this.blacklist;
  };
  ListController.prototype.set_list = function(selector) {
    var _a;
    if ($(selector).length > 0) {
      this.list = $(selector);
      if ((typeof (_a = this.cell) !== "undefined" && _a !== null)) {
        return this.index();
      }
    } else {
      return console.log(("" + (this.class_name) + " Controller could not find list with: " + (selector)));
    }
  };
  ListController.prototype.set_cell = function(selector) {
    var _a, _b, cell;
    if ((typeof (_b = this.list) !== "undefined" && _b !== null)) {
      if ($(selector).length > 0) {
        cell = $($(selector).first());
        this.cell = cell.clone();
        cell.remove();
        this.cell_selector = selector;
        if ((typeof (_a = this.list) !== "undefined" && _a !== null)) {
          return this.index();
        }
      } else {
        return console.log(("" + (this.class_name) + " Controller could not find cells with: " + (selector)));
      }
    } else {
      return console.log(("" + (this.class_name) + " Controller could not find cells because no list has been set."));
    }
  };
  ListController.prototype.selected_count = function() {
    var _a;
    if ((typeof (_a = this.list) !== "undefined" && _a !== null)) {
      return this.list.find(("." + (this.selected_class))).length;
    }
  };
  ListController.prototype.destroy_cell = function(idx) {
    var cell, item;
    cell = this.list.find(("#" + (this.class_name.toLowerCase()) + "_" + (idx)));
    if (cell.length > 0) {
      item = this.item.find(idx);
      item.destroy();
      return cell.remove();
    } else {
      return console.log(("Could not find item to delete with id: " + (id) + "."));
    }
  };

  NavigationController = function(params) {
    var _a, _b, _c, _d, _e, _f;
    this.controller_type = "Navigation";
    this.attributes = jQuery.extend({
      navigation_selector: null,
      button_selector: 'a',
      target_selector: 'body',
      button_attribute: 'id',
      navigation: null,
      button: null,
      target: null,
      selected: null,
      previous: null,
      list_controller: null,
      default_item: null
    }, this.attributes);
    NavigationController.__superClass__.constructor.call(this, params);
    (typeof (_a = this.navigation_selector) !== "undefined" && _a !== null) ? this.set_navigation(this.navigation_selector) : null;
    (typeof (_b = this.button_selector) !== "undefined" && _b !== null) ? this.set_button(this.button_selector) : null;
    (typeof (_c = this.target_selector) !== "undefined" && _c !== null) ? this.set_target(this.target_selector) : null;
    (typeof (_d = this.default_item) !== "undefined" && _d !== null) && (typeof (_e = this.navigation) !== "undefined" && _e !== null) && (typeof (_f = this.target) !== "undefined" && _f !== null) ? this.navigation.find(("#" + (this.default_item))).click() : null;
    return this;
  };
  __extends(NavigationController, Controller);
  NavigationController.prototype.set_navigation = function(selector) {
    return (typeof selector !== "undefined" && selector !== null) ? (this.navigation = $(selector)) : null;
  };
  NavigationController.prototype.set_button = function(selector) {
    var _a;
    if (typeof selector !== "undefined" && selector !== null) {
      if ((typeof (_a = this.navigation) !== "undefined" && _a !== null)) {
        this.button = this.navigation.find(selector);
        return this.button.click((function(__this) {
          var __func = function(event) {
            this.select(event);
            return false;
          };
          return (function() {
            return __func.apply(__this, arguments);
          });
        })(this));
      }
    }
  };
  NavigationController.prototype.set_target = function(selector) {
    return (typeof selector !== "undefined" && selector !== null) ? (this.target = $(selector)) : null;
  };
  NavigationController.prototype.select = function(event) {
    var _a, _b, _c;
    if (!(!this.before_change())) {
      this.selected = $(event.target).attr(this.button_attribute);
      if (!(typeof (_c = this.previous) !== "undefined" && _c !== null) || this.previous !== this.selected) {
        if ((typeof (_a = this.previous) !== "undefined" && _a !== null)) {
          this.target.removeClass(this.previous);
        }
        this.target.addClass(this.selected);
        if ((typeof (_b = this.list_controller) !== "undefined" && _b !== null)) {
          this.list_controller.index();
        }
        this.previous = this.selected;
        return this.previous;
      }
    }
  };
  NavigationController.prototype.before_change = function() {
    return true;
  };

  Model = function(params) {
    var _a, attribute, default_value;
    this.type = "model";
    if (!(typeof params !== "undefined" && params !== null)) {
      params = {};
    }
    this.attributes = jQuery.extend({
      idx: null
    }, this.attributes);
    _a = this.attributes;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      default_value = _a[attribute];
      this[attribute] = params[attribute] || default_value;
    }}
    return this;
  };
  Model.prototype.belongs_to = function(model) {
    if (model.type === "model") {
      this.parent_model = model;
      this.parent_model_class_name = model.class_name;
      return this.parent_model_class_name;
    }
  };
  Model.prototype.all = function() {
    return this._data();
  };
  Model.prototype.save = function() {
    var _a, _b, attribute, default_value, item, table;
    table = this._data();
    item = {};
    _a = this.attributes;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      default_value = _a[attribute];
      item[attribute] = this[attribute];
    }}
    console.log(("Index is currently set to " + (this.idx)));
    if (!(typeof (_b = this.idx) !== "undefined" && _b !== null)) {
      console.log("New record.");
      this.idx = this._increment();
    }
    table[this.idx] = item;
    console.log(("Attempted to save item at index: " + (this.idx)));
    this._commit(table);
    return true;
  };
  Model.prototype.destroy = function() {
    var table;
    table = this._data();
    console.log(this.idx);
    console.log(table[this.idx]);
    delete table[this.idx];
    return this._commit(table);
  };
  Model.prototype.find = function(query) {
    var _a, _b, _c, _d, attribute, attributes, default_value, idx, item, record, table, value;
    table = this._data();
    if (typeof query !== "undefined" && query !== null) {
      if (typeof (query) === "string") {
        item = table[query];
        if (typeof item !== "undefined" && item !== null) {
          attributes = {};
          _a = this.attributes;
          for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
            default_value = _a[attribute];
            if (attribute === "idx") {
              console.log(("Setting index to: " + (query)));
              attributes[attribute] = query;
            } else {
              attributes[attribute] = item[attribute];
            }
          }}
          return eval(("new " + (this.class_name) + "(attributes)"));
        } else {
          return null;
        }
      } else if (typeof (query) === "object") {
        _b = table;
        for (idx in _b) { if (__hasProp.call(_b, idx)) {
          record = _b[idx];
          _c = query;
          for (attribute in _c) { if (__hasProp.call(_c, attribute)) {
            value = _c[attribute];
            if ((typeof (_d = record[attribute]) !== "undefined" && _d !== null) && record[attribute] !== value) {
              delete table[idx];
            }
            return null;
          }}
        }}
        return table;
      }
    } else {
      return null;
    }
  };
  Model.prototype._data = function() {
    var items, storage;
    storage = localStorage.getItem(this.table_name);
    try {
      items = JSON.parse(storage);
    } catch (error) {
      alert(error);
      items = {};
    }
    return items;
  };
  Model.prototype._commit = function(table) {
    return localStorage.setItem(this.table_name, JSON.stringify(table));
  };
  Model.prototype._increment = function() {
    localStorage.setItem(("" + (this.table_name) + "_idx"), this._index() + 1);
    return this._index();
  };
  Model.prototype._index = function() {
    var index;
    index = localStorage.getItem(("" + (this.table_name) + "_idx"));
    if (!(typeof index !== "undefined" && index !== null)) {
      localStorage.setItem(("" + (this.table_name) + "_idx"), 1);
      index = 1;
    }
    return parseInt(index);
  };

  WebModel = function(params) {
    WebModel.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(WebModel, Model);
  WebModel.prototype.save = function(parent) {
    return null;
  };
  WebModel.prototype.destroy = function(parent) {
    return null;
  };
  WebModel.prototype.find = function(query) {
    var results;
    results = null;
    jQuery.getJSON(("/" + (this.table_name) + "/" + (query)), function(data) {
      results = data;
      return results;
    });
    return results;
  };

  EditNavigationController = function(params) {
    this.attributes = {
      edit_form_controller: null
    };
    EditNavigationController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(EditNavigationController, NavigationController);
  EditNavigationController.prototype.edit_form_controller = function(form_controller) {
    return (typeof form_controller !== "undefined" && form_controller !== null) ? (this.edit_form_controller = form_controller) : null;
  };
  EditNavigationController.prototype.before_change = function() {
    if (this.list_controller.modified()) {
      if (confirm("You have made changed would you like to discard them?")) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  ModifyFormController = function(params) {
    var _a, _b, _c;
    this.attributes = {
      navigation_controller: null,
      list_controller: null,
      mode_selector: null,
      count_selector: null
    };
    (typeof (_a = this.navigation_controller) !== "undefined" && _a !== null) ? this.set_navigation_controller(this.navigation_controller) : null;
    (typeof (_b = this.list_controller) !== "undefined" && _b !== null) ? this.set_list_controller(this.list_controller) : null;
    (typeof (_c = this.mode_selector) !== "undefined" && _c !== null) ? this.set_mode_selector(this.mode_selector) : null;
    ModifyFormController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(ModifyFormController, FormController);
  ModifyFormController.prototype.set_navigation_controller = function(navigation_controller) {
    return (typeof navigation_controller !== "undefined" && navigation_controller !== null) ? (this.navigation_controller = navigation_controller) : null;
  };
  ModifyFormController.prototype.set_list_controller = function(list_controller) {
    return (typeof list_controller !== "undefined" && list_controller !== null) ? (this.navigation_controller = list_controller) : null;
  };
  ModifyFormController.prototype.set_mode_selector = function(mode_selector) {
    var _a, _b, _c;
    (typeof mode_selector !== "undefined" && mode_selector !== null) ? (this.mode_selector = mode_selector) : null;
    (typeof (_a = this.form) !== "undefined" && _a !== null) && (typeof (_b = this.mode_selector) !== "undefined" && _b !== null) ? (this.mode_label = $(this.form.find(mode_selector))) : null;
    if (this.mode_label.length > 0) {
      if ((typeof (_c = this.navigation_controller) !== "undefined" && _c !== null)) {
        return this.mode_label.html(this.navigation_controller.selected);
      }
    } else {
      this.mode_label = null;
      return this.mode_label;
    }
  };
  ModifyFormController.prototype.set_count_selector = function(count_selector) {
    var _a, _b;
    (typeof count_selector !== "undefined" && count_selector !== null) ? (this.count_selector = count_selector) : null;
    (typeof (_a = this.form) !== "undefined" && _a !== null) && (typeof (_b = this.count_selector) !== "undefined" && _b !== null) ? (this.count_label = $(this.form.find(count_selector))) : null;
    if (this.count_label.length > 0) {
      if (this.list_controller) {
        return this.count_label.html(this.list_controller.modified_count);
      }
    } else {
      this.count_label = null;
      return this.count_label;
    }
  };
  ModifyFormController.prototype.set_form = function(selector) {
    ModifyFormController.__superClass__.set_form.call(this, selector);
    this.set_mode_selector();
    return this.set_count_selector();
  };

  TodoFormController = function(params) {
    this.item = new Todo();
    TodoFormController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(TodoFormController, FormController);
  TodoFormController.prototype.process_form = function(event) {
    var _a;
    this.item = TodoFormController.__superClass__.process_form.call(this, event);
    if (this.item.save()) {
      this.set_item(this.new_item());
      (typeof (_a = this.list_controller) !== "undefined" && _a !== null) ? this.list_controller.index() : null;
    }
    return false;
  };

  TodosListController = function(params) {
    this.item = new Todo();
    this.attributes = {
      mod_modes: ["delete", "move", "send", "today"]
    };
    TodosListController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(TodosListController, ListController);
  TodosListController.prototype.check_cell = function(idx) {
    var item;
    item = this.item.find(idx);
    if (!(this.is_modifying())) {
      if (item.complete()) {
        console.log('Enabled item.');
        return this.list.find(("#todo_" + (idx))).addClass(this.selected_class);
      } else {
        console.log('Disabled item.');
        return this.list.find(("#todo_" + (idx))).removeClass(this.selected_class);
      }
    } else {
      return this.list.find(("#todo_" + (idx))).toggleClass(this.selected_class);
    }
  };
  TodosListController.prototype.is_modifying = function() {
    var _a, _b, _c, mode;
    _b = this.mod_modes;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      mode = _b[_a];
      if (this.list.hasClass(mode)) {
        return true;
      }
    }
    return false;
  };
  TodosListController.prototype.modified = function() {
    if (this.list.find(("." + (this.selected_class))).length > 0 && this.is_modifying()) {
      return true;
    } else {
      return false;
    }
  };
  TodosListController.prototype.index = function() {
    return TodosListController.__superClass__.index.call(this, this.item.all());
  };
  TodosListController.prototype.build_cell = function(idx, item) {
    TodosListController.__superClass__.build_cell.call(this, idx, item);
    if (typeof item !== "undefined" && item !== null) {
      if (item.completed && this.is_modifying()) {
        this.do_not_index(idx);
      } else if (item.completed) {
        this.cell.addClass(this.selected_class);
      } else {
        this.cell.removeClass(this.selected_class);
      }
      return this.cell.click((function(__this) {
        var __func = function(event) {
          this.check_cell(idx);
          return false;
        };
        return (function() {
          return __func.apply(__this, arguments);
        });
      })(this));
    }
  };

  Category = function(params) {
    this.class_name = 'Category';
    this.table_name = 'categories';
    this.attributes = {
      name: ''
    };
    Category.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(Category, Model);

  Todo = function(params) {
    this.class_name = 'Todo';
    this.table_name = 'todos';
    this.attributes = {
      name: '',
      status: 'normal',
      link: null,
      completed: false,
      today: false,
      sent_to: null
    };
    Todo.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(Todo, Model);
  Todo.prototype.complete = function() {
    !this.completed ? (this.completed = true) : (this.completed = false);
    this.save();
    return this.completed;
  };

  jQuery.fn.clickable = function(options) {
    var defaults, settings;
    defaults = {
      class_selected: "selected",
      selector: "a"
    };
    settings = jQuery.extend(defaults, options);
    return $(this).each(function() {
      return $(this).click(function(event) {
        var item, link;
        item = $(this);
        link = $(item.find(settings.selector).get(0));
        item.hasClass(settings.class_selected) ? item.removeClass(settings.class_selected) : item.addClass(settings.class_selected);
        if (event.target.tagName !== settings.selector.toUpperCase()) {
          link.click(function(event) {
            if (link.attr("href") && link.attr("href") !== "#") {
              window.location = link.attr("href");
            }
            return event.stopPropagation();
          });
          return link.click();
        }
      });
    });
  };
  jQuery.fn.keyboardable = function(options) {
    var KeyboardNavigation, _a, defaults, keyboard_navigation, settings;
    defaults = {
      class_active: "active",
      key_next: "down",
      key_previous: "up",
      key_click: "space"
    };
    settings = jQuery.extend(defaults, options);
    KeyboardNavigation = function(objects) {
      this.objects = objects;
      this.index = false;
      this.active = false;
      $(document).bind('keydown', settings.key_next, (function(__this) {
        var __func = function() {
          return this.next();
        };
        return (function() {
          return __func.apply(__this, arguments);
        });
      })(this));
      $(document).bind('keydown', settings.key_previous, (function(__this) {
        var __func = function() {
          return this.previous();
        };
        return (function() {
          return __func.apply(__this, arguments);
        });
      })(this));
      $(document).bind('keydown', settings.key_click, (function(__this) {
        var __func = function() {
          return this.select();
        };
        return (function() {
          return __func.apply(__this, arguments);
        });
      })(this));
      return this;
    };
    KeyboardNavigation.prototype.next = function() {
      if (this.index || this.index === 0) {
        if (this.index < this.objects.length - 1) {
          this.index++;
        }
      } else {
        this.index = 0;
      }
      return this.activate(this.index);
    };
    KeyboardNavigation.prototype.previous = function() {
      if (this.index && this.index > 0) {
        this.index--;
      }
      return this.activate(this.index);
    };
    KeyboardNavigation.prototype.activate = function(index) {
      if (this.active) {
        this.active.removeClass(settings.class_active);
      }
      this.active = $(this.objects.get(index)).addClass(settings.class_active);
      return this.active;
    };
    KeyboardNavigation.prototype.select = function() {
      if (this.active) {
        return this.active.click();
      }
    };

    if (typeof window !== "undefined" && window !== null) {
      if ((typeof (_a = window.keyboard_navigation) !== "undefined" && _a !== null)) {
        keyboard_navigation = window.keyboard_navigation;
      } else {
        keyboard_navigation = new KeyboardNavigation(this);
        window.keyboard_navigation = keyboard_navigation;
      }
    }
    return this;
  };
  $(document).ready(function() {
    var modify_todos_list_form, todo_edit_nav, todo_form, todos_list;
    todos_list = new TodosListController({
      list_selector: "ul.tasks",
      cell_selector: "li.todo"
    });
    todo_form = new TodoFormController({
      form_selector: "#task_form",
      list_controller: todos_list
    });
    todo_edit_nav = new EditNavigationController({
      navigation_selector: "section#edit",
      target_selector: "body, ul.tasks",
      list_controller: todos_list,
      default_item: "do"
    });
    modify_todos_list_form = new ModifyFormController({
      form_selector: "#modification_form",
      navigation_controller: todo_edit_nav,
      list_controller: todos_list,
      mode_selector: ".mode",
      count_selector: ".count"
    });
    return modify_todos_list_form;
  });
})();
