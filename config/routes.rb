ActionController::Routing::Routes.draw do |map|
  map.resources :todos
  
  map.complete_todo 'todos/:id/complete', :controller => :todos, :action => :complete
  
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end
