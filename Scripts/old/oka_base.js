// oka_bace 通用底層

(function() { 

	if( !( window.console && console.log ) ) { //如果沒有 console.log，就用return

		window.console = {
			'log': function(msg) {
				return 'log: ' + msg
			},
			'info': function(msg) {
				return 'info: ' + msg
			},
			'error': function(msg) {
				return 'error: ' + msg
			}
		}
	}
})();


$(function(){

	// var odd_ie = false, //判斷老IE
	// 	_appName = window.navigator.appName,
	// 	_version = window.navigator.appVersion.split(';')[1] || '';

	// 	_version = _version.replace(/[ ]/g, '');

	// if ( _appName === 'Microsoft Internet Explorer' && ( _version === 'MSIE8.0' || _version === 'MSIE7.0' || _version === 'MSIE6.0' ) ) { //如果是 IE6 - IE8
	// 	odd_ie = true;
	// }

	// window.old_ie = odd_ie;
});