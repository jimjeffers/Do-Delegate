require 'rubygems'
require 'directory_watcher'
require "yui/compressor"

puts "Auto-regenerating enabled."

# Build the javascript with coffee bundler.
def build
  puts "Bundling coffee files."
  File.open('./javascripts/app.js','w'){|f| f.write Dir.glob(File.join(Dir.pwd,'javascripts/coffee/*.coffee')).map{ |path| File.open(path,'r').lines }.join(" ") }
  javascript = %x(coffee -p #{'./javascripts/app.js'})
  File.open('./javascripts/app.js','w') {|f| f.write YUI::JavaScriptCompressor.new().compress(javascript) }
end

# Watch for build.
directory_watcher = DirectoryWatcher.new('.')
directory_watcher.interval = 1
directory_watcher.glob = Dir.glob("**/*.coffee")
directory_watcher.add_observer do |*args|
  puts "[#{Time.now.strftime("%Y-%m-%d %H:%M:%S")}] regeneration: #{args.size} files changed"
  build
end
directory_watcher.start

gets