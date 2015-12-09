define(function(){
	
	var test = function( message ){
		var _msg = message || 'test message';
				
		console.error(_msg);
	}
	
	return test;
});