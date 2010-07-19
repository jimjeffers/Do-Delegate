namespace :build do
  desc "Observes changes to app/scripts and rebuilds on the fly."
  task :observe => :environment do
    puts "---------------------------------------------\nAuto-regenerating enabled."
    
    # Watch for build.
    directory_watcher = DirectoryWatcher.new('.')
    directory_watcher.interval = 1
    directory_watcher.glob = Dir.glob("./app/scripts/**/*.coffee")
    directory_watcher.add_observer do |*args|
      puts "\n[#{Time.now.strftime("%Y-%m-%d %H:%M:%S")}] regeneration: #{args.size} files changed"
      Rake::Task['build:run'].invoke
    end
    directory_watcher.start
    
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
  task :run => :environment do
    puts "\nBundling macchiato framework to:\n./public/javascripts/app.js"
    coffee_path = RAILS_ROOT+'/public/javascripts/app.coffee'
    javascript_path = RAILS_ROOT+'/public/javascripts/app.js'
    File.open(coffee_path,'w') {|f| f.write Dir.glob(File.join(RAILS_ROOT,'app/scripts/**/*.coffee')).map{ |path| %x(cat #{path}) }.join("\n") }
    javascript = %x(coffee -p #{coffee_path})
    puts "\nRegenerating documentation in:\n./docs"
    `docco #{RAILS_ROOT}/app/scripts/macchiato/**/*`
    File.delete(coffee_path)
    #File.open(javascript_path,'w') {|f| f.write YUI::JavaScriptCompressor.new().compress(javascript) }
    File.open(javascript_path,'w') {|f| f.write javascript }
    puts "\nBuild complete! Listening for further changes.\n[CTRL-C to terminate]\n---------------------------------------------"
  end
end