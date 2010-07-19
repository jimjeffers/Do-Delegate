# A web model behaves the same as a model object but utilizes web 
# service calls as opposed to local storage. 
class WebModel extends Model
   constructor: (params) ->
      super params

   # Sends a JSON request via restful routing.
   save: (parent) ->
      null

   # Removes the current object from the JSON object and commits
   # the changes to local storage.
   destroy: (parent) ->
      null
      
   # Finds a specific JSON object at the requested id.
   find: (query) ->
      results: null
      jQuery.getJSON("/${@table_name}/${query}", (data) ->
         results = data
      )
      return results