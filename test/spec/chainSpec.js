describe("Chain", function() {
  
  var _class, instance, fn;

  beforeEach(function() {
    _class = window.PubSub;
    instance = new _class;
    fn1 = function(){};
    fn2 = function(){};
  });

  it("class should be exposed", function() {
    expect(_class).toBeDefined();
  }); 

  it("instance not be undefined", function() {
    expect(instance).toBeDefined();
  });

  it("events should be exposed", function() {
    expect(instance.events).toBeDefined();
  });

  it("event space split must be right", function() {
    instance.on("event", fn);
    expect(instance.events["event"].length).toEqual(1);
    instance.on("event1 event2", fn);
    expect(instance.events["event1"].length).toEqual(1);
    expect(instance.events["event2"].length).toEqual(1);
    instance.on("event2 event4", fn);
    expect(instance.events["event2"].length).toEqual(2);
    expect(instance.events["event4"].length).toEqual(1);
  });

  it("remove event must be correct", function() {
    instance.on("event1", fn1);
    expect(instance.events["event1"].length).toEqual(1);
    instance.off("event1", fn1);
    expect(instance.events["event1"].length).toEqual(0);
    
    instance.on("event1 event2", fn2);
    expect(instance.events["event1"].length).toEqual(1);
    expect(instance.events["event2"].length).toEqual(1);

    instance.off("event1", fn2);
    expect(instance.events["event1"].length).toEqual(0);
    expect(instance.events["event2"].length).toEqual(1);

    instance.off("event2");
    expect(instance.events["event2"]).not.toBeDefined();
  });

  it("trigger correct events", function() {
    var foo = {
      bar: function(){
        console.log("bar");
      },
      wax: function(){
        console.log("wax");
      }
    }

    spyOn(foo, 'bar');
    spyOn(foo, 'wax');

    instance.on("bar", foo.bar);
    instance.on("wax", foo.wax);
    instance.trigger("bar");
    expect(foo.bar).toHaveBeenCalled();
    instance.trigger("bar wax");
    expect(foo.bar).toHaveBeenCalled();
    expect(foo.wax).toHaveBeenCalled();
  });


});