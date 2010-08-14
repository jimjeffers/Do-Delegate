(function(){
  jQuery.fn.edit_navigation = function(options) {
    var defaults, settings;
    defaults = {
      link_selector: "a",
      list_selector: false,
      selected_class: "selected",
      completed_mode: "do",
      completed_class: "completed",
      confirmation_message: "You have made several changes are you sure you want to discard them?"
    };
    settings = jQuery.extend(defaults, options);
    return $(this).each(function() {
      var links, list, nav;
      nav = $(this);
      links = nav.find(settings.link_selector);
      settings.list_selector ? (list = $(settings.list_selector)) : (list = false);
      return links.click(function(event) {
        var _a, _b, _c, _d, _e, _f, link, managed_element, selected_link;
        selected_link = $(this);
        if (!nav.hasClass(selected_link.attr("id"))) {
          if (!list || list.find(("." + (settings.selected_class))).length === 0 || list.hasClass(settings.completed_mode) || list.find(("." + (settings.selected_class))).length > 0 && confirm(settings.confirmation_message)) {
            if (selected_link.attr("id") !== "") {
              if (list) {
                if (selected_link.attr("id") !== settings.completed_mode && list.hasClass(settings.completed_mode)) {
                  list.find(("." + (settings.selected_class))).addClass(settings.completed_class).removeClass(settings.selected_class);
                } else if (selected_link.attr("id") === settings.completed_mode && !nav.hasClass(settings.completed_mode)) {
                  list.find(("." + (settings.selected_class))).removeClass(settings.selected_class);
                  list.find(("." + (settings.completed_class))).removeClass(settings.completed_class).addClass(settings.selected_class);
                } else {
                  list.find(("." + (settings.selected_class))).removeClass(settings.selected_class);
                }
              }
              _b = [nav, list];
              for (_a = 0, _c = _b.length; _a < _c; _a++) {
                managed_element = _b[_a];
                if (managed_element) {
                  _e = links;
                  for (_d = 0, _f = _e.length; _d < _f; _d++) {
                    link = _e[_d];
                    managed_element.removeClass($(link).attr("id"));
                  }
                  managed_element.addClass(selected_link.attr("id"));
                }
              }
            }
          }
        }
        return false;
      });
    });
  };
  jQuery.fn.selectable = function(options) {
    var defaults, settings;
    defaults = {
      selected_class: "selected",
      active_class: "active",
      completed_mode: "do",
      modifier_element_id: false
    };
    settings = jQuery.extend(defaults, options);
    return $(this).each(function() {
      var item, modifier_element;
      item = $(this);
      settings.modifier_element_id ? (modifier_element = $(("#" + (settings.modifier_element_id)))) : null;
      return item.click(function(event) {
        var selected_item;
        selected_item = $(this);
        if (modifier_element && modifier_element.hasClass(settings.completed_mode)) {
          selected_item.parent().addClass(settings.active_class);
          $.getJSON(selected_item.attr("href"), (function(data) {
            data['new_path'] ? selected_item.attr("href", data.new_path) : null;
            if (data['object']) {
              data.object.task.aasm_state === "completed" ? selected_item.parent().addClass(settings.selected_class) : selected_item.parent().removeClass(settings.selected_class);
              return selected_item.parent().removeClass(settings.active_class);
            }
          }));
        } else {
          selected_item.parent().hasClass(settings.selected_class) ? selected_item.parent().removeClass(settings.selected_class) : selected_item.parent().addClass(settings.selected_class);
        }
        return false;
      });
    });
  };
  $(document).ready(function() {
    $("#edit").edit_navigation({
      list_selector: '.tasks'
    });
    return $("ul.tasks > li.task a").selectable({
      modifier_element_id: 'tasks_list'
    });
  });
})();
