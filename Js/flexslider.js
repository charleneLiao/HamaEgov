define(['flexslider/jquery.flexslider'], function(getNode){

	function main(env, opt, file){

		/*
		 * jQuery FlexSlider v2.6.3
		 * Copyright 2012 WooThemes
		 * Contributing Author: Tyler Smith
		 */

		$(env).find('.'+ file)[file](opt);
	}
	
	return main;
});
