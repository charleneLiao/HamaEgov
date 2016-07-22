requirejs.config({
	baseUrl: '/js'
});

requirejs(['fix']); //幫 IE8 補東補西

requirejs(['main']);