define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);

		var items = getNode.getContentItem(env),
			tabs = getNode.getContentItem(getNode.getChild(items[0], 'tab'));

		items.shift(); //把第一個 items 拿掉

		var $items = $(items),
			$tabs = $(tabs),
			$a = $tabs.find('a'),
			$a_length = $a.length - 1;

		var _tab_key = 9;

		for( var i = 0; i < $a_length; i++ ) { //註冊無障礙 tab 事件

			(function(i){
				var a = items[i].querySelectorAll('a[href]');

				if(a) {

					$a.eq(i).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$(a[0]).focus();
						}
					});

					$(a[a.length - 1]).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$a.eq(i + 1).focus();
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

		$a.eq(0).trigger(_eventNmae); //先點擊，同時用 css 先做掉

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});