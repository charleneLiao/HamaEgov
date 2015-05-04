// oka_function 針對IE8以下

//補強console.log

(function() {

	if( !( window.console && console.log ) ) { //如果沒有 console.log，就用return

		window.console = {
			'log': function(msg) {
				return 'log: ' + msg
			}
		}
	}
})()