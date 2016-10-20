define(['flexslider/jquery.flexslider'], function(getNode){

	function main(env, opt, file){
		$(env).find('.flexslider').flexslider(opt);
	}
	
	return main;
});
