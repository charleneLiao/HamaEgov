// oka_function 物件函式

// 建立oka方法與group方法的容器 ==============================================================

	$.fn.oka = {
		_activeClass: 'is-active',
		_fontSize_cookieName: 'font-size',
		_fontSize_eventName: 'font-size-change',
		_fontSize_bodyClass: 'font-size-', //body字級大了 class 前輟
		_fontSize_btnClass: this['_activeClass']
	}

	$.fn.group = {
		_type: 'type',
		_index: 'index',
		_child: 'child',
		_container: 'container',
		_inner: 'inner',
		_type_module: '0', //模組
		_type_cell: '1', //分割
		_type_tab: '2', //頁籤
		_type_row: '3', //單欄
		_type_list: '4', //清單
		_prev: '<li class="prev"><span><a href="#">上一則</a></span></li>',
		_next: '<li class="next"><span><a href="#">下一則</a></span></li>'
	}


// 取用 group child 的方法 ==============================================================

	$.fn.group_childSelector = function( selector ) {
		var $node = null,
			_container = '.' + $.fn.group['_container'],
			_inner = '.' + $.fn.group['_inner'];

		switch( selector ) { //輸入選擇器並且回傳 group 下的 container 、 inner 、 或是 inner 的 child

			case _container :
			$node = $(this).children( _container );
			break;

			case _inner :
			$node = $(this).children( _container ).children( _inner );
			break;

			default :
			$node = $(this).children( _container ).children( _inner ).children( selector );
		}

		return $node;
	}


// 建立 group 的方法 ==============================================================

	$.fn.group_build = function( className ) {

		var $node = null;

		$node = $('<div class="'+ className +'"><div class="'+ $.fn.group['_container'] +'"><div class="'+ $.fn.group['_inner'] +'"></div></div></div>');

		return $node;
	}


// 建立 group list 的方法 ==============================================================

	$.fn.group_build_list = function( $content ) { //建立表單 & 更新表單的方法
		var $this = $(this);

		if( !( $this.group_childSelector('ul').length ) ) { //如果沒有 ul 就加入
			$this.group_childSelector( '.' + $.fn.group['_inner'] ).append('<ul>');
		}

		var $ul = $this.group_childSelector('ul'); //取 ul 並加入內容
		$ul.prepend( $content );

		var $li = $ul.children('li');

		$li.group_indexUpdate(); //更新 li 的 index
		$ul.group_childLengthUpdate(); //更新 ul 的 child
	}


// 更新 group index 的方法 ==============================================================

	$.fn.group_indexUpdate = function() { //傳 jQuery 物件進來，並遞迴的更新 index
		var $this = $(this);

		$this.each( function( index, node ) { $this.eq( index ).attr( 'data-' + $.fn.group['_index'] , index + 1 ); } );

		return $this;
	}


// 更新 group child 的方法 ==============================================================

	$.fn.group_childLengthUpdate = function() { //傳 jQuery 物件進來，並更新 childLength
		var $this = $(this),
			$child = $this.find( '[data-' + $.fn.group['_index'] + ']' ).eq( 0 ),
			$child_length = $child.parent().children().length;

		$this.attr( 'data-' + $.fn.group['_child'] , $child_length );

		return $this;
	}


// 參數轉物件的方法 ==============================================================

	$.fn.oka_toJSON = function( str ) {

		var $obj = str;

		if ( typeof str === 'string' ) {
			$obj =  $.parseJSON( str.replace( /\'/g, '\"' ) ); //參數轉物件
		}

		return $obj;
	}


// 遞迴的執行引用涵式 ==============================================================

	$.fn.oka_run = function( nodes, sets ) {

		/*
		一般使用 $('#foo').bar('set'); 之類的方法去綁定節點與 function
		此系統是使用 HTML 綁定，範例如下：

		<div id="foo" data-function="{'bar':'set'}"></div>

		foo = 綁定 function 的節點名稱,
		bar = function name,
		set = 參數，也可以是物件;

		此外，一個節點綁定多 function 也是可行的：
		<div id="foo" data-function="{'bar1':'set1','bar2':'set2'}"></div>

		若沒有參數，也可以這樣使用：
		<div id="foo" data-function="bar1"></div>
		
		*/

		var $function_node = $( nodes );

		$function_node.each( function() {
			var $this = $(this),
				$set = sets || $this.attr('data-function'); //取參數，沒有傳入就引用本身的 data-function

			if( typeof $this[$set] === 'function' ) { //如果字串就是 function，直接執行
				$this[$set]();
				return;
			}

			$set = $.fn.oka_toJSON( $set );

			for( _key in $set ) { //執行參數 key 的方法，並把參數物件引入

				if(  !( $.isFunction( $this[_key] ) ) ) { //如果不是方法就擋掉
					console.error( '"' + $this.attr('class') + '" can\'t find function "' + _key + '".' );
					continue;
				}

				if( $.isPlainObject( $set[_key] ) || typeof $set[_key] === 'string' ) {

					$this[_key]( $set[_key] );

				}else if( $.isArray( $set[_key] ) ) {

					console.log( $set[_key] );

					$this[_key].apply( this, $set[_key] );
				}

				console.info( '"' + $this.attr( 'class' ) + '" run function "'+ _key +'" done.' );
			}
		} );
	}


// 各種測試 oka_test ==============================================================

	$.fn.oka_testArray = function( str1, str2 ) {

		console.log( $(this).jquery );

		console.log( str1 );
		console.log( str2 );
	}

	$.fn.oka_testString = function( str1 ) {

		console.log( $(this).jquery );

		console.log( str1 );
	}

	$.fn.oka_testObject = function( Obj ) {

		console.log( $(this).jquery );
		console.log( Obj );
	}


// oka_cookie ==============================================================

	$.fn.oka_cookieCreate = function( _cookieName, _cookieValue, _cookieLife ) {

		var date = new Date(),
			_expires = '';

		if( _cookieLife ) {

			date.setTime( date.getTime() + ( _cookieLife * 24 * 60 * 60 * 1000 ) );
			_expires += date.toGMTString();
		}

		document.cookie = _cookieName + "=" + _cookieValue + "; expires=" + _expires;  
	}

	$.fn.oka_cookieGet = function ( _cookieName ) {
		var arg = _cookieName + '=',
			alen = arg.length,
			clen = document.cookie.length,
			i = 0;

		while (i < clen) {
			var j = i + alen;

			if ( document.cookie.substring( i, j ) == arg ) {
				return $.fn.oka_cookieGetValue( j );
			}

			i = document.cookie.indexOf( ' ', i ) + 1;

			if (i == 0) {
				break;
			}
		}

		return null;
	}

	$.fn.oka_cookieGetValue = function( _offset ) {
		var endstr = document.cookie.indexOf( ';', _offset );

		if ( endstr == -1 ) {
			endstr = document.cookie.length;
		}

		return unescape( document.cookie.substring( _offset, endstr ) );
	}

	$.fn.oka_cookieRemove = function( _cookieName ) {
		$.fn.oka_cookieCreate( _cookieName, '', -1 );
	}


// 遞迴的執行 oka_run ==============================================================

	$.fn.oka_eachRun = function( nodes ) {

		var $this = $(this),
			$Obj = $.fn.oka_toJSON( nodes ),
			$nodes = $this.find( $Obj['each_node'] ), //要執行的節點
			$funcs = $Obj['each_func'];

		if( !( $nodes && $funcs ) ) {
			return false;
		}

		$nodes.each(function() {
			var $this = $(this);

			$.fn.oka_run( $this, $funcs );
		});
	}


// 點擊觸發對象並改變目標 class name ==============================================================

	$.fn.oka_toggleClass = function(set) {

		var $that = $(this); //觸發節點

		var $set = {
				bindNode: null, //觸發節點
				bindNodeClass: null, //觸發節點的 class name
				targetNode: $that, //目標節點
				nodeEvent: 'click', 
				targetNodeClass: $.fn.oka['_activeClass'] //className
			}

		$.extend( $set, set );

		var $this = $that.find( $set.bindNode );

		$this.on( $set.nodeEvent, function(evt) {
			evt.preventDefault();

			$this.toggleClass( $set.bindNodeClass );
			$( $set.targetNode ).toggleClass( $set.targetNodeClass );
		});
	}


// 跑馬燈 ==============================================================

	$.fn.oka_marquee = function(set) {

		var $this = $(this); //觸發節點

		var $set = {
				away: 'left', //方向
				delay: 5000, //間格速度
				speed: 300, //動畫速度
				auto: false, //自動輪播
				sliderAll: false //全部播放
			}

		$.extend( $set, set );

		var $content = $this.group_childSelector( '.content'), //取內容區塊
			$footer = $this.group_childSelector('.footer'); //取底部區塊

		if( !( $footer.length ) ) { //如果沒有 footer 就加入
			$footer = $.fn.group_build('footer');
			$( $footer ).insertAfter( $content );
		}

		$footer.group_build_list( $.fn.group['_prev'] + $.fn.group['_next'] ); //加入左右按鈕

		var $mask = $content.group_childSelector( '.' + $.fn.group['_inner'] ),
			$ul = $mask.children('ul'),
			$li = $ul.children('li'),
			$li_length = $li.length;

		var $ctrl_tools = $footer.group_childSelector( '.' + $.fn.group['_inner'] ),
			$ctrl_left = $ctrl_tools.find('.prev').find('a').data('dir', 0), //抓左右按鈕並設定方向參數
			$ctrl_right = $ctrl_tools.find('.next').find('a').data('dir', 1),
			$btns = $ctrl_left.add($ctrl_right), //取按鈕集
			$slider_dom = $();

		var $mask_width = $mask.width(), //取遮罩寬度
			$li_width = $li.width(), //取li寬度
			$li_all_width = $li_width * $li_length; //算出所有li總和寬度

		if ($li_all_width - $li_length >= $mask_width ) { //如果播放物件比框框大
			$ctrl_tools.show();
		}else{
			$ctrl_tools.hide();
		}

		$btns.click(function(evt) {
			evt.preventDefault(); //停止預設動作

			var $this = $(this);

			$this.trigger('marquee_active');
		});

		$btns.on('marquee_active', function() {

			var $this = $(this),
				_dir = $this.data('dir'); //取方向參數

			slider(_dir);
		});

		if ( $set.auto ) { //如果要輪播
			var timer; //設定計時器

			//設定輪播涵式
			function auto() {
				slider(1);
				timer = setTimeout( auto, $set.delay );
			}

			//設定滑進滑出項目
			$this.mouseover(function () {
				clearTimeout(timer);
			});

			$this.mouseout(function () {
				timer = setTimeout( auto, $set.delay );
			});

			//輪播開始
			timer = setTimeout( auto, $set.delay );
		}

		function slider( _away ) {

			$slider_dom = $(); //清空輪播物件

			//取要計算的寬度
			$mask_width = $mask.width(); //取遮罩寬度
			$li_width = $li.width(); //取li寬度
			$li_all_width = $li_width * $li_length; //算出所有li總和寬度

			if ( $li_all_width - $li_length >= $mask_width ) { //如果播放物件比框框大

				$ctrl_tools.show();

				var _offset = '-100%',
					_num = Math.round($mask_width / $li_width);

				if( !$set.sliderAll ) { //如果不是撥整塊
					_offset = '-' + ( 100 / _num ) + '%'; //把li寬度換算成%
					_num = 1;
				}

				$li = $ul.children('li'); //重取dom

				if( _away ) { //如果往右

					for (i = 0; i < _num; i++) {
						$slider_dom = $slider_dom.add($li.eq(i));
					}

					$ul.stop().animate({
						'margin-left': _offset //讓ul變成-$li_width
					}, $set.speed, function() {
						$slider_dom.appendTo( $ul ); //把最後一個變成第一個
						$ul.css('margin-left', 0); //調整margin-left為0
					});

				} else { //如果往左

					for (i = -1; i >= -1 * _num; i--) {
						$slider_dom = $slider_dom.add($li.eq(i));
					}

					$ul.css('margin-left', _offset); //預先調整margin-left
					$slider_dom.prependTo( $ul ); //把最後一個變成第一個

					$ul.stop().animate({
						'margin-left': 0 //讓ul變成-$li_width
					}, $set.speed );
				}
			}
		}
	}


// 圖片輪播 ==============================================================

	$.fn.oka_picFadeSlider = function(set) {

		var $this = $(this); //觸發節點

		var $set = {
				delay: 5000, //間格速度
				speed: 300, //動畫速度
				auto: false, //自動輪播
				sliderAll: false, //全部播放
				index: 0 //開始播放的順序
			}

		$.extend( $set, set );

		var $parent = $this.closest('.group-main-visual'),
			$content = $this.group_childSelector('.content'),
			$ul = $content.group_childSelector('ul'),
			$li = $ul.children('li'),
			$li_length = $li.length; //取內容區塊

		if ( $set.index + 1 > $li_length ) { //如果指定撥放的圖片比物件的順序還要多
			$set.index = 0;
		}else {
			$set.index -= 1;
		}

		var $interduce_area = $('.main-visual-note'),
			$interduce_title = $interduce_area.find('h4 span'),
			$introduce_essay = $interduce_area.find('p span');

		var $footer = $interduce_area.group_childSelector('.footer'); //取底部區塊

		var $img = $li.eq(0).find('img'),
			_title = $img.attr('title'),
			_alt = $img.attr('alt');

		$interduce_title.text( _title );
		$introduce_essay.text( _alt );

		if( !( $footer.length ) ) { //如果沒有 footer 就加入
			$footer = $.fn.group_build('footer');
			$( $footer ).insertAfter( $content );

			$footer = $interduce_area.group_childSelector('.footer');
		}

		$footer.group_build_list( $.fn.group['_prev'] +  $.fn.group['_next'] ); //加入左右按鈕

		if( $li_length < 2 ) {
			return false;
		}

		$li.hide().eq( $set.index ).fadeIn();

		var $ctrl_tools = $footer.group_childSelector( '.' + $.fn.group['_inner'] ),
			$ctrl_left = $ctrl_tools.find('.prev').find('a').data('dir', -1), //抓左右按鈕並設定方向參數
			$ctrl_right = $ctrl_tools.find('.next').find('a').data('dir', 1),
			$btns = $ctrl_left.add($ctrl_right); //取按鈕集


		$btns.click(function(evt) {
			evt.preventDefault(); //停止預設動作

			var $this = $(this);

			$this.trigger('fadeSlider_active');
		});

		$btns.on('fadeSlider_active', function() {

			var $this = $(this),
				_dir = $this.data('dir'); //取方向參數

			slider( _dir );
		});

        //設定輪播涵式
        function slider( _away ) {

			$set.index = ( $set.index + _away + $li_length ) % $li_length; //算出第幾個要被撥放

			var $this = $li.eq( $set.index ),
				_img = $this.find('img'),
				_title = _img.attr('title'),
				_alt = _img.attr('alt');

			$li.hide();
			$this.fadeIn();

			$interduce_title.text( _title );
			$introduce_essay.text( _alt );
        }

		if ( $set.auto ) { //如果要輪播
			var timer; //設定計時器

			//設定輪播涵式
			function auto() {
				slider(1);
				timer = setTimeout( auto, $set.delay );
			}

			//設定滑進滑出項目
			$parent.mouseover(function () {
				clearTimeout(timer);
			});

			$parent.mouseout(function () {
				timer = setTimeout( auto, $set.delay );
			});

			//輪播開始
			timer = setTimeout( auto, $set.delay );
		}
	}


// 字級大小 ==============================================================

	$.fn.oka_fontLevel = function(set) {

		var _bodyClassName = $.fn.oka['_fontSize_bodyClass'],
			_btnClassName = $.fn.oka['_fontSize_btnClass'],
			_cookieName = $.fn.oka['_fontSize_cookieName'],
			_eventName = $.fn.oka['_fontSize_eventName'];

		var $this = $(this),
			$body = $('body'),
			$font_size_list = $this.find('li'),
			$font_size_btn = $this.find('a'),
			_body_font_size = $.fn.oka_cookieGet( _cookieName ) || 'medium';

		$font_size_btn.on( _eventName , function() {

			var $this = $(this),
				$li = $this.closest('li'),
				_font_size = $li.attr('class').split(' ')[0];

			$font_size_list.removeClass( _btnClassName );
			$li.addClass( _btnClassName );

			$body.removeClass( _bodyClassName + _body_font_size );
			$body.addClass( _bodyClassName + _font_size );

			_body_font_size = _font_size;

			$.fn.oka_cookieCreate( _cookieName, _font_size, 15 );
		});

		$font_size_btn.click(function(evt) {
			evt.preventDefault();

			$(this).trigger( _eventName );
		});

		$( '.' + _body_font_size ).find('a').trigger( _eventName );
	}


// tab切換 ==============================================================

	$.fn.oka_tab_model = function() {
		var $this = $(this);

		$this.each(function () { //頁面中每一個頁面區塊都run一次

			var $this = $(this),
				$a = $this.find('a'),
				$hrefs = $();

			if ( $a.length > 1 ) { //大於一個項目才執行

				$a.each(function () { //把每一個頁籤內頁隱藏
					var $href = $($(this).attr('href'));

					$hrefs = $hrefs.add($href); //把連結目標加入 $hrefs
					$href.hide(); //隱藏連結目標
				});

				$a.click(function(evt) {
					evt.preventDefault(); //停止預設動作

					$(this).trigger('tab_change');
				});

				$a.on( 'tab_change', function(evt) {

					var $this = $(this),
						$href = $($this.attr('href')); //取出連結目標

					$a.removeClass('tabs_yes'); //加入與取走active
					$this.addClass('tabs_yes');

					$a.parent().removeClass('tabs_yes'); //加入與取走active
					$this.parent().addClass('tabs_yes');

					$hrefs.hide(); //顯示與隱藏
					$href.show();

				}).eq(0).trigger('tab_change'); //點第一個
			}
		});
	}