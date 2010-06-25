# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_Do-Delegate_session',
  :secret      => '8c5e9c693472df50671aa197670ea8833781175068a809bc6e4e2814323e0b0efc1262ce4e3a5d5fbf60fbd047ed11b0a33b61f9cda1d4b17e96348f9a88680e'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
