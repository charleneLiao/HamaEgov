define(function(){
	
	function main(env, opt, file){
				
		console.log('這是程式:', file +'.js，如果您看到此訊息，代表 require 正確載入。');
		console.log('執行環境:', env);
		console.log('相關配置:', opt);
	}
	
	return main;
});