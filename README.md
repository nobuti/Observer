Javascript pub/sub pattern implementation


## Example of use
	

	_m.bind("click:nobuti", function(message){
		console.log(message);
	})
	_m.bind("click:all", function(message){
		console.log("all: "+message);
		_m.unbindAll("click:nobuti click:all");
	})
	_m.on(a,'click',function(e){
		e.preventDefault();
		_m.trigger("click:nobuti click:all","Hello world");
	})

