// requirejs(['jquery'], function($){
// 	console.log($('body'));
// });

requirejs(['lib/domReady!'], function(dom){ //當網頁載入時
	
	Array.prototype.map.call(dom.querySelectorAll('[data-function]'), function(node){ //歷遍所有的 [data-function]

		var $env = node, //存節點
			_func = ($env.getAttribute('data-function')).replace(/\'/g,'"'), //存 data-function 的字串，並反轉雙引號(") 及單引號(')
			$func = JSON.parse(_func); //轉成物件

		for( var _file in $func ) { //取 function name 與設定參數
			var $opt = $func[_file];
			
			requirejs(['app/' + _file], function(func){ //載入 function name 同名 .js，第一個參數是節點，第二個參數是設定物件，第三個參數是方法名稱
				func($env, $opt, _file);
			});
		}
	});
});


(function() {

	if( !( window.console && console.log ) ) { //如果沒有 console.log，就用return

		window.console = {
			'log': function(msg) {
				return 'log: ' + msg
			},
			'info': function(msg) {
				return 'info: ' + msg
			},
			'error': function(msg) {
				return 'error: ' + msg
			}
		}
	}
})();

// /Scripts/oka_base.js 引入 oka_bace 通用底層
// /Scripts/oka_function.js 引入 oka_function 物件函式