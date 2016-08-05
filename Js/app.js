requirejs.config({
	baseUrl: 'js'
});

requirejs(['fix'], function(func){ //幫 IE8 補東補西
	func();
});

requirejs(['main'], function(func){ //執行主程式
	func();
});