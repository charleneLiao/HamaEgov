define(function() {

	var _type_module = '0', //模組
		_type_cell = '1', //分割
		_type_tab = '2', //頁籤
		_type_row = '3', //單欄
		_type_list = '4'; //清單

	return {

		getChild: function(envs, selector) { //取得子節點，參數是節點關鍵字('ul')、Classname('.in')或 id('#group')

			if(typeof(envs) === 'undefined' || envs.length === 0) {
				console.log('找不到 ', envs ,' 下的節點 '+ selector +'，或是節點錯誤。');

				var $null_select = [];

				return $null_select;
			}

			if( !selector ) {
				return envs.children[0];
			}

			var _selector = selector.toString().replace(/\.|#|\s/g,''), //建立 selector 比對
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
		},

		getType: function(env) { //取得 data-type
			return env.getAttribute('data-type');
		},

		getIndex: function(env) { //取得 data-index
			return env.getAttribute('data-index');
		},

		getChildLen: function(env) { //取得子模組的數量
			return env.getAttribute('data-child');
		},

		getIn: function(env) { //取得 in 節點
			return this.getChild(env, 'in');
		},

		getHd: function(env, add) { //取得 hd 節點
			var $hd = this.getChild(this.getIn(env), 'hd');

			if( !$hd.length && add !== false ) {
				$hd = document.createElement('div');
				$hd.className = 'hd';
				$hd.innerHTML = '<div class="in"></div>';

				var $env = this.getIn(env)[0];

				$env.insertBefore($hd, $env.firstChild);
			}

			return $hd;
		},

		getHdIn: function(env) { //取得 header in 節點
			var $in = this.getChild(this.getHd(env), 'in');

			return $in;
		},

		getCt: function(env) { //取得 ct 節點
			return this.getChild(this.getIn(env), 'ct');
		},

		getCtIn: function(env) { //取得 ct in 節點
			return this.getChild(this.getCt(env), 'in');
		},

		getCtList: function(env) { //取得 ct ul 節點，給 group-list、text-list、pic-list 用
			return this.getChild(this.getCtIn(env), 'ul');
		},

		getCtItem: function(env) { //取得 ct li 節點，給 group-list、text-list、pic-list 用
			return this.getChild(this.getCtList(env), 'li');
		},

		getChildGroup: function(env) { //取得子模組節點(群組用)，給 group-list、text-list、pic-list 用

			if( this.getChild(this.getCtIn(env), 'div').length ) {
				return this.getChild(this.getCtIn(env), 'div');
			}

			if( this.getChild(this.getCtItem(env), 'div').length ) {
				return this.getChild(this.getCtItem(env), 'div');
			}

			return [];
		},

		getCtItemLen: function(env) { //取得 ct li 節點的數量
			return getChildList[0].getAttribute('data-child');
		},

		getFt: function(env, add) { //取得 ft 節點,沒有 ft 時回傳空陣列
			var $ft = this.getChild(this.getIn(env), 'ft');

			if( !$ft.length && add !== false ) {
				$ft = document.createElement('div');
				$ft.className = 'ft';
				$ft.innerHTML = '<div class="in"></div>';

				this.getIn(env)[0].appendChild($ft);
			}

			return $ft;
		},

		getFtIn: function(env) { //取得 ft in 節點
			var $in = this.getChild(this.getFt(env), 'in');

			return $in;
		},

		getFtList: function(env, add) { //取得 ft ul 節點
			var $ul = this.getChild(this.getFtIn(env), 'ul');

			if( !$ul.length && add !== false ) {
				$ul = document.createElement('ul');
				$ul.setAttribute('data-index', '1');

				this.getFtIn(env)[0].appendChild($ul);
			}

			return $ul;
		},

		getFtItem: function(env, add) { //取得 ft li 節點
			var $li = this.getChild(this.getFtList(env), 'li');

			return $li;
		},

		getFtItemBtn: function(env, className, add) { //取得 ft li btn 節點
			var $btn = this.getChild(this.getFtList(env), className);

			if( !$btn.length && add !== false ) {
				$btn = document.createElement('li');
				$btn.className = className;
				$btn.innerHTML = '<span><a href="#">'+ className +'</a></span>';

				this.getFtList(env)[0].appendChild($btn);
				this.updateFtItemLen(env);
				this.updateIndex($btn);
			}

			return $btn;
		},

		updateIndex: function(env) { //更新 data-index
			var $parent = env.parentNode,
				$childs = $parent.children,
				$childs_l = $childs.length;

			if($parent.tagName.toLowerCase() === 'ul') {
				$parent.setAttribute('data-child', $childs_l);
			}

			for( var i = 0; i < $childs_l; i++ ) {
				$childs[i].setAttribute('data-index', i + 1);
			}

			return env;
		},

		updateChildLen: function(env) { //更新子模組的數量
			var $childs = this.getChildGroup(env),
				$childs_length = $childs.length;

			env.setAttribute('data-child', $item_length);

			return env;
		},

		updateCtItemLen: function(env) { //更新 ct li 節點的數量
			var $list = this.getCtList(env);

			$list.setAttribute('data-child', $list.children.length);

			return env;
		},

		updateFtItemLen: function(env) { //更新 ft li 節點的數量
			var $list = this.getFtList(env, false),
				$list_l = $list.length;

			for( i = 0; i < $list_l; i++ ) {
				var $ul = $list[i];

				$ul.setAttribute('data-child', $ul.children.length);
			}

			return env;
		},

		buildGroup: function() { //動態建立group

		}
	}
});