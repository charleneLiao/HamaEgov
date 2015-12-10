define(function(){

	var _type = 'type',
		_index = 'index',
		_child = 'child',
		_inner = 'inner',
		_type_module = 0, //模組
		_type_cell = 1, //分割
		_type_tab = 2, //頁籤
		_type_row = 3, //單欄
		_type_list = 4; //清單

	function getType(env){ //取得 data-type
		return env.getAttribute('data-type');
	}

	function getIndex(env){ //取得 data-index
		return env.getAttribute('data-index');
	}

	function getListLen(env){ //取得 li 項目的數量

	}

	function getChildLen(env){ //取得子模組的數量
		return env.getAttribute('data-child');
	}

	function getChildNode(env, className){ //取得 inner 節點
		var $child_array = env.children,
			$child = $child_array[0],
			_length = $child_array.length;

		if( (_length === 1) && ($child.classList[0] === className) ) {
			return $child;
		}

		return undefined;
	}

	function getInner(env){ //取得 inner 節點
		return getChildNode(env, 'inner');
	}

	function getHeader(env){ //取得 header 節點
		return getChildNode(getInner(env), 'header');
	}

	function getTitle(env){ //取得該群組標題
		return getHeader(env)
	}

	function getContent(env){ //取得 content 節點
		return getChildNode(getInner(env), 'content');
	}

	function getChildDom(env){ //取得子模組 Node
		
	}

	function getChildList(env){ //取得子清單 Node
		
	}

	function getFooter(env){ //取得 footer 節點
		return getChildNode(getInner(env), 'footer');
	}

	function getCtrl(env){ //取得控制項
		
	}

	function getCtrlBtn(env, className){ //取得控制項按鈕
		
	}

	function updateIndex(env){ //取得類型
		
	}

	function updateListLen(env){ //取得類型
		
	}

	function updateChildLen(env){ //取得類型
		
	}

	function buildGroup(className) { //取得類型

	}
 
	return {
		getInner: getInner,
		getHeader: getHeader
	}
});