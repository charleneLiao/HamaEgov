define(['jquery'], function($){
	
	function main(env, opt, file, debug){

		var $env = $(env),
			$input = $env.find('input'),
			$list = $env.find('.list');

		var esc = 27;

		$input.on('keyup click', function(evt){

			if( $input.val() && evt.which !== esc ) { //如果 input 有資料而且不是 esc 鍵
				$env.addClass('is-open');
			}else {
				$env.removeClass('is-open');
			}
		});

		$input.on('keydown', function(evt){

			if( evt.which === esc ) { //esc 鍵
				$env.removeClass('is-open');
			}
		});

		$input.on('blur', function(evt){ //$input 失焦
			$env.removeClass('is-open');
		});

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
		}
	}
	
	return main;
});