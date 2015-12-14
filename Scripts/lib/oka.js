define(function(){

	function extend(obj1, obj2){ //複製內容的方法

		for( var i in obj2 ) {

			if (obj2.hasOwnProperty(i)) {

				if( typeof(obj2[i]) === "object" && obj2[i] !== null && obj2[i].constructor === Object ) {
					extend(obj1[i], obj2[i])
				}else {
					obj1[i] = obj2[i]
				}
			}
		}
	}
 
	return {
		extend: extend
	}
});