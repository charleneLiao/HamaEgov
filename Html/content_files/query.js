define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				speed: 300,
				debug: false
			}

		$.extend($set, opt);

		var _class = 'is-show';

		var close_li = getNode.getCtrlBtn(env, '.close');

		var $env = $(env),
			$close_li = $(close_li),
			$close_li_a = $close_li.find('a');

		$close_li_a.on('click', function(evt){
			evt.preventDefault()

			$env.removeClass(_class);
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});