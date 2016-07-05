define(['jquery'], function ($) { //要求真正的 jQuery，並返回一個不污染全域的 jQuery
	return $.noConflict( true );
});