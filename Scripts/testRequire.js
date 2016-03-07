define(function(){
	
	function main(env, opt, file){

		alert( file +'已正常載入');

		console.log('這是程式:', file +'.js，如果您看到此訊息，代表 require 正常載入。');
		console.log('執行環境:', env);
		console.log('相關配置:', opt);
	}
	
	return main;
});