define(['getNode'], function(getNode){
	
	function main(env, opt, file){

		var $set = {
				targetNode: null,
				targetClass: null,
				thisClass: 'is-active',
				btnText: null,
				debug: false
			}

		$.extend($set, opt);

		var _eventNmae = file; //事件名稱

		var $env = $(env),
			$target = $($set.targetNode),
			_class = $env.attr('class'),
			$btn = null;

		console.log()

		if( _class.match('simple-text') || _class.match('simple-pic') ) { //如果是簡單文字或簡單圖片系列
			$btn = $env.find('a');
		}else {
			$btn = getNode.getFtItemBtn(env, 'more').find('a');
		}

		if( $set.btnText !== null ) {
			$btn.text($set.btnText);
		}

		var $env = $(env);

		if( !$target.length ) { //沒有設目標的話，就是自己的 ct
			$target = getNode.getCt(env);
		}

		$btn.on(_eventNmae, function(){

			$target.toggleClass($set.targetClass);
			$env.toggleClass($set.thisClass);
		});

		$btn.on('click', function(evt){ //觸發事件
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