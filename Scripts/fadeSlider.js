define(['jquery', 'group'], function($, group){
	
	function main(env, opt, file, debug){

		var $set = {
				auto: false,
				delay: 5000,
				speed: 300
			}

		$.extend($set, opt);

		var content_li = group.getContentItem(env),
			_content_li_length = content_li.length,
			prev_li = group.getCtrlBtn(env, '.prev'),
			next_li = group.getCtrlBtn(env, '.next');

		var $env = $(env),
			$content_li = $(content_li),
			$prev_li = $(prev_li),
			$prev_li_a = $prev_li.find('a'),
			$next_li = $(next_li),
			$next_li_a = $next_li.find('a');

		if( $content_li.length <= 1 ) {
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

		function slider(_index) {
			var $slider_node = $content_li.eq(_index); //播放的節點

			$slider_node.fadeIn($set.speed).siblings().hide(); //show出圖片並把其他隱藏
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				_index = (_index + 1 + _content_li_length) % _content_li_length

				slider(_index);
				timer = setTimeout(auto, $set.delay);
			}
			
			$env.on('mouseenter', function(){ //設定滑進滑出項目
				clearTimeout(timer);
			});

			$env.on('mouseleave', function(){
				timer = setTimeout(auto, $set.delay);
			});

			timer = setTimeout(auto, $set.delay); //輪播開始
		}

		if(debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
		}
	}
	
	return main;
});