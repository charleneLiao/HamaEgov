define(['jquery'], function($){
	
	function main(env, opt, file, debug){

		var $set = {
				targetNode: null,
				targetClass: 'is-avtive',
				thisClass: 'is-avtive'
			}

		$.extend($set, opt);

		var $target = $(opt.targetNode),
			$env = $(env),
			$a = $env.find('a');

		if( !$target.length ) { $href = $($a.attr('href')) }

		var _eventNmae = file; //事件名稱

		$a.on(_eventNmae, function(){

			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.thisClass);
		});

		$a.on('click', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
			console.log('預設值:', $set);
		}
	}
	
	return main;
});