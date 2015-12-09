require.config({
	baseUrl: '/Scripts',
	paths: {
		'jquery': 'lib/jquery-1.11.3.min'
	}
});

require(['jquery'], function($) {
	
});

require(['test'], function(func){
	func();
});

require(['domReady!'], function(dom){
	
	Array.prototype.map.call(
		dom.querySelectorAll('[data-function]'),
		function(node){
		var $this = node,
			_func = $this.getAttribute('data-function');
			
		// require([_func], function(func){
		// 	func($this);
		// });
		
		console.log($this);
		console.log(_func);
	});
});


(function() {

	if( !( window.console && console.log ) ) { //如果沒有 console.log，就用return

		window.console = {
			'log': function(msg) {
				return 'log: ' + msg
			}
		}
	}
})();