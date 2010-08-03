# A model represents a data object. This class just performs
# some essential attribute and relationship management. You
# will want to subclass a LocalModel or WebModel object
# in your actual application.
class Model
   constructor: (params) ->
      @type: "model"
      params: {} if !params?
      @attributes: jQuery.extend({
         idx: null
      }, @attributes)
      for attribute, default_value of @attributes
         this[attribute]: params[attribute] || default_value
   
   # Defines a parent relationship to the model.
   belongs_to: (model) ->
      if model.type == "model"
         @parent_model: model
         @parent_model_class_name: model.class_name
         @parent_model_table_name: model.table_name