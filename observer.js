if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    "use strict";
    if (this == null) {
      return;
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n !== 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    if (n >= len) {
      return -1;
    }
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function(fn, scope) {
    for(var i = 0, len = this.length; i < len; ++i) {
      fn.call(scope || this, this[i], i, this);
    }
  };
}

(function(document, undefined){

  var split = String.prototype.split;
  var splice = Array.prototype.splice;
  var join = Array.prototype.join;

  var PubSub = function(){
    this.events = {};
  };
  
  PubSub.prototype = {
    on: function(ev, fn){
      if (typeof ev !== "string") ev = join.call(ev,' ');
      var _e = this.events;
      split.call(ev, /\s+/).forEach(function(event, i){
        _e[event] = _e[event] || (_e[event] = []);
        _e[event].push(fn);
      });
    },
    off: function(ev, fn){
      if (typeof ev !== "string") ev = join.call(ev,' ');
      var _e = this.events;
      split.call(ev, /\s+/).forEach(function(event, i){
        if (_e[event] && _e[event].length){
          if (typeof fn === "function"){
            var index = _e[event].indexOf(fn);
            if (index !== -1){
              splice.call(_e[event], index, 1);
            }
          } else {
            delete _e[event];
          }
        }
      });
      
    },
    trigger: function(ev){
      if (typeof ev !== "string") ev = join.call(ev,' ');
      var _e = this.events;
      split.call(ev, /\s+/).forEach(function(event, i){
        _e[event].forEach(function(fn, i){
          fn.apply(null, split.call(arguments));
        });
      });
    }
  };

  window.PubSub = PubSub;
  
})(this);