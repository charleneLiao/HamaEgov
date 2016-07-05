define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				speed: 300,
				debug: false,
				activeClass: 'is-show'
			}

		$.extend($set, opt);

		var $close = $(getNode.getFtItemBtn(env, 'close'));

		$close.on('change.close', function(){

			close();
		});

		$close.on('click', function(evt){
			evt.preventDefault()

			$close.trigger('change.close');
		});

		function close() {
			$(env).removeClass($set.activeClass);
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});