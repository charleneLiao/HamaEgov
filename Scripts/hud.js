define(['jquery'], function($){
	
	function main(env, opt, file, debug){

		var $win = $(window),
			$menu = $(env),
			$inner = $menu.children('.inner'),
			$inner_h = $inner.height(),
			$inner_t = $inner.offset().top;

		var _eventNmae = 'fixed', //事件名稱
			_active = 'is-fixed'; //被選擇的 class name

		$win.on(_eventNmae, function () { //開始監測滾動多少的事件
			var $win_t = $win.scrollTop();

			if ($win_t > $inner_t) {
				$menu.height($inner_h);
				$menu.addClass(_active);
			} else {
				$menu.removeClass(_active);
			}
		});

		$win.on('scroll resize', function(){
			$win.trigger(_eventNmae);
		});

		$win.trigger(_eventNmae);
	}
	
	return main;
});