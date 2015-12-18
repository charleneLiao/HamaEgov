// requirejs(['jquery'], function($){
// 	console.log($('body'));
// });

requirejs(['plugin']); //幫 IE8 補東補西

requirejs(['domReady!'], function(dom){ //當網頁載入時

	var $nodes = document.querySelectorAll('[data-function]'),
		_length = $nodes.length;

	for( var i = 0; i < _length; i++ ) { //雖然想用 Array.prototype.map.call(dom.querySelectorAll('[data-function]'), function(node){})，但 IE8 不支持

		(function(i){ //閉包

			var $env = $nodes[i], //存節點
				_func = ($env.getAttribute('data-function')).replace(/\'/g,'"'), //存 data-function 的字串，並反轉雙引號(") 及單引號(')
				$func = JSON.parse(_func); //轉成物件

			for( var _file in $func ) { //取 function name 與設定參數
				var $opt = $func[_file];
				
				requirejs([_file], function(func){ //載入 function name 同名 .js，第一個參數是節點，第二個參數是設定物件，第三個參數是方法名稱

					if( typeof(func) === 'function' ) { //如果是函式就執行
						func($env, $opt, _file);
					}else {
						console.log(_file+'.js 並不是一個可執行的 function.')

						return false;
					}
				});
			}
		})(i)
	}
});