require 'rubygems'
require 'directory_watcher'
require 'asset_build/coffee_bundler'

puts "Auto-regenerating enabled."

# Build the javascript with coffee bundler.
def build
  puts "Bundling coffee files."
  puts File.join(Dir.pwd,'javascripts')
  coffee_bundler = CoffeeBundler.new(File.join(Dir.pwd,'javascripts/coffee/*.coffee'))
  File.open('./javascripts/app.js','w') {|f| f.write coffee_bundler.compressed }
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