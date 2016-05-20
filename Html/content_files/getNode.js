define(function(){

	var _type_module = '0', //模組
		_type_cell = '1', //分割
		_type_tab = '2', //頁籤
		_type_row = '3', //單欄
		_type_list = '4'; //清單

	function getChild(envs, selector){ //取得子節點，參數是節點關鍵字('ul')、Classname('.in')或 id('#group')

		if(typeof(envs) === 'undefined' || envs.length === 0) {
			console.log('找不到 '+ envs +' 下的節點 '+ selector +'，或是節點錯誤。');

			return null;
		}

		if( !selector ) {
			return envs.children[0];
		}

		var _selector = selector,
			_selector = _selector.toString().replace(/\.|#|\s/g,''), //建立 selector 比對
			_selector_regex = new RegExp(_selector, 'i');

		var $envs = Array.prototype.concat(envs), //所有節點環境，化為陣列
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

		return $result;
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

	function getIn(env){ //取得 in 節點
		return getChild(env, 'in');
	}

	function getHd(env){ //取得 hd 節點
		return getChild(getIn(env), 'hd');
	}

	function getHdIn(env){ //取得 header in 節點
		return getChild(getHd(env), 'in');
	}

	function getTitleText(env){ //取得該群組標題文字
		return getHd(env)[0].innerText;
	}

	function setTitleText(env, title){ //取得該群組標題文字
		return getHd(env)[0].innerText = title;
	}

	function getCt(env){ //取得 ct 節點
		return getChild(getIn(env), 'ct');
	}

	function getCtIn(env){ //取得 ct in 節點
		return getChild(getCt(env), 'in');
	}

	function getCtList(env){ //取得 ct ul 節點
		return getChild(getCtIn(env), 'ul');
	}

	function getCtItem(env){ //取得 ct li 節點
		return getChild(getCtList(env), 'li');
	}

	function getChildGroup(env){ //取得子模組節點(群組用)

		if( getChild(getCtIn(env), 'div').length ) {
			return getChild(getCtIn(env), 'div');
		}

		if( getChild(getCtItem(env), 'div').length ) {
			return getChild(getCtItem(env), 'div');
		}

		return [];
	}

	function getCtItemLen(env){ //取得 ct li 節點的數量
		return getChildList[0].getAttribute('data-child');
	}

	function getFt(env){ //取得 ft 節點
		return getChild(getIn(env), 'ft');
	}

	function getFtIn(env){ //取得 ft in 節點
		return getChild(getFt(env), 'in');
	}

	function getFtList(env){ //取得 ft ul 節點
		return getChild(getFtIn(env), 'ul');
	}

	function getFtItem(env){ //取得 ft li 節點
		return getFtIn(env)[0].querySelectorAll('li');
	}

	function getCtrlBtns(env){ //取得控制項按鈕
		return getFtList(env)[0].querySelectorAll('.prev, .next');
	}

	function getCtrlBtn(env, selector){ //查詢取得控制項按鈕，className 是 class(.prev)
		return getFtList(env)[0].querySelector(selector);
	}

	function updateIndex(env){ //更新 data-index

	}

	function updateChildLen(env){ //更新子模組的數量
		var $childs = getChildGroup(env),
			$childs_length = $childs.length;

		env.setAttribute('data-child', $item_length);

		return env;
	}

	function updateContentItemLen(env){ //更新 ct li 節點的數量
		var $List = getCtList(env);

		$List.setAttribute('data-child', $List.children.length);

		return env;
	}

	function buildGroup() { //動態建立group

	}

	return {
		getChild: getChild,
		getType: getType,
		getIndex: getIndex,
		getChildLen: getChildLen,
		getIn: getIn,
		getHd: getHd,
		getHdIn: getHdIn,
		getTitleText: getTitleText,
		setTitleText: setTitleText,
		getCt: getCt,
		getCtIn: getCtIn,
		getCtList: getCtList,
		getCtItem: getCtItem,
		getChildGroup: getChildGroup,
		getCtItemLen: getCtItemLen,
		getFt: getFt,
		getFtList: getFtList,
		getFtItem: getFtItem,
		getCtrlBtns: getCtrlBtns,
		getCtrlBtn: getCtrlBtn,
		updateIndex: updateIndex,
		updateChildLen: updateChildLen,
		updateContentItemLen: updateContentItemLen,
		buildGroup: buildGroup
	}
});