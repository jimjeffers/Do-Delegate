# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_Do-Delegate_session',
  :secret      => '46bcf8add84394ca3273dd3b194d6d44abf6bbf573de674b9ff6a16c582982e69ac4410efbf73ae3e8d1cf11c5adc0a0415f409a2f9d1cbcdb10e6344ed10f5d'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
