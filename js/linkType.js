define(function(){
	
	function main(env, opt, file){

		var $set = {
				externalClass: 'link', //外部連結的 class
				domains: [],
				debug: false
			}

		var $type = ['ai', 'avi', 'bmp', 'cdr', 'css', 'csv', 'dmg', 'doc', 'docx', 'exe', 'gif', 'html', 'ico', 'jpeg', 'jpg', 'js', 'json', 'link', 'md', 'mov', 'mp3', 'mp4', 'odf', 'odp', 'ods', 'odt', 'ogg', 'ogv', 'other', 'pdf', 'png', 'ppt', 'pptx', 'psd', 'rar', 'rss', 'sass', 'svg', 'swf', 'tar', 'tif', 'txt', 'wav', 'webm', 'xls', 'xlsx', 'xml', 'zip'];

		$.extend($set, opt);

		var $this = $(env),
			$a = $this.find('a').filter(function(i){ //沒有圖片的 a
				return !($(this).find('*').length)
			});

		var $domains = $set.domains;

		$domains.push(window.location.hostname);

		var $domains_l = $domains.length;

		$a.each(function(i, d){
			var $this = $(this),
				_href = $this.attr('href') || '',
				_dot_i = _href.lastIndexOf('.'),
				_slash = _href.lastIndexOf('/');

			var _has_http = !!(_href.match(/^https?\:\/\//)),
				_is_local = -1; //如果是本地或指定檔案

			if( _href === '#' || _href.indexOf('javascript:') === 0 ) {
				return true;
			}

			for( var i = 0; i < $domains_l; i++) {
				_is_local = Math.max(_is_local, _href.indexOf($domains[i])); //只要有一個大於-1，就是內部

			}

			if( _has_http && _is_local === -1 ) { //如果有 http(s) 又不是本地 就是外部連結
				$this.addClass($set.externalClass); //加入外部連結 class
			}else if( _dot_i > _slash ) { //最後是 .*
				var _type = _href.substr(_href.lastIndexOf('.') + 1, _href.length);

				if( $.inArray( _type, $type) >= 0 ) { //如果陣列中有這個附檔名
					$this.addClass(_type); //加入副檔名 class
				}else {
					$this.addClass('other');
				}
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});