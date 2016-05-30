define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				speed: 300,
				debug: false
			}

		$.extend($set, opt);

		var _class = 'is-show';

		var content_li = getNode.getCtItem(env),
			_content_li_length = content_li.length,
			close_li = getNode.getFtItemBtn(env, 'close'),
			prev_li = getNode.getFtItemBtn(env, 'prev'),
			next_li = getNode.getFtItemBtn(env, 'next');

		var $env = $(env),
			$content_li = $(content_li),
			$close_li = $(close_li),
			$close_li_a = $close_li.find('a'),
			$prev_li = $(prev_li),
			$prev_li_a = $prev_li.find('a'),
			$next_li = $(next_li),
			$next_li_a = $next_li.find('a');

		if( $content_li.length < 2 ) {
			$prev_li.fadeOut();
			$next_li.fadeOut();

			return false;
		}

		var _index = 0, //被播放的順序
			right = 1,
			left = -1;

		$prev_li_a.on('click', function(evt){
			evt.preventDefault();

			_index = (_index + right + _content_li_length) % _content_li_length; //算出第幾個要被撥放
			slider(_index);
		});

		$next_li_a.on('click', function(evt){
			evt.preventDefault()

			_index = (_index + left + _content_li_length) % _content_li_length; //算出第幾個要被撥放
			slider(_index);
		});

		$close_li_a.on('click', function(evt){
			evt.preventDefault()

			$env.removeClass(_class);
		});

		function slider(_index) {
			var $slider_node = $content_li.eq(_index); //播放的節點

			$slider_node.fadeIn($set.speed).siblings().hide(); //show出圖片並把其他隱藏
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});