define(function(){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);

		var $this = $(env),
			$a = $this.find('a[href^="http"]').filter(function(i){
				return !($(this).find('img').length)
			}); //外部連結

		var _doname = window.location.hostname;

		$a.each(function(i, d){
			var $this = $(this),
				_href = $this.attr('href'),
				_dot_i = _href.lastIndexOf('.'),
				_slash = _href.lastIndexOf('/');

			var _is_local = (_href.indexOf(_doname) != -1); //如果是本地

			if( _is_local || ( _slash > _dot_i ) ) { //如果是本 或 最後是 /
				return; //跳下一個迴圈
			}

			$this.addClass( _href.substr(_href.lastIndexOf('.') + 1, _href.length) ); //加入副檔名 class
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});