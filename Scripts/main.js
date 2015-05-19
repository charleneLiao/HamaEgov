$(function(){ //把js-no狀態解除
	$('body').attr('data-js', 'yes');
});

$(function(){ //啟動function

	$('[data-function]').each(function () {
		var $this = $(this),
			_data = $this.data('function');

		//$this[_data]();
	});
});