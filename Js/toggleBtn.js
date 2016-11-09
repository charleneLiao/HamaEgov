define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				bindNode: 'hd',
				toggleClass: 'is-active',
				btnOrangeText: 'open',
				btnActiveText: 'close',
				event: 'click', //jQuery 事件名稱
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$target = $($set.targetNode),
			$btn = null;

		if( $set.bindNode === 'hd' ) { //版頭抑或綁尾
			$btn = getNode.getHdLink(env).find('a');
		}else if ( $set.bindNode === 'ft' ){
			$btn = getNode.getFtItemBtn(env).find('a');
		}

		if( !$btn.text() ) { //如果沒有文字
			$btn.text($set.btnOrangeText);
		}

		$btn.on(_eventNmae, function(){
			$env.toggleClass($set.toggleClass);

			if( $btn.text() === $set.btnOrangeText ) { //更改文字
				$btn.text($set.btnActiveText);
			}else if( $btn.text() === $set.btnActiveText ) {
				$btn.text($set.btnOrangeText);
			}
		});

		$btn.on( $set.event, function(evt){ //觸發事件
			evt.preventDefault();

			$(this).trigger(_eventNmae);
		});

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');
		}
	}
	
	return main;
});