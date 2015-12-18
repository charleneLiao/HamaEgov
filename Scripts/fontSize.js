define(['cookie', 'jquery', 'group'], function(cookie, $, group){

	function main(env, opt, file){

		var $set = {
				defaultItem: 'medium',
				debug: false
			}

		$.extend($set, opt);
		
		var $li = $(group.getContentItem(env)), //取 li
			$li_length = $li.length,
			$a = $li.find('a'), //取按鈕
			$root = $('.sys-root'); // root，class name 要放它身上

		var _eventNmae = file, //事件名稱
			_prefix = 'font-size-', //前輟
			_active = 'is-active'; //被選擇的 class name

		var _result = cookie.get(_prefix) || $set.defaultItem || $li.eq(Math.floor($li_length / 2)).attr('class'); //結果值，cookie 記錄 || 中間值

		$a.on(_eventNmae, function(){ //換字型大小事件

			var $this = $(this).closest('li');

			_result = $this.attr('class').split(' ')[0]; //改變結果值

			$this.addClass(_active).siblings().removeClass(_active); //啟動項目添加 class
			$root.removeClass(_prefix + cookie.get(_prefix)).addClass(_prefix + _result); //刪除 root 目前的字型大小，添加新的

			cookie.set(_prefix, _result); //存 cookie
		});

		$a.on('click', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		$li.filter('.'+ _result).find('a').trigger(_eventNmae); //執行 cookie 記錄或中間值

		if($set.debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
			console.log('預設值:', $set);
		}
	}
	
	return main;
});
