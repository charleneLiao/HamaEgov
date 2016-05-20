requirejs(['fix']); //幫 IE8 補東補西

function Func($env, _file, $opt){
	this.env = $env;
	this.file = _file;
	this.opt = $opt || {};
	//this.opt.debug = true; // debug 模式
}

Func.prototype.run = function(){ //執行程式

	var $env = this.env,
		_file = this.file,
		$opt = this.opt;
		
	requirejs([_file], function(func){ //載入 function name 同名 .js，第一個參數是節點，第二個參數是設定物件，第三個參數是方法名稱

		if( typeof(func) === 'function' ) { //如果是函式就執行

			func($env, $opt, _file);
		}else {
			console.log(_file +'.js 並不是一個可執行的 function.')

			return false;
		}
	});
}

Func.prototype.log = function(){ //測試

	console.log('環境:', this.env);
	console.log('參數:', this.opt);
	console.log('檔名:', this.file);
}

var $nodes = document.querySelectorAll('[data-func]'),
	$nodes_length = $nodes.length;

var $func_array = [];

for( var i = 0; i < $nodes_length; i++ ) { //雖然想用 Array.prototype.map.call(dom.querySelectorAll('[data-func]'), function(node){})，但 IE8 不支持

	var $env = $nodes[i], //存節點
		_func = ($env.getAttribute('data-func')).replace(/\'/g,'"'), //存 data-func 的字串，並反轉雙引號(") 及單引號(')
		$func = JSON.parse(_func); //轉成物件

	for( var _file in $func ) { //取 function name 與設定參數
		var $opt = $func[_file];

		$func_array.push(new Func($env, _file, $opt));
	}
}

var $func_array_length = $func_array.length;

for( var i = 0; i < $func_array_length; i++ ) {
	var $obj = $func_array[i];

	$obj.run();
	// $obj.log();
}