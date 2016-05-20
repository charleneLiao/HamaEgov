define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				auto: false,
				delay: 5000,
				speed: 500,
				debug: false
			}

		$.extend($set, opt);

		var content_in = getNode.getCtIn(env),
			content_ul = getNode.getChild(content_in, 'ul'),
			content_li = getNode.getChild(content_ul, 'li'),
			content_li_length = content_li.length || 1,
			prev_li = getNode.getCtrlBtn(env, '.prev'),
			next_li = getNode.getCtrlBtn(env, '.next');

		var $env = $(env),
			$content_in = $(content_in),
			$content_in_width = $content_in.width(),
			$content_ul = $(content_ul),
			$content_li = $(content_li),
			$content_li_width = $content_li.width(),
			$prev_li = $(prev_li),
			$prev_li_a = $prev_li.find('a'),
			$next_li = $(next_li),
			$next_li_a = $next_li.find('a');

		var right = 1,
			left = 0;

		compareWidth();

		$prev_li_a.on('click', function(evt){
			evt.preventDefault();

			slider(right);
		});

		$next_li_a.on('click', function(evt){
			evt.preventDefault()

			slider(left);
		});

		function slider(_away){ //輪播的方法

			if( compareWidth() ) {

				var $li_persent_width = 100 / Math.round( $content_in_width / $content_li_width ), //把 li 寬度換算成 %
					_offset = '-'+ $li_persent_width +'%';

				$content_li = $content_ul.children('li'); //重取 dom

				if (_away) { //如果往右

					$content_ul.stop().animate({
						'margin-left': _offset //讓 ul 變成 -$li_width
					}, $set.speed, function(){
						$content_li.eq(0).appendTo($content_ul); //把第一個變成最後一個
						$content_ul.css('margin-left', 0); //調整 margin-left 為 0
					});

				} else { //如果往左

					$content_ul.css('margin-left', _offset); //預先調整 margin-left
					$content_li.eq(-1).prependTo($content_ul); //把最後一個變成第一個

					$content_ul.stop().animate({
						'margin-left': 0 //讓 ul 變成 -$li_width
					}, $set.speed);
				}
			}
		}

		function compareWidth(){ //比較播放列表與撥放框的寬度
			$content_in_width = $content_in.width();
			$content_li_width = $content_li.width();

			if( $content_in_width + $content_li_width / 2 >= $content_li_width * content_li_length ) {
				$prev_li.fadeOut();
				$next_li.fadeOut();

				return false;
			}else {
				$prev_li.show();
				$next_li.show();

				return true;
			}
		}

		if ($set.auto) { //如果要輪播
			var timer; //設定計時器

			function auto() { //設定自動撥放涵式

				slider(1);
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