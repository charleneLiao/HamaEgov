requirejs.config({
	baseUrl: '/Scripts',
	paths: { //配置短名
		'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min'],
		'cookie': 'lib/cookie',
		'domReady': 'lib/domReady',
		'main': 'lib/main',
		'group': 'lib/group',
		'plugin': 'lib/plugin'
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