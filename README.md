Javascript pub/sub pattern implementation

Complete refactor to improve performance. Added forEach and indexOf methods, what are recent additions to Javascript 1.6. Also provided implementations for both methods if browser does not natively support them.

Change the module pattern for a classical prototypal pattern.

## Example of use
	
	var pubsub = new PubSub;
	// Space separated events string or array of events
  pubsub.on("event another_event", function(e){
    console.log("Complete event triggered");
  });
  
  pubsub.trigger(["complete","another_event"]);
