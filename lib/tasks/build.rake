namespace :build do
  desc "Observes changes to app/scripts and rebuilds on the fly."
  task :observe => :environment do
    puts "---------------------------------------------\nAuto-regenerating enabled."
    
    # Watch for build for Coffee/JS files.
    coffee_directory_watcher = DirectoryWatcher.new('.')
    coffee_directory_watcher.interval = 1
    coffee_directory_watcher.glob = Dir.glob("./app/scripts/**/*.coffee")
    coffee_directory_watcher.add_observer do |*args|
      puts "\n[#{Time.now.strftime("%Y-%m-%d %H:%M:%S")}] [COFFEE] Regeneration: #{args.size} files changed"
      
      puts "\n[JS]     Bundling macchiato framework to:\n         ./public/javascripts/app.js"
      coffee_path = RAILS_ROOT+'/public/javascripts/app.coffee'
      javascript_path = RAILS_ROOT+'/public/javascripts/app.js'
      File.open(coffee_path,'w') {|f| f.write Dir.glob(File.join(RAILS_ROOT,'app/scripts/**/*.coffee')).map{ |path| %x(cat #{path}) }.join("\n") }
      javascript = %x(coffee -p #{coffee_path})
      puts "\n[DOCCO]  Regenerating documentation in:\n        ./docs"
      `docco #{RAILS_ROOT}/app/scripts/**/*`
      File.delete(coffee_path)
      #File.open(javascript_path,'w') {|f| f.write YUI::JavaScriptCompressor.new().compress(javascript) }
      File.open(javascript_path,'w') {|f| f.write javascript }
      
      puts "\n[COFFEE] Build complete! Listening for further changes.\n[CTRL-C to terminate]\n---------------------------------------------"
    end
    coffee_directory_watcher.start
    
    # Watch for build with CSS files.
    stylesheet_directory_watcher = DirectoryWatcher.new('.')
    stylesheet_directory_watcher.interval = 1
    stylesheet_directory_watcher.glob = Dir.glob("./public/stylesheets/*.css")
    stylesheet_directory_watcher.add_observer do |*args|
      puts "\n[#{Time.now.strftime("%Y-%m-%d %H:%M:%S")}] [CSS] Regeneration: #{args.size} files changed"
      
      puts "\n[CSS]    Processing ./public/stylesheets/_screen.css to:\n        ./public/css/screen.min.css"
      origin_path = RAILS_ROOT+'/public/stylesheets/_screen.css'
      output_path = RAILS_ROOT+'/public/css/screen.min.css'
      CSSReader.new(origin_path).save(output_path,:compress => true)
      
      puts "\n[CSS] Build complete! Listening for further changes.\n[CTRL-C to terminate]\n---------------------------------------------"
    end
    stylesheet_directory_watcher.start
    
    # Loop until we capture an interception from the user.
    x = 0
    trap("SIGINT") do
      puts "\n\n---------------------------------------------\nTerminating..."
      x = 1
    end
    until x==1
      sleep 1
    end
    
  end
  
  desc "Builds all coffee scripts in app/scripts/ as a single output to public/javascripts/app.js"
  task :coffee => :environment do
    puts "\n[JS]     Bundling macchiato framework to:\n         ./public/javascripts/app.js"
    coffee_path = RAILS_ROOT+'/public/javascripts/app.coffee'
    javascript_path = RAILS_ROOT+'/public/javascripts/app.js'
    File.open(coffee_path,'w') {|f| f.write Dir.glob(File.join(RAILS_ROOT,'app/scripts/**/*.coffee')).map{ |path| %x(cat #{path}) }.join("\n") }
    javascript = %x(coffee -p #{coffee_path})
    puts "\n[DOCCO]  Regenerating documentation in:\n        ./docs"
    `docco #{RAILS_ROOT}/app/scripts/macchiato/**/*`
    File.delete(coffee_path)
    #File.open(javascript_path,'w') {|f| f.write YUI::JavaScriptCompressor.new().compress(javascript) }
    File.open(javascript_path,'w') {|f| f.write javascript }
  end
  
  desc "Builds css file from _screen.css to __screen.min.css"
  task :css => :environment do
    puts "\n[CSS]    Processing ./public/stylesheets/_screen.css to:\n        ./public/css/screen.min.css"
    origin_path = RAILS_ROOT+'/public/stylesheets/_screen.css'
    output_path = RAILS_ROOT+'/public/css/screen.min.css'
    CSSReader.new(origin_path).save(output_path,:compress => true)
  end
end