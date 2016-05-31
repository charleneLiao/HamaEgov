define(['jquery'], function($){
	
	function main(env, opt, file){

		var $set = {
				debug: false,
				activeClass: 'is-open'
			}

		$.extend($set, opt);

		var $env = $(env),
			$input = $env.find('input'),
			$list = $env.find('.list'),
			$li = $list.find('li');

		var _esc_key = 27,
			_key_word = '';

		$input.on('keyup click', function(evt){

			if( $input.val() && evt.which !== _esc_key ) { //如果 input 有資料而且不是 esc 鍵
				var _val = $input.val();

				if(_val){
					$env.addClass($set.activeClass);
					displayItem(_val);
				}else {
					$env.removeClass($set.activeClass);
				}
			}else {
				$env.removeClass($set.activeClass);
			}
		});

		$input.on('keydown', function(evt){

			if( evt.which === _esc_key ) { //esc 鍵
				$env.removeClass($set.activeClass);
			}
		});

		$input.on('blur', function(evt){ //$input 失焦
			$env.removeClass($set.activeClass);
		});

		function displayItem(string) { //輸入字串並篩選出結果
			var regex = new RegExp(string, 'i');

			$li.each(function(i, d) {
				var $this = $(this),
					$this_t = $.trim($this.text()); //取出物件的文字並 trim

				console.log($this_t.match(regex));

				if( $this_t.match(regex) ) {
					$this.show();
				}else {
					$this.hide();
				}
			});
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});