define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);
		
		var $ul = getNode.getCtList(env),
			$ul_w = parseInt($ul.css('width'), 10),
			$li = $ul.children('li'), //取 li
			$li_w = $li.outerWidth(),
			_base_len = Math.round($ul_w / $li_w), //預設選單數量
			_width_uni = 100 / _base_len;

		$li.each(function(i, d){
			var $this = $(this),
				// _index = $this.data('index'), //等同於 i + 1
				_width = $this.data('width');

			var $module = $this.children('[data-index][data-type]'),
				$ct = getNode.getCt($module);

			if( _width >= _base_len ) { //如果 data-width 大於可分割數值

				$ct.css({ 
					'width': _base_len + '00%',
					'left': ( -1 * ( i % _base_len )) + '00%'
				});

			}else if( i % _base_len + _width > _base_len ) { //如果超出邊界就往回推

				var _index = i;

				if( _index > _base_len ) { // 因為 7 % 7 會等於 0
					_index = _index % _base_len;
				}

				$ct.css({ 
					'width': _width + '00%',
					'left': -1 * (( _index % _base_len + _width ) - _base_len ) + '00%'
				});

			}else {

				$ct.css({ 
					'width': _width + '00%'
				});
			}
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});