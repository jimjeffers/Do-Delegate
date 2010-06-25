(function(){
  $(document).ready(function() {
    // Bind keyboard navigation.
    $("#content section > ul > li").keyboardable().clickable();
    // Handle specific task actions.
    $(document).bind('keydown', "shift+d", function() {
      if ($("a#delete").length > 0) {
        window.location = $("a#delete").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "shift+t", function() {
      if ($("a#today").length > 0) {
        window.location = $("a#today").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "shift+m", function() {
      if ($("a#move").length > 0) {
        window.location = $("a#move").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "shift+s", function() {
      if ($("a#send").length > 0) {
        window.location = $("a#send").attr("href");
        return window.location;
      }
    });
    return $(document).bind('keydown', "shift+h", function() {
      if ($("a#back").length > 0) {
        window.location = $("a#back").attr("href");
        return window.location;
      }
    });
  });
})();
