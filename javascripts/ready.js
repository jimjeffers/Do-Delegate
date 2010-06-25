(function(){
  $(document).ready(function() {
    // Bind keyboard navigation.
    $("#content section > ul > li").keyboardable().clickable();
    // Handle specific task actions.
    $(document).bind('keydown', "d", function() {
      if ($("a#delete").length > 0) {
        window.location = $("a#delete").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "t", function() {
      if ($("a#today").length > 0) {
        window.location = $("a#today").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "m", function() {
      if ($("a#move").length > 0) {
        window.location = $("a#move").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "s", function() {
      if ($("a#send").length > 0) {
        window.location = $("a#send").attr("href");
        return window.location;
      }
    });
    $(document).bind('keydown', "h", function() {
      if ($("a#back").length > 0) {
        window.location = $("a#back").attr("href");
        return window.location;
      }
    });
    return $(document).bind('keydown', "b", function() {
      if ($("a#back").length > 0) {
        window.location = $("a#back").attr("href");
        return window.location;
      }
    });
  });
})();
