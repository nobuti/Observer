var _m = function(window, document, undefined){
	
	var _mod = {},
		space = /\s+/,
  		_events = [],
		slice = Array.prototype.slice;
	
	_mod.bind = function(event, fn){
		if ( !event ) return;
		var parts = event.split(space),
			l = parts.length;
		while ( l-- ) {
			_events[parts[l]] = _events[parts[l]] || [];
			_events[parts[l]].push(fn);
		};
	}
	_mod.unbind = function(event, fn){
		if ( !event ) return;
		var parts = event.split(space),	l = parts.length, eventName;
		while (l--) {
			if (( eventName = parts[l] ) in _events ){
        		_events[eventName].splice(_events[eventName].indexOf(fn), 1);
			}
		};
	}
	_mod.unbindAll = function(event){
		if ( !event ) return;
		var parts = event.split(space),	l = parts.length, eventName;
		while ( l-- ) {
			if (( eventName = parts[l] ) in _events ){
        		delete _events[eventName];
			}
		};
	}
	_mod.trigger = function(event){
		if ( !event ) return;
		var parts = event.split(space), _e = _mod.mix(_events),	l = parts.length, arr, k, eventName, args = slice.call(arguments,1);
		while ( l-- ){
			if (( eventName = parts[l] ) in _e ){
				arr = _e[eventName];
				k = arr.length || 0;
				while ( k-- ) {
					arr[k].apply(this,args);
				};
			}
		};
	}
	_mod.mix = function(object) {
		var o = {};
		for (var i in object){
			o[i] = object[i];
		}
		return o;
	}
	return _mod;
}(this, document)
