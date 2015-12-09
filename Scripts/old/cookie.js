//hamastar cookie function by oka

define('cookie', function(){
 
	return {

		set: function( _key, _value, _life ){ //建立 cookie 的方法，傳入 鍵/值/生命週期(以天計算)

			var date = new Date(),
				_expires = '';

			if( _life ) {

				date.setTime( date.getTime() + ( _life * 24 * 60 * 60 * 1000 ) );
				_expires += date.toGMTString();
			}

			document.cookie = _key + "=" + _value + "; expires=" + _expires;
		},

		get: function ( _key ) { //取得 cookie 值的方法，傳入 鍵
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
		},

		getByPos: function( _offset ) { //取得 cookie 完整值的方法，傳入 定位
			var endstr = document.cookie.indexOf( ';', _offset );

			if ( endstr == -1 ) {
				endstr = document.cookie.length;
			}

			return unescape( document.cookie.substring( _offset, endstr ) );
		},
		
		remove: function( _key ) { //刪除 cookie 的方法，傳入 鍵
			this.set( _key, '', -1 );
		}
	}
});