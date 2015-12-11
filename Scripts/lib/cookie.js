define(function(){

	function set(_key, _value, _life){ //建立 cookie 的方法，傳入 鍵/值/生命週期(天)

		var date = new Date(),
			_expires = '';

		if( _life ) {

			date.setTime( date.getTime() + ( _life * 24 * 60 * 60 * 1000 ) );
			_expires += date.toGMTString();
		}

		document.cookie = _key + "=" + _value + "; expires=" + _expires;
	}

	function get(_key) { //取得 cookie 值的方法，傳入 鍵

		var arg = _key + '=',
			alen = arg.length,
			clen = document.cookie.length,
			i = 0;

		while (i < clen) {

			var j = i + alen;

			if ( document.cookie.substring( i, j ) == arg ) {
				return this.getByPos(j);
			}

			i = document.cookie.indexOf( ' ', i ) + 1;

			if (i == 0) {
				break;
			}
		}

		return null;
	}

	function getByPos(_offset) { //取得 cookie 完整值的方法，傳入 定位

		var endstr = document.cookie.indexOf( ';', _offset );

		if ( endstr == -1 ) {
			endstr = document.cookie.length;
		}

		return unescape( document.cookie.substring( _offset, endstr ) );
	}
	
	function remove(_key) { //刪除 cookie 的方法，傳入 鍵
		this.set( _key, '', -1 );
	}
 
	return {
		set: set,
		get: get,
		getByPos: getByPos,
		remove: remove
	}
});