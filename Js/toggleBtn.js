define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				bindNode: 'hd',
				toggleClass: 'is-active',
				btnOrangeText: null,
				btnActiveText: null,
				event: 'click', //jQuery 事件名稱
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$target = $($set.targetNode),
			$btn = null; //按鈕物件

		var _uuid = $env.attr('class').replace($set.toggleClass, ''),
			_flag = $.cookie(_uuid) || 0; //0 未執行 / 1 執行中

		console.log(_uuid, $.cookie(_uuid), _flag);

		if( _flag ) {
			$env.addClass($set.toggleClass);
		}else {
			$env.removeClass($set.toggleClass);

			console.log($env.removeClass($set.toggleClass))
		}

		if( $set.bindNode === 'hd' ) { //版頭抑或綁尾
			$btn = getNode.getHdLink(env).find('a');
		}else if ( $set.bindNode === 'ft' ){
			$btn = getNode.getFtItemBtn(env).find('a');
		}

		if( !!$set.btnOrangeText && _flag && !!$set.btnActiveText ) { //如果有設定文字
			$btn.text($set.btnActiveText);
		}else if( !!$set.btnOrangeText ) {
			$btn.text($set.btnOrangeText);
		}

		$btn.on(_eventNmae, function(){
			$env.toggleClass($set.toggleClass);

			if( $env.attr('class').search($set.toggleClass) > -1 ) {
				$.cookie(_uuid, 1);
			}else {
				$.cookie(_uuid, 0);
			}

			console.info($.cookie(_uuid));

			if( $btn.text() === $set.btnOrangeText && !!$set.btnActiveText ) { //更改文字
				$btn.text($set.btnActiveText);
			}else if( $btn.text() === $set.btnActiveText && !!$set.btnOrangeText ) {
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