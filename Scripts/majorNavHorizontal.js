define(['jquery', 'group'], function($, group){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);
		
		var li = group.getContentItem(env), //取 li
			child_node = group.getChild(li, 'div'),
			child_node_header = group.getHeader(child_node),
			child_node_content_inner = group.getContentInner(child_node),
			child_node_content_inner_length = child_node_content_inner.length || 1,
			all_a = env.querySelectorAll('a'),
			last_a = all_a[all_a.length - 1];

		var $env = $(env),
			$li = $(li),
			$child_node = $(child_node),
			$child_node_header = $(child_node_header),
			$a = $child_node_header.find('a'),
			$last_a = $(last_a);

		for( var i =0; i < child_node_content_inner_length; i++ ) { //如果 child .inner 沒有任何內容
			var _this = child_node_content_inner[i];

			if(!_this.children.length) {
				_this.parentNode.style.display = 'none'; //就隱藏 .content
			}
		}

		var _eventNmae = file, //事件名稱
			_active = 'is-active', //被選擇的 class name
			_tab_key = 9;

		$a.on(_eventNmae, function(){
			var $this = $(this),
				_index = $this.closest('li').index();

			$li.removeClass(_active);
			$li.eq(_index).addClass(_active);
		});

		$a.on('mouseenter', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		$a.on('focusin', function(){ //觸發事件
			$(this).mouseenter();
		});

		$last_a.on('keydown', function(evt){ //最後一個 a 按下 tab 時，關閉所有子選單

			if( evt.which === _tab_key ) {
				$li.removeClass(_active);
			}
		});

		$env.on('mouseleave', function(){
			$li.removeClass(_active);
		});

		if($set.debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
			console.log('預設值:', $set);
		}
	}
	
	return main;
});