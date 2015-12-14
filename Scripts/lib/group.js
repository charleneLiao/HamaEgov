define(function(){

	var _type_module = '0', //模組
		_type_cell = '1', //分割
		_type_tab = '2', //頁籤
		_type_row = '3', //單欄
		_type_list = '4'; //清單

	function getChild(envs, selector){ //取得子節點，參數是節點關鍵字('ul')、Classname('.inner')或 id('#group')

		if(typeof(envs) === 'undefined' || envs.length === 0) {
			console.log('無此節點。');

			return null;
		}

		if( !selector ) {
			return envs.children[0];
		}

		var _selector = selector,
			_selector = _selector.toString().replace(/\.|#|\s/g,''), //建立 selector 比對
			_selector_regex = new RegExp(_selector, 'i');

		var $envs = Array.prototype.concat(envs), //所有節點環境
			$envs_length = $envs.length,
			$childs = []; //環境節點的子結點

		for( var i = 0; i < $envs_length; i++ ) {
			var $this = $envs[i],
				$nodes = $this.children,
				$nodes_length = $nodes.length;

			for( var j = 0; j < $nodes_length; j++ ) { //轉成真正的陣列物件
				$childs.push($nodes[j]);
			}

			/* 這是 ie9以上 的解法
			var $this = $envs[i],
				$nodes = Array.prototype.slice.call($this.children); //轉成真正的陣列物件

			$childs = $childs.concat($nodes);
			*/
		}

		var $childs_length = $childs.length,
			$result = []; //符合項目的節點

		for( var i = 0; i < $childs_length; i++ ) {
			$this = $childs[i];

			if( $this.className.search(_selector_regex) !== -1 || $this.nodeName.search(_selector_regex) !== -1 || $this.id.search(_selector_regex) !== -1 || $this.nodeType === _selector ) { //比對搜尋
				$result.push($this);
			}
		}

		var $result_length = $result.length; //符合項目的數量

		if( $result_length === 1 ) { //如果只有一個物件就返回節點、兩個以上就返回陣列
			return $result[0];
		}else {
			return $result;
		}
	}

	function getType(env){ //取得 data-type
		return env.getAttribute('data-type');
	}

	function getIndex(env){ //取得 data-index
		return env.getAttribute('data-index');
	}

	function getChildLen(env){ //取得子模組的數量
		return env.getAttribute('data-child');
	}

	function getInner(env){ //取得 inner 節點
		return getChild(env, 'inner');
	}

	function getHeader(env){ //取得 header 節點
		return getChild(getInner(env), 'header');
	}

	function getTitle(env){ //取得 header a 節點
		return getHeader(env).querySelector('a');
	}

	function getTitleText(env){ //取得該群組標題文字
		return getHeader(env).innerText;
	}

	function setTitleText(title){ //取得該群組標題文字
		return getHeader(env).innerText = title;
	}

	function getContent(env){ //取得 content 節點
		return getChild(getInner(env), 'content');
	}

	function getContentInner(env){ //取得 content inner 節點
		return getChild(getContent(env), 'inner');
	}

	function getContentList(env){ //取得 content ul 節點
		return getChild(getContentInner(env), 'ul');
	}

	function getContentItem(env){ //取得 content li 節點
		return getChild(getContentList(env), 'li');
	}

	function getChildGroup(env){ //取得子模組節點(群組用)
		return getChild(getContentInner(env), 'div') || getChild(getContentItem(env), 'div');
	}

	function getContentItemLen(env){ //取得 content li 節點的數量
		return getChildList.getAttribute('data-child');
	}

	function getFooter(env){ //取得 footer 節點
		return getChild(getInner(env), 'footer');
	}

	function getFooterList(env){ //取得 footer ul 節點
		return getFooterInner(env).querySelector('ul');
	}

	function getFooterItem(env){ //取得 footer li 節點
		return getFooterInner(env).querySelector('li');
	}

	function getCtrlBtns(env){ //取得控制項按鈕
		return getFooterList(env).querySelectorAll('.prev, .next');
	}

	function getCtrlBtn(env, selector){ //查詢取得控制項按鈕，className 是 class(.prev)
		return getFooterList(env).querySelector(selector);
	}

	function updateIndex(env){ //更新 data-index

	}

	function updateChildLen(env){ //更新子模組的數量
		var $childs = getChildGroup(env),
			$childs_length = $childs.length;

		env.setAttribute('data-child', $item_length);

		return env;
	}

	function updateContentItemLen(env){ //更新 content li 節點的數量
		var $List = getContentList(env);

		$List.setAttribute('data-child', $List.children.length);

		return env;
	}

	function buildGroup() { //動態建立group

	}

	return {
		getChild:getChild,
		getType:getType,
		getIndex:getIndex,
		getChildLen:getChildLen,
		getInner:getInner,
		getHeader:getHeader,
		getTitle:getTitle,
		getTitleText:getTitleText,
		setTitleText:setTitleText,
		getContent:getContent,
		getContentInner:getContentInner,
		getContentList:getContentList,
		getContentItem:getContentItem,
		getChildGroup:getChildGroup,
		getContentItemLen:getContentItemLen,
		getFooter:getFooter,
		getFooterList:getFooterList,
		getFooterItem:getFooterItem,
		getCtrlBtns:getCtrlBtns,
		getCtrlBtn:getCtrlBtn,
		updateIndex:updateIndex,
		updateChildLen:updateChildLen,
		updateContentItemLen:updateContentItemLen,
		buildGroup:buildGroup
	}
});