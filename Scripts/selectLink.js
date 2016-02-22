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
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});