$(document).ready( ->
   # Bind keyboard navigation.
   $("#content section > ul > li").keyboardable().clickable()
   
   # Handle specific task actions.
   $(document).bind('keydown', "d", ->
      window.location: $("a#delete").attr("href") if $("a#delete").length > 0
   )
   $(document).bind('keydown', "t", ->
      window.location: $("a#today").attr("href") if $("a#today").length > 0
   )
   $(document).bind('keydown', "m", ->
      window.location: $("a#move").attr("href") if $("a#move").length > 0
   )
   $(document).bind('keydown', "s", ->
      window.location: $("a#send").attr("href") if $("a#send").length > 0
   )
   $(document).bind('keydown', "h", ->
      window.location: $("a#back").attr("href") if $("a#back").length > 0
   )
   $(document).bind('keydown', "b", ->
      window.location: $("a#back").attr("href") if $("a#back").length > 0
   )
)