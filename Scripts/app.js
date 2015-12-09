requirejs.config({
	baseUrl: '/Scripts',
	paths: { //配置短名
		'lib': 'lib',
		'app': 'app',
		'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min', 'lib/jquery-1.11.3.min']
	},
	map: { //配置關鍵字在各個檔案的意義
		'*': {
			'jquery': 'lib/jquery-private'
		},
		'lib/jquery-private': {
			'jquery': 'jquery'
		}
	}
});

requirejs(['app/main']);