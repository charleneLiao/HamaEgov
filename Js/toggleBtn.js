define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				bindNode: '.hd',
				targetNode: null,
				targetClass: 'is-active',
				toggleClass: 'is-active',
				btnOrangeText: null,
				btnActiveText: null,
				event: 'click', //jQuery 事件名稱
				cookie: false,
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$btn = null, //按鈕物件
			$target = $($set.targetNode);

		var _uuid = $env.attr('class').replace($set.toggleClass, ''), //!!!!----要想一個 UUID 方法
			_flag = null; //0 未執行 / 1  執行中 / null 沒有

		if( !$set.cookie ) {
			$.cookie(_uuid, null);
		}else {
			_flag = $.cookie(_uuid);
		}

		if( _flag === '1' ) {
			$target.addClass($set.targetClass);
			$env.addClass($set.toggleClass);
		}else if( _flag === '0' ) {
			$target.removeClass($set.targetClass);
			$env.removeClass($set.toggleClass);
		}

		if( $set.bindNode === '.hd' ) { //綁頭、身體或尾巴
			$btn = getNode.getHdLink(env).find('a');
		}else if ( $set.bindNode === '.ct' ){
			$btn = getNode.getCtIn(env).find('a');
		}else if ( $set.bindNode === '.ft' ){
			$btn = getNode.getFtItemBtn(env).find('a');
		}else {
			$btn = $env.find($set.bindNode);
		}

		if( !!$set.btnOrangeText && _flag && !!$set.btnActiveText ) { //如果有設定文字
			$btn.text($set.btnActiveText);
		}else if( !!$set.btnOrangeText ) {
			$btn.text($set.btnOrangeText);
		}

		console.log($btn.text());

		$btn.on(_eventNmae, function(){
			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.toggleClass);

			if( $env.attr('class').search($set.toggleClass) > -1 && $set.cookie ) { //如果有開啟 cookie 功能就紀錄
				$.cookie(_uuid, '1');
			}else if ( !!$set.cookie ){
				$.cookie(_uuid, '0');
			}

			console.log($btn.text(), $set.btnOrangeText );

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