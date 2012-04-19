var _m = function(window, document, undefined){
	
	var space = /\s+/,
  		_events = [];
	
	var _mod = {},
		slice = Array.prototype.slice;
	
	_mod.bind = function(event, fn){
		if ( !event ) return;
		var parts = event.split(space),
			l = parts.length;
		for (var i = 0; i < l; i++) {
			_events[parts[i]] = _events[parts[i]] || [];
			_events[parts[i]].push(fn);
		};
	}
	_mod.unbind = function(event, fn){
		if ( !event ) return;
		var parts = event.split(space),	l = parts.length, eventName;
		for (var i = 0; i < l; i++) {
			if ( parts[i] in _events ){
				eventName = parts[i];
        		_events[eventName].splice(_events[eventName].indexOf(fn), 1);
			}
		};
	}
	_mod.unbindAll = function(event){
		if ( !event ) return;
		var parts = event.split(space),	l = parts.length, eventName;
		for (var i = 0; i < l; i++) {
			if ( parts[i] in _events ){
				eventName = parts[i];
        		delete _events[eventName];
			}
		};
	}
	_mod.trigger = function(event){
		if ( !event ) return;
		var parts = event.split(space),	l = parts.length, arr, k,
		// arguments[0] === event
		args = slice.call(arguments,1);
		for (var i = 0; i < l; i++) {
			if ( parts[i] in _events ){
				arr = _events[parts[i]];
				k = arr.length || 0;
				for (var j = 0; j < k; j++) {
					arr[j].apply(this,args);
				};
			}
		};
	}

}(this, document)
