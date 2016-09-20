define(function(){
	
	function main(env, opt, file){

		var $lang = { //語系

			'en': {
				'day':'d',
				'hour': 'h',
				'minute': 'm',
				'second': 's',
				'arrivedMessage': 'It\'s now!'
			},
			'tw': {
				'day': '日',
				'hour': '時',
				'minute': '分',
				'second': '秒',
				'arrivedMessage': '就是現在!'
			}
		}

		var $set = {
				debug: false,
				year: 2020,
				month: 1,
				day: 1,
				hour: 0,
				minute: 0,
				second: 0,
				delayTime: 1000, //ms
				arrivedMessage: null,
				lang: 'en'
			}

		$.extend($set, opt);

		if( $lang[$set.lang] === undefined ) {
			$set.lang = 'en';
		}

		var $this = $(env),
			$ct = $this.find('.ct'),
			$in = $ct.children('.in');

		var _target_moment = new Date( $set.month +'/'+ $set.day +'/'+ $set.year +' '+ $set.hour +':'+ $set.minute +':'+ $set.second); //目標時間

		var timer = setTimeout(main, $set.delayTime);

		function main(){
			var _new = new Date();

			if( _new > _target_moment ) {
				printToclient($set.arrivedMessage || $lang[$set.lang].arrivedMessage);

				return false;
			}

			var _text = convertToCount( _target_moment - _new );

			printToclient( _text );

			timer = setTimeout(main, $set.delayTime); //輪播開始
		}

		function convertToCount( _ms ){
			var _day = 86400000,
				_hour = 3600000,
				_minute = 60000,
				_second = 1000;

			var _d = Math.floor(_ms / _day),
				_h = Math.floor((_ms % _day) / _hour),
				_m = Math.floor((_ms % _hour) / _minute),
				_s = Math.floor((_ms % _minute) / _second),
				_ms = _ms % _second;

			return '<span class="d">'+ _d +'</span><i class="mark">'+ $lang[$set.lang].day +'</i><span class="h">'+ _h +'</span><i class="mark">'+ $lang[$set.lang].hour +'</i><span class="m">'+ _m +'</span><i class="mark">'+ $lang[$set.lang].minute +'</i><span class="s">'+ _s +'</span><i class="mark">'+ $lang[$set.lang].second +'</i><span class="ms">'+ _ms +'</span>';
		}

		function printToclient( _text ){
			$in.html(_text);
		}

		if($set.debug) {
			console.log('預設值:', $set);
			console.log('檔案 '+ file +'.js 已順利執行。');

			console.info('目標時間是：', _target_moment);
		}
	}
	
	return main;
});