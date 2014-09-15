(function(){
  'use strict';

  var UNITS = [
    { name: 'second', time: 30000,
      fn: function(ms){ return Math.abs(ms) / 1000; } },
    { name: 'minute', time: 45000,
      fn: function(ms){ return UNITS[0].fn(ms) / 60; } },
    { name: 'hour', time: 600000,
      fn: function(ms){ return UNITS[1].fn(ms) / 60; } },
    { name: 'day', fn: function(ms){ return UNITS[2].fn(ms) / 24; } },
    { name: 'week', fn: function(ms){ return UNITS[3].fn(ms) / 7; } },
    { name: 'month', fn: function(ms){ return UNITS[4].fn(ms) / 30; } },
    { name: 'year', fn: function(ms){ return UNITS[5].fn(ms) / 12; } }
  ];

  var now = function(){ return new Date(); };

  var TimeAgo = function(el){
    this.el = el;
    this.date = this._parseTime();

    this.update();

    return this;
  };

  TimeAgo.prototype = {
    _getDifference: function(){
      return now() - this.date;
    },

    _getTime: function(){
      return this.el.getAttribute('data-time');
    },

    _parseTime: function(){
      var time = this._getTime(),
          t;

      return new Date((!!(t = time * 1)) ? t : time);
    },

    _calculateMeasure: function(){
      // OPTIMIZE: Long method

      var lastMeasure,
          lastUnit = UNITS[0];

      for(var i = 0; i < UNITS.length; i++){
        var unit = UNITS[i],
            measure;

        measure = unit.fn(this.difference);

        if(measure < 1){
          this.measure = lastMeasure;
          this.unit = lastUnit;
          return;
        }

        lastUnit = unit;
        lastMeasure = measure;
      }
    },

    _setTimeout: function(){
      var time = this.unit.time,
          that = this;

      if(time){
        this._timeout = setTimeout(function(){
          that.update();
        }, time);
      }
    },

    update: function(){
      // OPTIMIZE: Long method yo

      this.difference = this._getDifference();

      this._calculateMeasure();

      if(this.unit !== UNITS[0]){
        var prefix = '',
            measureString,
            unitString,
            measureFloor = Math.floor(this.measure);

        if(measureFloor !== this.measure){ prefix = 'about '; }

        if(this.measure < 2){
          measureString = (this.unit.name === 'hour') ? 'an' : 'a';
        }else{
          measureString = measureFloor;
        }

        unitString = this.unit.name;

        if(this.measure >= 2){ unitString += 's'; }

        this.output = prefix + measureString + ' ' + unitString + ' ago';
      }else{
        this.output = 'less than a minute ago';
      }

      this.el.innerHTML = this.output;
      this._setTimeout();
    }
  };

  TimeAgo.init = function(els){
    var times = [];

    if(!els instanceof Array){
      throw(new Error('TimeAgo.init requires els'))
    }

    for(var i = 0; i < els.length; i++){
      var el = els[i];

      times.push(TimeAgo.new(el));
    }

    return times;
  };

  TimeAgo.new = function(el){
    if(typeof el === 'undefined'){
      throw(new Error('TimeAgo.new requires el'))
    }

    return new TimeAgo(el);
  };

  window.TimeAgo = TimeAgo;
})();

