define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				bindNode: 'a',
				targetNode: null,
				targetClass: 'is-active',
				toggleClass: 'is-active',
				event: 'click', //jQuery 事件名稱
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$target = $($set.targetNode),
			$btn = $env.find($set.bindNode);

		$btn.on(_eventNmae, function(){

			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.toggleClass);
		});

		$btn.on( $set.event, function(evt){ //觸發事件
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