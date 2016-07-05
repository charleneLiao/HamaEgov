requirejs.config({
	baseUrl: '/Js',
	paths: { //配置短名
		'jquery': 'jquery-1.11.3.min',
		'googleMaps': '//maps.googleapis.com/maps/api/js?v=3.exp',
	},
	map: { //配置關鍵字在各個檔案的意義
		'*': {
			'jquery': 'jqueryPrivate'
		},
		'jqueryPrivate': {
			'jquery': 'jquery'
		}
	}
});

requirejs(['main']);