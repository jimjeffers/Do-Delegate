source "http://rubygems.org"

gem "rails", "2.3.8"
gem "sqlite3-ruby", :require => "sqlite3"
gem "mysql", :require => "mysql"
gem "capistrano"
gem "heroku"

gem "rack", "1.1.0"
gem "authlogic"
gem "exception_notification"
gem "fastercsv"
gem "aasm"

gem "directory_watcher"
gem "yui-compressor", :require => "yui/compressor"

group :development do
  # bundler requires these gems in development
  gem "rails-footnotes"
  gem "assetbuild", :require => "asset_build/css_reader"
end

group :test do
  gem "rspec", "1.3.0"
  gem "rspec-rails", "1.3.2"
  # gem "faker"
  # gem "database_cleaner", :git => "git://github.com/bmabey/database_cleaner.git"
  # gem "capybara", :git => "git://github.com/jnicklas/capybara.git"
  # gem "cucumber"
  # gem "cucumber-rails"
  
  gem "factory_girl"
  gem "formtastic"
  gem "email_spec"
end