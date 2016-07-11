define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				speed: 300,
				debug: false,
				class: 'is-show',
				event: 'click'
			}

		$.extend($set, opt);

		var $env = $(env),
			$ft = $(getNode.getFt(env)),
			$close = $ft.find('a.close');

		$close.on(event, function(evt){
			evt.preventDefault()

			$env.removeClass($set.class);
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});