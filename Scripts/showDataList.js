define(['jquery'], function($){
	
	function main(env, opt, file, debug){

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

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
		}
	}
	
	return main;
});