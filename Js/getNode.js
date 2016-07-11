define(function() {

	var _type_module = '0', //模組
		_type_cell = '1', //分割
		_type_tab = '2', //頁籤
		_type_row = '3', //單欄
		_type_list = '4'; //清單

	return {

		// getChild: function(envs, selector) { //取得子節點，參數是節點關鍵字('ul')、Classname('.in')或 id('#group')

		// 	if(typeof(envs) === 'undefined' || envs.length === 0) {
		// 		console.log('找不到 ', envs ,' 下的節點 '+ selector +'，或是節點錯誤。');

		// 		var $null_select = [];

		// 		return $null_select;
		// 	}

		// 	if( !selector ) {
		// 		return envs.children[0];
		// 	}

		// 	var _selector = selector.toString().replace(/\.|#|\s/g,''), //建立 selector 比對
		// 		_selector_regex = new RegExp(_selector, 'i');

		// 	var $envs = Array.prototype.concat(envs), //所有節點環境，化為陣列
		// 		$envs_length = $envs.length,
		// 		$childs = []; //環境節點的子結點

		// 	for( var i = 0; i < $envs_length; i++ ) {
		// 		var $this = $envs[i],
		// 			$nodes = $this.children,
		// 			$nodes_length = $nodes.length;

		// 		for( var j = 0; j < $nodes_length; j++ ) { //轉成真正的陣列物件
		// 			$childs.push($nodes[j]);
		// 		}

		// 		/* 這是 ie9以上 的解法
		// 		var $this = $envs[i],
		// 			$nodes = Array.prototype.slice.call($this.children); //轉成真正的陣列物件

		// 		$childs = $childs.concat($nodes);
		// 		*/
		// 	}

		// 	var $childs_length = $childs.length,
		// 		$result = []; //符合項目的節點

		// 	for( var i = 0; i < $childs_length; i++ ) {
		// 		$this = $childs[i];

		// 		if( $this.className.search(_selector_regex) !== -1 || $this.nodeName.search(_selector_regex) !== -1 || $this.id.search(_selector_regex) !== -1 || $this.nodeType === _selector ) { //比對搜尋
		// 			$result.push($this);
		// 		}
		// 	}

		// 	return $result;
		// },

		getType: function(env) { //取得 data-type
			return $(env).data('type');
		},

		getIndex: function(env) { //取得 data-index
			return $(env).data('index');
		},

		getChildLen: function(env) { //取得子模組的數量
			return $(env).data('child');
		},

		getIn: function(env) { //取得 in 節點
			return $(env).children('.in');
		},

		getHd: function(env, add) { //取得 hd 節點
			var $in = this.getIn(env),
				$hd = $in.children('.hd');

			if( !$hd.length && add !== false ) {
				$hd = $('<div class="hd"><div class="in"></div></div>');

				$in.prepend($hd);
			}

			return $hd;
		},

		getHdIn: function(env) { //取得 hd in 節點
			return this.getIn(this.getHd(env));
		},

		getCt: function(env) { //取得 ct 節點
			return this.getIn(env).children('.ct');
		},

		getCtIn: function(env) { //取得 ct in 節點
			return this.getIn(this.getCt(env));
		},

		getCtList: function(env) { //取得 ct ul 節點，給 group-list、text-list、pic-list 用
			return this.getCtIn(env).children('ul');
		},

		getCtItem: function(env) { //取得 ct li 節點，給 group-list、text-list、pic-list 用
			return this.getCtList(env).children('li');
		},

		getChildGroup: function(env) { //取得子模組節點(群組用)，給 group-list、text-list、pic-list 用

			if( this.getCtIn(env).children('[data-type]').length ) {
				return this.getCtIn(env).children('[data-type]');
			}

			if( this.getCtItem(env).children('[data-type]').length ) {
				return this.getCtItem(env).children('[data-type]');
			}

			return $();
		},

		getCtItemLen: function(env) { //取得 ct li 節點的數量
			return this.getCtList(env).data('data-child');
		},

		getFt: function(env, add) { //取得 ft 節點
			var $in = this.getIn(env),
				$ft = $in.children('.ft');

			if( !$ft.length && add !== false ) {
				$ft = $('<div class="ft"><div class="in"></div></div>');

				$in.append($ft);
			}

			return $ft;
		},

		getFtIn: function(env) { //取得 ft in 節點
			return this.getIn(this.getFt(env));
		},

		getFtList: function(env, add) { //取得 ft ul 節點
			var $ftIn = this.getFtIn(env)
				$ul = $ftIn.children('ul');

			if( !$ul.length && add !== false ) {
				$ul = $('<ul data-index="0"></ul>');

				$ftIn.append($ul);
			}

			return $ul;
		},

		getFtItem: function(env, add) { //取得 ft li 節點
			var $li = this.getFtList(env).children('li');

			return $li;
		},

		getFtItemBtn: function(env, className, add) { //取得 ft li btn 節點
			var $ftList = this.getFtList(env),
				$btn = $ftList.children('.'+ className);

			if( !$btn.length && add !== false ) {
				$btn = $('<li class="'+ className +'"><span><a href="#">'+ className +'</a></span></li>');

				$ftList.append($btn);
				this.updateFtItemLen(env);
				this.updateIndex($btn);
			}

			return $btn;
		},

		updateIndex: function(env) { //更新 data-index
			var $this = $(this)
				$parent = $this.parent(),
				$childs = $parent.children(),
				$childs_l = $childs.length;

			if( $parent.is('ul') ) {
				$parent.attr('data-child', $childs_l);
			}

			for( var i = 0; i < $childs_l; i++ ) {
				$childs.eq(i).attr('data-index', i + 1);
			}

			return $this;
		},

		updateChildLen: function(env) { //更新子模組的數量
			var $this = $(this),
				$childs = this.getChildGroup(env),
				$childs_length = $childs.length;

			$this.attr('data-child', $item_length);

			return $this;
		},

		updateCtItemLen: function(env) { //更新 ct li 節點的數量
			var $this = $(this),
				$list = this.getCtList(env);

			$list.attr('data-child', $list.children().length);

			return $this;
		},

		updateFtItemLen: function(env) { //更新 ft li 節點的數量
			var $this = $(this),
				$list = this.getFtList(env, false),
				$list_l = $list.length;

			for( i = 0; i < $list_l; i++ ) {
				var $ul = $list.eq(i);

				$ul.attr('data-child', $ul.children().length);
			}

			return $this;
		},

		buildGroup: function() { //動態建立group

		}
	}
});