define(['flexslider/jquery.flexslider'], function(getNode){

	function main(env, opt, file){
		console.log(opt,$(opt.carousel.node),$(opt.slider.node))

		$(opt.carousel.node).flexslider(opt.carousel.opt);
		$(opt.slider.node).flexslider(opt.slider.opt);
	}
	
	return main;
});
