ActionController::Routing::Routes.draw do |map|
  
  # --------------------------------------------------------------
  # Tasks
  #
  # Tasks our treated as a simple resource with several member
  # and collection methods to make it easy to filter or change
  # the state of certain tasks.
  
  map.resources :tasks, 
    :member       => { :complete => [:get, :post],
                       :undo     => [:get, :post]},
    :collection   => { :focus    => :get }
  
  # --------------------------------------------------------------
  # Users
  #
  # A user is treated like a resource but we've added some named
  # routes as a convenience to easily access the signup and account
  # pages.
  
  map.resources     :users
  map.signup        'signup',         :controller => :users,            :action => :new
  map.account       'account',        :controller => :users,            :action => :edit
  
  # --------------------------------------------------------------
  # User Sessions
  #
  # We treat user sessions as a simple resource but have added some
  # named routes as convenience methods to easily access the login
  # and logout pages.
  
  map.resources     :user_sessions
  map.login         'login',          :controller => :user_sessions,    :action => :new
  map.logout        'logout',         :controller => :user_sessions,    :action => :destroy
  
  # --------------------------------------------------------------
  # Defaults
  #
  # When all else fails default to rails's default routing style.
  
  map.connect       ':controller/:action/:id'
  map.connect       ':controller/:action/:id.:format'
  
  # --------------------------------------------------------------
  # Root
  #
  # The root currently points users to the login page. This will 
  # likely be updated to a marketing page to demo the product.
  
  map.root                            :controller => :user_sessions,    :action => :new
  
end
