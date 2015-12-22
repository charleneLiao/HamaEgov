define(['googleMaps', 'group', 'oka'], function(googlemaps, group, oka){
	
	function main(env, opt, file){

		var $set =  {
				height: 300,
				set: {
					center: {
						lat: 23.5825975,
						lng: 120.75
					},
					scrollwheel: false,
					styles: [],
					zoom: 6,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				},
				debug: false
			}

		oka.extend($set, opt);

		var $divition = group.getChild(group.getContentInner(env), 'divition')[0]; //google map 的 div

		$divition.style.height = parseInt($set.height, 10) + 'px'; //給他高

		var map = new google.maps.Map($divition, $set.set); //丟 set 進去產生地圖

		if( typeof($set.marker) === 'object' && $set.marker.length ) { //如果有傳入 marker
			var $markers = $set.marker,
				_length = $set.marker.length;

			for( var i = 0; i < _length; i++ ) {

				(function(i){ //閉包

					var $marker = $markers[i]; //第一個 maker

					for( var _key in $markers[i] ) { //取 function name 與設定參數
						var $valu = $marker[_key];

						plotMarker($valu.lat, $valu.lang, $valu.msg, _key);
					}
				})(i)
			}
		}

		function plotMarker(lat, lang, msg, title) {
			var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat, lang),
					title: title,
					icon: '',
				});

			marker.setMap(map);

			var infowindow = new google.maps.InfoWindow({
				content: msg
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}

		if($set.debug) {
			console.log('環境:', env);
			console.log('參數:', opt);
			console.log('檔名:', file);
			console.log('預設值:', $set);
		}
	}
	
	return main;
});