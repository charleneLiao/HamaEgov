define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);

		var $all_item = getNode.getCtItem(env),
			$items = $all_item.filter(function(i) { //過濾第一個 jquery 物件，也就是 tab
				return !!i;
			}),
			$items_l = $items.length,
			$tabs = $all_item.eq(0),
			$tabs_li = $tabs.find('li'),
			$tab_a = $tabs_li.find('a'),
			$tab_a_length = $tab_a.length - 1;

		var _tab_key = 9;

		$items.each(function(i, n){
			var $this = $(this),
				$hd = $this.find('.hd'),
				$hd_a = $hd.find('a');

			$hd_a.each(function(i, n){
				var $this = $(this),
					_href = $this.attr('href');

				if( !_href || _href === '#' ) {
					$this.removeAttr('href');
				}
			});

			if( $hd.css('display') === 'none' ) {
				$hd.find('a').removeAttr('href');
			}
		});

		for( var i = 0; i < $tab_a_length; i++ ) { //註冊無障礙 tab 事件

			(function(i){
				var $a = $items.eq(i).find('a[href]');

				if($a.length) {

					$tab_a.eq(i).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$a.eq(0).focus();
						}
					});

					$a.eq(-1).on('keydown', function(evt){ //觸發事件

						if( evt.which === _tab_key ) {
							evt.preventDefault();

							$tab_a.eq(i + 1).focus();
						}
					});
				}
			})(i)
		}

		var _eventNmae = file, //事件名稱
			_active = 'is-active'; //被選擇的 class name

		$tab_a.on(_eventNmae, function(){
			var $this = $(this),
				_index = $this.closest('li').index();

			$tabs_li.removeClass(_active);
			$tabs_li.eq(_index).addClass(_active);
			$items.hide();
			$items.eq(_index).show();
		});

		$tab_a.on('click focusin', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		$tab_a.eq(0).trigger(_eventNmae); //先點擊，同時用 css 先做掉

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});