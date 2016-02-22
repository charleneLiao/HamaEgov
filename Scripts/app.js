requirejs.config({
	baseUrl: '/Scripts',
	paths: { //配置短名
		'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min'],
		'googleMaps': '//maps.googleapis.com/maps/api/js?v=3.exp',
		'cookie': 'lib/cookie',
		'domReady': 'lib/domReady',
		'getNode': 'lib/getNode',
		'plugin': 'lib/plugin',
		'fix': 'lib/fix'
	},
	map: { //配置關鍵字在各個檔案的意義
		'*': {
			'jquery': 'lib/jqueryPrivate'
		},
		'lib/jqueryPrivate': {
			'jquery': 'jquery'
		}
	}
});

requirejs(['main']);