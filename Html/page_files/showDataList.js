define(['jquery'], function($){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);

		var $env = $(env),
			$input = $env.find('input'),
			$list = $env.find('.list');

		var _active = 'is-open', //被選擇的 class name
			_esc_key = 27;

		$input.on('keyup click', function(evt){

			if( $input.val() && evt.which !== _esc_key ) { //如果 input 有資料而且不是 esc 鍵
				$env.addClass(_active);
			}else {
				$env.removeClass(_active);
			}
		});

		$input.on('keydown', function(evt){

			if( evt.which === _esc_key ) { //esc 鍵
				$env.removeClass(_active);
			}
		});

		$input.on('blur', function(evt){ //$input 失焦
			$env.removeClass(_active);
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});