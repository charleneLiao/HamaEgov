requirejs.config({
	baseUrl: '/Js',
	paths: { //配置短名
		'googleMaps': '//maps.googleapis.com/maps/api/js?v=3.exp'
	}
});

requirejs(['main']);