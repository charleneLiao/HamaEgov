define(['jquery'], function($){
	
	function main(env, opt, file, debug){

		var $env = $(env),
			$select = $env.find('select');

		$select.change(function(){ //觸發事件
			var $selected = $select.find(':selected');

			if( $selected.data('href') ) {
				window.open($selected.data('href'));
			}
		});

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
		}
	}
	
	return main;
});