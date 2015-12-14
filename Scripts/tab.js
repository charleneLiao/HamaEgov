define(['jquery', 'group'], function($, group){
	
	function main(env, opt, file, debug){

		var items = group.getContentItem(env),
			tabs = group.getContentItem(group.getChild(items[0], 'tab'));

		items.shift(); //把第一個 items 拿掉

		var $items = $(items),
			$tabs = $(tabs),
			$a = $tabs.find('a'),
			$a_length = $a.length - 1;

		for( var i = 0; i < $a_length; i++ ) { //註冊無障礙 tab 事件

			(function(i){
				var a = items[i].querySelectorAll('a[href]');

				if(a) {

					$a.eq(i).on('keydown', function(evt){ //觸發事件

						if( evt.which === 9 ) {
							evt.preventDefault();

							$(a[0]).focus();
						}
					});

					$(a[a.length - 1]).on('keydown', function(evt){ //觸發事件

						if( evt.which === 9 ) {
							evt.preventDefault();

							$a.eq(-1).focus();
						}
					});
				}
			})(i)
		}

		var _eventNmae = file, //事件名稱
			_active = 'is-active'; //被選擇的 class name

		$a.on(_eventNmae, function(){
			var $this = $(this),
				_index = $this.closest('li').index();

			$tabs.removeClass(_active);
			$tabs.eq(_index).addClass(_active);
			$items.hide();
			$items.eq(_index).show();
		});

		$a.on('click focusin', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		// $a.eq(0).trigger(_eventNmae); 不先點擊，而是先用 css 做掉

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
		}
	}
	
	return main;
});