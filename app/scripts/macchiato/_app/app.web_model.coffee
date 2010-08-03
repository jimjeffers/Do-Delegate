# A web model behaves the same as a model object but utilizes web 
# service calls as opposed to local storage. 
class WebModel extends Model
   constructor: (params) ->
      super params

   # Sends a JSON request via restful routing utilizing a paremeter
   # for the member method of the url.
   send_as: (member) ->
      path: "${this.path()}/${@member}"
      post_data: @attributes
      $.post(path, post_data, ((data) ->
         alert data
      ), "json")

   # Sends a delete request via JSON and restful routing.
   destroy: (parent) ->
      null
      
   # Finds a specific JSON object at the requested id.
   find: (id) ->
      results: null
   
   # Returns the restful route to the current object.
   path: ->
      "/${@table_name}/${@attributes.id}"
   
   # Deprecate the methods we no longer need or want to have
   # access to from the traditional model object.
   send_deprecated_message: ->
      console.log("Not utilized by web model.")
      null
   all: ->
      this.send_deprecated_message()
   save: ->
      this.send_deprecated_message()
   destroy: ->
      this.send_deprecated_message()
   find: (query) ->
      this.send_deprecated_message()
   _data: ->
      this.send_deprecated_message()
   _commit: (table) ->
      this.send_deprecated_message()
   _increment: ->
      this.send_deprecated_message()
   _index: ->
      this.send_deprecated_message()
      