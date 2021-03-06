describe('TimeAgo', function(){

  // regression test for undefined ago bug
  describe('undefined ago bug', function(){
    it('should not say undefined ago', function(){
      expect(timeElHTML(1000 * 60 * 2)).not.toMatch('undefined');
      expect(timeElHTML(1000 * 60 * 2)).toBe('2 minutes ago');
    });
  });

  // Old dates say 'about a month ago', when they are much older than that
  describe('"about a month ago" bug', function() {
    it('says has correct words for old strings.', function() {

      var el = document.createElement('time');
      el.setAttribute('data-time', 1418504400000);
      TimeAgo.new(el);

      expect(el.innerHTML).not.toMatch('about a month ago');
    });
  });

  describe('#init', function(){
    it('requires els', function(){
      var bla = function(){
        TimeAgo.init();
      }
      expect(bla).toThrow();
    });

    it('creates a TimeAgo instance per el', function(){
      spyOn(TimeAgo, 'new');

      var els = [];

      for(var i = 0; i <= 2; i++){
        var el = document.createElement('time');
        el.setAttribute('data-time', new Date());
        els.push(el);
      }

      TimeAgo.init(els);

      expect(TimeAgo.new.calls.count()).toEqual(3);
    });
  });

  describe('#new', function(){
    // Hmm.... had to add new so that i could spy on constructor
    // seems rather bad...

    it('requires el', function(){
      expect(TimeAgo.new).toThrow();
    });
  });

  describe('.update', function(){
    describe(' < 60s', function(){
      it('updates timeago string', function(){
        expect(timeElHTML(1000)).toBe('less than a minute ago');
      });
    });

    describe('1 unit of time', function(){
      it('is singular', function(){
        expect(timeElHTML(1000 * 60)).toMatch('minute ');
      });
    });

    describe('>1 unit of time', function(){
      it('is plural', function(){
        expect(timeElHTML(1000 * 60 * 2)).toMatch('minutes ');
      });
    });

    describe('1 hour', function(){
      it('says an not a', function(){
        expect(timeElHTML(1000 * 60 * 60)).toMatch('an ');
      });
    });

    describe('not exact unit of time', function(){
      it('says about', function(){
        expect(timeElHTML(1000 * 60 * 1.2)).toMatch('about ');
      })
    })
  });
});

