define(function(){
	
	function main(env, opt, file){

		var $set = {
				targetNode: null,
				targetClass: 'is-avtive',
				thisClass: 'is-avtive',
				debug: false
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

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});