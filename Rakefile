require 'uglifier'
require "jshintrb/jshinttask"
require 'jasmine'
require 'listen'

load 'jasmine/tasks/jasmine.rake'

SOURCE = 'time_ago.js'

task default: :build

task :build => [:jshint, :'jasmine:ci', :minify]

task :minify do
  puts 'Minifying...'

  js = File.read(SOURCE)
  ugly = Uglifier.compile(js)

  File.open("time_ago.min.js", 'w') do |file|
    file.puts ugly
  end

  puts 'Done.'
end

Jshintrb::JshintTask.new :jshint do |t|
  puts 'Linting...'

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
  puts "|  Watching #{SOURCE_DIR} for changes."
  puts '|  Hit `ctrl + c` to stop'
  sh 'rake build'

  listener = Listen.to SOURCE_DIR do
    puts '|  Something changed...'
    sh 'rake build'
  end

  listener.start
  sleep
end

