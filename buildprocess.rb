require 'rubygems'
require 'directory_watcher'
require "yui/compressor"

puts "Auto-regenerating enabled."

# Build the javascript with coffee bundler.
def build
  puts "Bundling coffee files."
  coffee_path = './javascripts/app.coffee'
  javascript_path = './javascripts/app.js'
  File.open(coffee_path,'w') {|f| f.write Dir.glob(File.join(Dir.pwd,'coffee/**/*.coffee')).map{ |path| %x(cat #{path}) }.join("\n") }
  javascript = %x(coffee -p #{coffee_path})
  File.delete(coffee_path)
  #File.open(javascript_path,'w') {|f| f.write YUI::JavaScriptCompressor.new().compress(javascript) }
  File.open(javascript_path,'w') {|f| f.write javascript }
end

# Watch for build.
directory_watcher = DirectoryWatcher.new('.')
directory_watcher.interval = 1
directory_watcher.glob = Dir.glob("./coffee/**/*.coffee")
directory_watcher.add_observer do |*args|
  puts "[#{Time.now.strftime("%Y-%m-%d %H:%M:%S")}] regeneration: #{args.size} files changed"
  build
end
directory_watcher.start

gets