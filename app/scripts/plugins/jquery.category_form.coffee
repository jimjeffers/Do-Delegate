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
         form_contents: form.serialize()
         form.find("input").attr("disabled",true)
         $.post("/categories", form_contents, ((data) ->
            form.find("input").attr("disabled",false)
            if data.category
               list:          $(settings.list_selector)
               new_category:  list.find(".${settings.category_class}:last-child").clone()
               new_category.find("a").html("${data.category.name} <span class=\"focus\">0</span> <span class=\"total\">0</span>").attr("href","/categories/${data.category.id}/tasks")
               list.append(new_category)
         ), "json")
         false
      )
   )