define(['jquery'], function($){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$select = $env.find('select');

		$select.change(function(){ //觸發事件
			var $selected = $select.find(':selected');

			if( $selected.data('href') ) {
				window.open($selected.data('href'));
			}
		});

		if($set.debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
			console.log('預設值:', $set);
		}
	}
	
	return main;
});