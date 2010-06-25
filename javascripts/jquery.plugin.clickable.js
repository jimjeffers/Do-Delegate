(function(){
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
})();
