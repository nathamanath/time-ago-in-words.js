require 'uglifier'
require "jshintrb/jshinttask"
require 'jasmine'
require 'listen'

load 'jasmine/tasks/jasmine.rake'

SOURCE = 'time_ago.js'

task default: :build

task :build => [:jshint, :'jasmine:ci', :minify, :doc]

desc 'Minify js'
task :minify do
  puts 'Minifying...'

  js = File.read(SOURCE)
  ugly = Uglifier.compile(js)

  File.open("time_ago.min.js", 'w') do |file|
    file.puts ugly
  end

  puts 'Done.'
end

desc 'Run tests'
task test: :'jasmine:ci'

desc 'Run jsdocs'
task :doc do
  puts 'Docing...'
  `jsdoc time_ago.js README.md -p -d doc`
  puts 'Done.'
end

Jshintrb::JshintTask.new :jshint do |t|
  t.pattern = SOURCE
  t.options ={
    bitwise: true,
    browser: true,
    camelcase: true,
    curly: true,
    eqeqeq: true,
    forin: true,
    indent: 2,
    immed: true,
    latedef: true,
    noarg: true,
    noempty: true,
    nonew: true,
    quotmark: true,
    regexp: true,
    undef: true,
    strict: true,
    trailing: true,
    undef: true,
    unused: true,
    maxparams: 4,
    maxdepth: 3,
    maxstatements: 10,
    maxlen: 80
  }
end

task :watch do
  puts "|  Watching #{SOURCE} for changes."
  puts '|  Hit `ctrl + c` to stop'
  sh 'rake build'

  listener = Listen.to SOURCE do
    puts '|  Something changed...'
    sh 'rake build'
  end

  listener.start
  sleep
end

