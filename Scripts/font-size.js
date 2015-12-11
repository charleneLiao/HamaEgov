define(['cookie', 'jquery', 'group'], function(cookie, $, group){

	function main(env, opt, file){
		var $li = group.getContentItem(env),
			$li_length = $li.length;

		var _prefix = 'font-size-'; //前輟
			
		var $sizes = []; //存所有的 size class

		for( var i = 0; i < $li_length; i++  ) {
			$sizes.push( _prefix + $li[i].className);
		}

		var $sizes_length = $sizes.length,
			_defalt_value = Math.floor($sizes_length / 2);
		
		var _result = $sizes[_defalt_value]; //結果

		if (cookie.get(_prefix)){ _result = cookie.get(_prefix) } //找cookie，沒有就給預設值

		var $root = document.querySelector('.sys-root');

		var $$li = $($li),
			$a = $$li.find('a'),
			_active = 'is-active';

		$a.on('reFontSize', function(){

			var $this = $(this).closest('li'),
				_font_size = $this.attr('class');

			$$li.removeClass(_active);
			$this.addClass(_active);

			_result = _prefix + _font_size;

			for( var i = 0; i < $sizes_length; i++  ) {
				var _regex = new RegExp($sizes[i]);

				console.log($sizes[i])

				$root.className = $root.className.replace(_regex,''); //比對刪除所有 size class
			}

			$root.className = $root.className + ' ' + _result;

			cookie.set(_prefix, _result); //存 cookie
		});

		$a.on('click', function(evt){
			evt.preventDefault();

			$(this).trigger('reFontSize');
		});

		$a.eq(_defalt_value).trigger('reFontSize');
	}
	
	return main;
});
