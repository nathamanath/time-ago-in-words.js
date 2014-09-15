require 'uglifier'
require "jshintrb/jshinttask"

SOURCE = 'time_ago.js'

task default: :build

task :build => [:minify]

task :minify do
  puts 'Minifying...'

  js = File.read(SOURCE)
  ugly = Uglifier.compile(js)

  File.open("time_ago.min.js", 'w') do |file|
    file.puts ugly
  end

  puts 'Done.'
end

task :test do
  `bundle exec rake jasmine:ci`
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
    # maxstatements: 5,
    maxlen: 80
  }
end

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'
