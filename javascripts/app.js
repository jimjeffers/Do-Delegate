(function(){
  var Category, Controller, EditNavigationController, FormController, ListController, Model, NavigationController, Todo, TodoFormController, TodosListController;
  var __hasProp = Object.prototype.hasOwnProperty, __slice = Array.prototype.slice, __bind = function(func, obj, args) {
    return function() {
      return func.apply(obj || {}, args ? args.concat(__slice.call(arguments, 0)) : arguments);
    };
  }, __extends = function(child, parent) {
    var ctor = function(){ };
    ctor.prototype = parent.prototype;
    child.__superClass__ = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
  };
  Controller = function(params) {
    var _a, _b, attribute, default_value;
    // Bind any attributes.
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
    return this.form.submit(__bind(function(event) {
        return this.process_form(event);
      }, this));
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
        if (field.length > 0) {
          return field.val(this.item[attribute]);
        }
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
  // Sets a list controller to the form object.
  FormController.prototype.set_list_controller = function(list_controller) {
    this.list_controller = list_controller;
    return this.list_controller;
  };
  // Callbacks for inherited methods from Controller.
  // ------------------------------------------------------------
  FormController.prototype.new_item = function(attributes) {
    return FormController.__superClass__.new_item.call(this, attributes);
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
  // Callbacks for inherited methods from Controller.
  // ------------------------------------------------------------
  ListController.prototype.new_item = function(attributes) {
    return ListController.__superClass__.new_item.call(this, attributes);
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
    if ((typeof selector !== "undefined" && selector !== null)) {
      this.navigation = $(selector);
      return this.navigation;
    }
  };
  NavigationController.prototype.set_button = function(selector) {
    var _a;
    if ((typeof selector !== "undefined" && selector !== null)) {
      if ((typeof (_a = this.navigation) !== "undefined" && _a !== null)) {
        this.button = this.navigation.find(selector);
        return this.button.click(__bind(function(event) {
            this.select(event);
            return false;
          }, this));
      }
    }
  };
  NavigationController.prototype.set_target = function(selector) {
    if ((typeof selector !== "undefined" && selector !== null)) {
      this.target = $(selector);
      return this.target;
    }
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
  // Callbacks for inherited methods from Controller.
  // ------------------------------------------------------------
  NavigationController.prototype.new_item = function(attributes) {
    return NavigationController.__superClass__.new_item.call(this, attributes);
  };

  Model = function(params) {
    var _a, attribute, default_value;
    if (!(typeof params !== "undefined" && params !== null)) {
      params = {};
    }
    _a = this.attributes;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      default_value = _a[attribute];
      this[attribute] = params[attribute] || default_value;
    }}
    return this;
  };
  // Grabs and parses JSON data from local storage.
  Model.prototype.data = function() {
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
  // Converts JSON data to string and saves to local storage.
  Model.prototype.commit = function(table) {
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
  // Will create or update the current object as a JSON object
  // provided an index is passed or not.
  Model.prototype.save = function() {
    var _a, attribute, default_value, item, table;
    table = this.data();
    item = {};
    _a = this.attributes;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      default_value = _a[attribute];
      item[attribute] = this[attribute];
    }}
    console.log(("Index is currently set to " + (this.idx)));
    if (this.idx === "false" || !this.idx) {
      console.log("New record.");
      this.idx = this._increment();
    }
    table[this.idx] = item;
    console.log(("Attempted to save item at index: " + (this.idx)));
    this.commit(table);
    return true;
  };
  // Removes the current object from the JSON object.
  Model.prototype.destroy = function() {
    var table;
    table = this.data();
    console.log(this.idx);
    console.log(table[this.idx]);
    delete table[this.idx];
    return this.commit(table);
  };
  // Finds a specific json object at the requested index.
  Model.prototype.find = function(idx) {
    var _a, attribute, attributes, default_value, item, table;
    table = this.data();
    item = table[idx];
    if ((typeof item !== "undefined" && item !== null)) {
      attributes = {};
      _a = this.attributes;
      for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
        default_value = _a[attribute];
        if (attribute === "idx") {
          console.log(("Setting index to: " + (idx)));
          attributes[attribute] = idx;
        } else {
          attributes[attribute] = item[attribute];
        }
      }}
      return eval(("new " + (this.class_name) + "(attributes)"));
    } else {
      return false;
    }
  };
  // An alias for data()
  Model.prototype.all = function() {
    return this.data();
  };

  EditNavigationController = function(params) {
    this.attributes = {
      edit_form_controller: null
    };
    EditNavigationController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(EditNavigationController, NavigationController);
  // Custom behaviors can be added here.
  // ------------------------------------------------------------
  // Adds a form controller that can be referenced by the
  // navigation controller.
  EditNavigationController.prototype.edit_form_controller = function(form_controller) {
    if ((typeof form_controller !== "undefined" && form_controller !== null)) {
      this.edit_form_controller = form_controller;
      return this.edit_form_controller;
    }
  };
  // Callbacks for inherited methods from NavigationController.
  // Feel free to override or add your own
  // ------------------------------------------------------------
  EditNavigationController.prototype.set_navigation = function(selector) {
    return EditNavigationController.__superClass__.set_navigation.call(this, selector);
  };
  EditNavigationController.prototype.set_button = function(selector) {
    return EditNavigationController.__superClass__.set_button.call(this, selector);
  };
  EditNavigationController.prototype.set_target = function(selector) {
    return EditNavigationController.__superClass__.set_target.call(this, selector);
  };
  EditNavigationController.prototype.select = function(event) {
    return EditNavigationController.__superClass__.select.call(this, event);
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
  EditNavigationController.prototype.new_item = function(attributes) {
    return EditNavigationController.__superClass__.new_item.call(this, attributes);
  };

  TodoFormController = function(params) {
    // We set the item for the type of object the controller maintains
    // by storing an instance of that model as a property of the
    // controller.
    this.item = new Todo();
    // We call the controller super method to setup any simple bindings
    // for inherited functionality.
    TodoFormController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(TodoFormController, FormController);
  // Custom behaviors can be added here.
  // ------------------------------------------------------------
  // Callbacks for inherited methods from ListController.
  // Feel free to override or add your own
  // ------------------------------------------------------------
  // Pass a css selector to grab the form object you want to bind
  // the controller to.
  TodoFormController.prototype.set_form = function(selector) {
    return TodoFormController.__superClass__.set_form.call(this, selector);
  };
  // Sets the passed item as the current item property of the class.
  // Additionally, this binds that specific item to the controllers form.
  TodoFormController.prototype.set_item = function(item) {
    return TodoFormController.__superClass__.set_item.call(this, item);
  };
  // Sets a list controller to the form object.
  TodoFormController.prototype.set_list_controller = function(list_controller) {
    return TodoFormController.__superClass__.set_list_controller.call(this, list_controller);
  };
  // Saves or updates the controller's item
  TodoFormController.prototype.process_form = function(event) {
    // Comment out super event if you do not want to edit or create a record.
    // @item: super event
    // Stop the form event from propogating.
    return false;
  };

  TodoFormController = function(params) {
    // We set the item for the type of object the controller maintains
    // by storing an instance of that model as a property of the
    // controller.
    this.item = new Todo();
    // We call the controller super method to setup any simple bindings
    // for inherited functionality.
    TodoFormController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(TodoFormController, FormController);
  // Custom behaviors can be added here.
  // ------------------------------------------------------------
  // Callbacks for inherited methods from ListController.
  // Feel free to override or add your own
  // ------------------------------------------------------------
  // Pass a css selector to grab the form object you want to bind
  // the controller to.
  TodoFormController.prototype.set_form = function(selector) {
    return TodoFormController.__superClass__.set_form.call(this, selector);
  };
  // Sets the passed item as the current item property of the class.
  // Additionally, this binds that specific item to the controllers form.
  TodoFormController.prototype.set_item = function(item) {
    return TodoFormController.__superClass__.set_item.call(this, item);
  };
  // Sets a list controller to the form object.
  TodoFormController.prototype.set_list_controller = function(list_controller) {
    return TodoFormController.__superClass__.set_list_controller.call(this, list_controller);
  };
  // Saves or updates the controller's item
  TodoFormController.prototype.process_form = function(event) {
    var _a;
    this.item = TodoFormController.__superClass__.process_form.call(this, event);
    if (this.item.save()) {
      this.set_item(this.new_item());
      if ((typeof (_a = this.list_controller) !== "undefined" && _a !== null)) {
        this.list_controller.index();
        // Stop the form event from propogating.
      }
    }
    return false;
  };

  TodosListController = function(params) {
    // We set the item for the type of object the controller maintains
    // by storing an instance of that model as a property of the
    // controller.
    this.item = new Todo();
    // Custom attributes.
    this.attributes = {
      mod_modes: ["delete", "move", "send", "today"]
    };
    // We call the controller super method to setup any simple bindings
    // for inherited functionality.
    TodosListController.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(TodosListController, ListController);
  // Custom behaviors can be added here.
  // ------------------------------------------------------------
  // Marks a cell as pending.
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
  // Returns a cache of modified cells.
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
  // Callbacks for inherited methods from ListController.
  // Feel free to override or add your own
  // ------------------------------------------------------------
  // Sets a list object for the controller.
  TodosListController.prototype.set_list = function(selector) {
    return TodosListController.__superClass__.set_list.call(this, selector);
  };
  // Sets an HTML object to be used as a cell for displaying instances of the item.
  TodosListController.prototype.set_cell = function(selector) {
    return TodosListController.__superClass__.set_cell.call(this, selector);
  };
  // Sets the passed item as the current item property of the class.
  // Additionally, this binds that specific item to the controllers form.
  TodosListController.prototype.set_item = function(item) {
    return TodosListController.__superClass__.set_item.call(this, item);
  };
  // This is just a callback to implement functionality from the
  // controller superclass.
  TodosListController.prototype.new_item = function(attributes) {
    return TodosListController.__superClass__.new_item.call(this, attributes);
  };
  // Renders a list of the controllers element.
  TodosListController.prototype.index = function() {
    return TodosListController.__superClass__.index.call(this, this.item.all());
  };
  // Use this to override or add additional behavior to how items are
  // rendered as cells.
  TodosListController.prototype.build_cell = function(idx, item) {
    TodosListController.__superClass__.build_cell.call(this, idx, item);
    if ((typeof item !== "undefined" && item !== null)) {
      if (item.completed && this.is_modifying()) {
        this.do_not_index(idx);
      } else if (item.completed) {
        this.cell.addClass(this.selected_class);
      } else {
        this.cell.removeClass(this.selected_class);
      }
      return this.cell.click(__bind(function(event) {
          this.check_cell(idx);
          return false;
        }, this));
    }
  };
  // Destroys a cell.
  TodosListController.prototype.destroy_cell = function(idx) {
    return TodosListController.__superClass__.destroy_cell.call(this, idx);
  };

  Category = function(params) {
    // Maybe there is a way to do this with metaprogramming
    // but for now we'll need to specify the name of the object
    // and the table like this.
    this.class_name = 'Category';
    this.table_name = 'categories';
    // Declare the attributes for this object here in a hash.
    // Keys are the properties and values are their defaults.
    this.attributes = {
      name: '',
      idx: false
    };
    // The model object will now build us something nice with
    // the properties we've just set.
    Category.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(Category, Model);
  // Custom behaviors should go in this area.
  // ------------------------------------------------------------
  // # Some description of this behavior.
  // some_special_behavior: ->
  //   console.log 'Do something cool.'
  // Callbacks/Overrides should go in this area.
  // ------------------------------------------------------------
  // These callbacks are just hooks to the super class. You need
  // to have these declared in order to get this behavior from
  // the current object. But luckily, if you wanted to do something
  // extra before or after the core event fires you can add your
  // own logic to these functions here.
  Category.prototype.data = function() {
    return Category.__superClass__.data.call(this);
  };
  Category.prototype.save = function() {
    return Category.__superClass__.save.call(this);
  };
  Category.prototype.find = function(idx) {
    return Category.__superClass__.find.call(this, idx);
  };
  Category.prototype.all = function() {
    return Category.__superClass__.all.call(this);
  };
  Category.prototype.destroy = function() {
    return Category.__superClass__.destroy.call(this);
  };

  Todo = function(params) {
    // Maybe there is a way to do this with metaprogramming
    // but for now we'll need to specify the name of the object
    // and the table like this.
    this.class_name = 'Todo';
    this.table_name = 'todos';
    // Declare the attributes for this object here in a hash.
    // Keys are the properties and values are their defaults.
    this.attributes = {
      name: '',
      status: 'normal',
      link: null,
      completed: false,
      today: false,
      idx: null
    };
    // The model object will now build us something nice with
    // the properties we've just set.
    Todo.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(Todo, Model);
  // Custom behaviors should go in this area.
  // ------------------------------------------------------------
  // Toggle the current item from the completed state.
  Todo.prototype.complete = function() {
    !this.completed ? (this.completed = true) : (this.completed = false);
    this.save();
    return this.completed;
  };
  // Callbacks/Overrides should go in this area.
  // ------------------------------------------------------------
  // These callbacks are just hooks to the super class. You need
  // to have these declared in order to get this behavior from
  // the current object. But luckily, if you wanted to do something
  // extra before or after the core event fires you can add your
  // own logic to these functions here.
  Todo.prototype.data = function() {
    return Todo.__superClass__.data.call(this);
  };
  Todo.prototype.save = function() {
    return Todo.__superClass__.save.call(this);
  };
  Todo.prototype.find = function(idx) {
    return Todo.__superClass__.find.call(this, idx);
  };
  Todo.prototype.all = function() {
    return Todo.__superClass__.all.call(this);
  };
  Todo.prototype.destroy = function() {
    return Todo.__superClass__.destroy.call(this);
  };

  jQuery.fn.clickable = function(options) {
    var defaults, settings;
    // Take in some basic defaults to allow for an override of the class we toggle
    // to mark the object as selected.
    defaults = {
      class_selected: "selected",
      selector: "a"
    };
    settings = jQuery.extend(defaults, options);
    // Add a click event to each item. Toggle the on class on or off and then fire
    // a click action on the first link we find inside of that object.
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
    // Take in some basic defaults. I'm using the jquery.hotkeys module to allow us
    // to define keys in plain english instead of by keyCode. So we can say "return"
    // instead of "13". It makes life easier and allows us to use combinators easily
    // so we could say "shift+up" or "ctrl+up" rather than "up".
    defaults = {
      class_active: "active",
      key_next: "down",
      key_previous: "up",
      key_click: "space"
    };
    settings = jQuery.extend(defaults, options);
    // KeyboardNavigation class stores the objects passed to the plugin. It stores
    // the current item and marks items as selected or deselected as you traverse
    // through them with the keyboard.
    KeyboardNavigation = function(objects) {
      this.objects = objects;
      this.index = false;
      this.active = false;
      // Here we bind the key events to the document so that they have a
      // global effect on the user's keyboard input.
      $(document).bind('keydown', settings.key_next, __bind(function() {
          return this.next();
        }, this));
      $(document).bind('keydown', settings.key_previous, __bind(function() {
          return this.previous();
        }, this));
      $(document).bind('keydown', settings.key_click, __bind(function() {
          return this.select();
        }, this));
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

    // Store the keyboard navigation object as a global property so that
    // it doesn't get declared multiple times. We only want one instance of this
    // object. In the future we may want to develop a way to append more objects
    // or flush the current list of objects from the navigation. This could be
    // useful if we load in a new list via ajax, etc. etc.
    if ((typeof window !== "undefined" && window !== null)) {
      if ((typeof (_a = window.keyboard_navigation) !== "undefined" && _a !== null)) {
        keyboard_navigation = window.keyboard_navigation;
      } else {
        keyboard_navigation = new KeyboardNavigation(this);
        window.keyboard_navigation = keyboard_navigation;
      }
    }
    // Follow the convention of returning 'this' so that the plugin is chainable
    // when using it in jquery.
    return this;
  };
  $(document).ready(function() {
    var todo_edit_nav, todo_form, todos_list;
    // Setup a todos list controller to display current todos.
    todos_list = new TodosListController({
      list_selector: "ul.tasks",
      cell_selector: "li.todo"
    });
    // Setup a todo form and bind it to the inline form on the page.
    todo_form = new TodoFormController({
      form_selector: "#task_form",
      list_controller: todos_list
    });
    // Setup a navigation controller to mimick navigation.
    todo_edit_nav = new EditNavigationController({
      navigation_selector: "section#edit",
      target_selector: "body, ul.tasks",
      list_controller: todos_list,
      default_item: "do"
    });
    return todo_edit_nav;
  });
})();
