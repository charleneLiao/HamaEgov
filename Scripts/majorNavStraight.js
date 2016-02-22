define(['jquery', 'getNode'], function($, getNode){
	
	function main(env, opt, file){

		var $set = {
				debug: false
			}

		$.extend($set, opt);
		
		var li = getNode.getContentItem(env), //取 li
			child_node_inner = getNode.getInner(getNode.getChild(li, 'div'));

		var $li = $(li),
			$child_node_inner = $(child_node_inner).filter(function(i) { //過濾 .content 裡沒有 a 的物件
				return $(this).children('.content').find('a').length;
			}),
			$child_node_header = $child_node_inner.children('.header'),
			$a = $child_node_header.find('a');

		var _eventNmae = file, //事件名稱
			_active = 'is-active'; //被選擇的 class name

		$a.on(_eventNmae, function(){
			var $this = $(this),
				$this_li = $this.closest('li');

			if( $this_li.hasClass(_active) ) {
				$this_li.removeClass(_active);
			}else {
				$li.removeClass(_active);
				$this_li.addClass(_active);
			}
		});

		$a.on('click', function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		// $a.on('focusin', function(){ //觸發事件

		// 	$(this).click();
		// });

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});