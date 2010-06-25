(function(){
  var __slice = Array.prototype.slice, __bind = function(func, obj, args) {
    return function() {
      return func.apply(obj || {}, args ? args.concat(__slice.call(arguments, 0)) : arguments);
    };
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
      this.index || this.index === 0 ? this.index++ : (this.index = 0);
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
})();
