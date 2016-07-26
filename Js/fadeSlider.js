define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: false,
				delay: 5000,
				speed: 300,
				debug: false
			}

		$.extend($set, opt);

		var $content_li = getNode.getCtItem(env),
			$content_li_length = $content_li.length;

		if( $content_li_length <= 1 ) { //如果輪播項目在一個以下，就掰掰囉~
			return false;
		}

		var $env = $(env);

		var $prev_li = getNode.getFtItemBtn(env, 'prev'),
			$next_li = getNode.getFtItemBtn(env, 'next');

		var $prev_li_a = $prev_li.find('a'),
			$next_li_a = $next_li.find('a');

		var _index = 0, //被播放的順序
			_right = 1,
			_left = -1;

		$prev_li_a.on('click', function(evt){
			evt.preventDefault();

			_index = (_index + _right + $content_li_length) % $content_li_length; //算出第幾個要被撥放
			slider(_index);
		});

		$next_li_a.on('click', function(evt){
			evt.preventDefault();

			_index = (_index + _left + $content_li_length) % $content_li_length; //算出第幾個要被撥放
			slider(_index);
		});

		function slider(_index) {
			var $slider_node = $content_li.eq(_index); //播放的節點

			$slider_node.fadeIn($set.speed).siblings().hide(); //show出圖片並把其他隱藏
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				_index = (_index + 1 + $content_li_length) % $content_li_length;

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

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});