(function(){
  var Category, Controller, Model, Todo, TodosController;
  var __slice = Array.prototype.slice, __bind = function(func, obj, args) {
    return function() {
      return func.apply(obj || {}, args ? args.concat(__slice.call(arguments, 0)) : arguments);
    };
  }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    var ctor = function(){ };
    ctor.prototype = parent.prototype;
    child.__superClass__ = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
  };
  Controller = function() {
    this.class_name = this.item.class_name;
    console.log(("Initiated " + (this.class_name) + " controller."));
    return this;
  };
  Controller.prototype.set_form = function(controller) {
    return this.form.submit(__bind(function(event) {
        return this.process_form(event);
      }, this));
  };
  Controller.prototype.index = function(items) {
    var _a, _b, idx, item;
    this.cell = this.cell.clone();
    this.cell.show();
    this.list.find(this.cell_selector).remove();
    _a = []; _b = items;
    for (idx in _b) { if (__hasProp.call(_b, idx)) {
      item = _b[idx];
      _a.push((function() {
        this.build_cell(idx, item);
        this.list.append(this.cell);
        this.cell = this.cell.clone();
        return this.cell;
      }).call(this));
    }}
    return _a;
  };
  Controller.prototype.build_cell = function(idx, item) {
    var _a, attribute, binding, value;
    _a = item;
    for (attribute in _a) { if (__hasProp.call(_a, attribute)) {
      value = _a[attribute];
      binding = this.cell.find(("." + (attribute)));
      binding.length > 0 ? binding.html(value) : null;
    }}
    return this.cell.attr("id", ("" + (this.class_name.toLowerCase()) + "_" + (idx)));
  };
  Controller.prototype.set_item = function(item) {
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
  Controller.prototype.set_list = function(selector) {
    if ($(selector).length > 0) {
      this.list = $(selector);
      return this.list;
    } else {
      return console.log(("" + (this.class_name) + " controller could not find list with: " + (selector)));
    }
  };
  Controller.prototype.set_cell = function(selector) {
    var _a, cell;
    if ((typeof (_a = this.list) !== "undefined" && _a !== null)) {
      if ($(selector).length > 0) {
        cell = $($(selector).first());
        this.cell = cell.clone();
        cell.remove();
        this.cell_selector = selector;
        return this.cell_selector;
      } else {
        return console.log(("" + (this.class_name) + " controller could not find cells with: " + (selector)));
      }
    } else {
      return console.log(("" + (this.class_name) + " controller could not find cells because no list has been set."));
    }
  };
  Controller.prototype.process_form = function(event) {
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
  Controller.prototype.new_item = function(attributes) {
    return eval(("new " + (this.class_name) + "(attributes)"));
  };
  Controller.prototype.parse_id = function(id) {
    return id.split("_")[1];
  };
  Controller.prototype.destroy_cell = function(idx) {
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

  TodosController = function() {
    // We set the item for the type of object the controller maintains
    // by storing an instance of that model as a property of the
    // controller.
    this.item = new Todo();
    // The form property stores a jQuerytized instance of our form
    // object embedded on the page.
    this.form = false;
    // The cell object stores a representation of a cell node we use
    // to render that object.
    this.cell = false;
    // We call the controller super method to setup any simple bindings
    // for inherited functionality.
    TodosController.__superClass__.constructor.call(this);
    return this;
  };
  __extends(TodosController, Controller);
  // Pass a css selector to grab the form object you want to bind
  // the controller to.
  TodosController.prototype.set_form = function(selector) {
    this.form = $(selector);
    return TodosController.__superClass__.set_form.call(this);
  };
  // Sets a list object for the controller.
  TodosController.prototype.set_list = function(selector) {
    return TodosController.__superClass__.set_list.call(this, selector);
  };
  // Sets an HTML object to be used as a cell for displaying instances of the item.
  TodosController.prototype.set_cell = function(selector) {
    return TodosController.__superClass__.set_cell.call(this, selector);
  };
  // Sets the passed item as the current item property of the class.
  // Additionally, this binds that specific item to the controllers form.
  TodosController.prototype.set_item = function(item) {
    return TodosController.__superClass__.set_item.call(this, item);
  };
  // This is just a callback to implement functionality from the
  // controller superclass.
  TodosController.prototype.new_item = function(attributes) {
    return TodosController.__superClass__.new_item.call(this, attributes);
  };
  // Renders a list of the controllers element.
  TodosController.prototype.index = function() {
    return TodosController.__superClass__.index.call(this, this.item.all());
  };
  // Use this to override or add additional behavior to how items are
  // rendered as cells.
  TodosController.prototype.build_cell = function(idx, item) {
    TodosController.__superClass__.build_cell.call(this, idx, item);
    if ((typeof item !== "undefined" && item !== null)) {
      item.pending ? this.cell.addClass("selected") : this.cell.removeClass("selected");
      this.cell.click(__bind(function(event) {
          this.list.hasClass("delete") ? this.destroy_cell(idx) : this.check_cell(idx);
          return false;
        }, this));
    }
    return console.log("Cell successfuly created!");
  };
  // Marks a cell as pending.
  TodosController.prototype.check_cell = function(idx) {
    var item;
    item = this.item.find(idx);
    if (!item.pending) {
      console.log('Enabled item.');
      item.pending = true;
      this.list.find(("#todo_" + (idx))).addClass('selected');
    } else {
      console.log('Disabled item.');
      item.pending = false;
      this.list.find(("#todo_" + (idx))).removeClass('selected');
    }
    return item.save();
  };
  // Saves or updates the controller's item
  TodosController.prototype.process_form = function(event) {
    this.item = TodosController.__superClass__.process_form.call(this, event);
    this.item.save() ? this.set_item(this.new_item()) : null;
    this.index();
    return false;
  };
  // Destroys a cell.
  TodosController.prototype.destroy_cell = function(idx) {
    return TodosController.__superClass__.destroy_cell.call(this, idx);
  };

  Category = function(params) {
    // Maybe there is a way to do this with metaprogramming
    // but for now we'll need to specify the name of the object
    // and the table like this.
    this.class_name = 'Category';
    this.table_name = 'categories';
    // Declare the attributes for this object here in an hash.
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
  Category.prototype.data = function() {
    return Category.__superClass__.data.call(this, this.table_name);
  };
  Category.prototype.save = function() {
    return Category.__superClass__.save.call(this, this.idx);
  };
  Category.prototype.find = function(idx) {
    return Category.__superClass__.find.call(this, idx);
  };

  Todo = function(params) {
    // Maybe there is a way to do this with metaprogramming
    // but for now we'll need to specify the name of the object
    // and the table like this.
    this.class_name = 'Todo';
    this.table_name = 'todos';
    // Declare the attributes for this object here in an hash.
    // Keys are the properties and values are their defaults.
    this.attributes = {
      name: '',
      status: 'normal',
      link: false,
      completed: false,
      idx: false
    };
    // The model object will now build us something nice with
    // the properties we've just set.
    Todo.__superClass__.constructor.call(this, params);
    return this;
  };
  __extends(Todo, Model);
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
    var _a, key, key_actions, selector, todo_controller;
    // Bind keyboard navigation.
    $("#content section > ul > li").keyboardable().clickable();
    // Handle specific task actions.
    key_actions = {
      'a#delete': 'd',
      'a#today': 't',
      'a#move': 'm',
      'a#send': 's',
      'a#back': 'h',
      'a#back': 'b'
    };
    // Bind html objects to key codes.
    _a = key_actions;
    for (selector in _a) { if (__hasProp.call(_a, selector)) {
      key = _a[selector];
      (function() {
        return $(document).bind('keydown', key, function() {
          if ($(selector).length > 0) {
            window.location = $(selector).attr("href");
            return window.location;
          }
        });
      })();
    }}
    // Setup a todos controller and bind it to the inline form on the page.
    todo_controller = new TodosController();
    todo_controller.set_form(".edit-area form");
    todo_controller.set_list(".tasks");
    todo_controller.set_cell(".todo");
    return todo_controller.index();
  });
})();
