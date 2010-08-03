# A web model behaves the same as a model object but utilizes web 
# service calls as opposed to local storage. 
class WebModel extends Model
   constructor: (params) ->
      super params

   # Sends a JSON request via restful routing.
   save: (parent) ->
      path: "/${@table_name}/${query}"
      if parent?
         path: "${parent.table_name}/${parent.id}/${@table_name}/${query}"
      jQuery.getJSON(path, (data) ->
         results = data
      )

   # Sends a delete request via JSON and restful routing.
   destroy: (parent) ->
      jQuery.getJSON("/${@table_name}/${query}", (data) ->
         results = data
      )
      
   # Finds a specific JSON object at the requested id.
   find: (query) ->
      results: null
      jQuery.getJSON("/${@table_name}/${query}", (data) ->
         results = data
      )
      return results
   
   path_for_parent: (parent) ->
      