define(['jquery'], function($){
	
	function main(env, opt, file){

		var $set = {
				bindNode: 'body',
				speed: 300,
				debug: false
			}

		$.extend($set, opt);

		var $env = $('html,body'),
			$a = $(env).find('a');

		var _eventNmae = file; //事件名稱

		$a.on(_eventNmae, function(){

			var $this = $(this),
				$href = $($this.attr('href'));

			if( !$href.length ) { $href = $($set.bindNode) }

			$env.stop().animate({
				scrollTop : $href.offset().top
			}, $set.speed );
		});

		$a.on('click', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
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