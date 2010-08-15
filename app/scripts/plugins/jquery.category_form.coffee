jQuery.fn.category_form: (options) ->
   # Settings
   # ------------------------------------------------
   # *   category_class: Determines if elements representing a category on the page.
   defaults: {
      category_class:   "category"
      list_selector:    ".categories"
   }
   settings: jQuery.extend(defaults,options)
   
   $(this).each( ->
      form: $(this)
      form.submit( (event) ->
         $.post("/categories", form.serialize(), ((data) ->
            alert "data"
            if data.category
               $("#category_name").val("")
               list:       $(settings.list_selector)
               new_category:   list.find(".${settings.category_class}:last-child").clone()
               new_category.find("a").html("${data.category.name} <span class=\"focus\">0</span> <span class=\"total\">0</span>").attr("href","/categories/${data.category.id}/tasks")
               list.append(new_category)
         ), "json")
         false
      )
   )