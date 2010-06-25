$(document).ready( ->
   # Bind keyboard navigation.
   $("#content section > ul > li").keyboardable().clickable()
   
   # Handle specific task actions.
   $(document).bind('keydown', "shift+d", ->
      window.location: $("a#delete").attr("href") if $("a#delete").length > 0
   )
   $(document).bind('keydown', "shift+t", ->
      window.location: $("a#today").attr("href") if $("a#today").length > 0
   )
   $(document).bind('keydown', "shift+m", ->
      window.location: $("a#move").attr("href") if $("a#move").length > 0
   )
   $(document).bind('keydown', "shift+s", ->
      window.location: $("a#send").attr("href") if $("a#send").length > 0
   )
   $(document).bind('keydown', "shift+h", ->
      window.location: $("a#back").attr("href") if $("a#back").length > 0
   )
)