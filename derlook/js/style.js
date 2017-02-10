var nav_index, nav_index1;
//首页导航
$(".nav_li").hover(function() {
		nav_index = $(this).index();
		if(nav_index > 0) {
			nav_index1 = nav_index - 1;

			$(".nav_sec:eq(" + nav_index1 + ")").stop().animate({
				opacity: 1
			}, 500)
			$(".nav_sec:eq(" + nav_index1 + ")").css("display", "block");
			var navs;
			if(nav_index1 < 5) {
				navs = (16.5 + (nav_index1) * 12) * 12 + "px"
			} else {
				navs = (16.5 + (nav_index1 - 1) * 12) * 12 + "px"
			}

			$(".nav_sec:eq(" + nav_index1 + ") .nav_div2").css("margin-left", navs);
		}
	}, function() {
		$(".nav_sec:eq(" + nav_index1 + ")").animate({
			opacity: 0
		}, 5)
		$(".nav_sec:eq(" + nav_index1 + ")").css("display", "none");
	})
	//导航二级导航
$(".nav_sec").hover(function() {
		$(this).stop().animate({
			opacity: 1
		}, 500)
		$(this).css("display", "block");
	}, function() {
		$(this).stop().animate({
			opacity: 0
		}, 500)
		$(this).css("display", "none");
	})
	//index   轮播
function slideOne() {
	var li_time = null;
	var li_index = 0;
	var str = true;
	dome();
	$(".slide_left").click(function() {
		clearTimeout(li_time);
		str = false;
		dome();
	})
	$(".slide_right").click(function() {
			clearTimeout(li_time);
			str = true;
			dome();
		})
		//每一个下标对应的动画效果,通过判断计数 li_index
	function dome() {
		clearTimeout(li_time);
		if(li_index == 0) {
			slide();
			//设置初始值
			$(".slide_div1").css({
				left: "-10%",
				opacity: 0
			});
			//设置动画效果
			$(".slide_div1").stop().animate({
				opacity: 1,
				left: "0"
			}, 1000);
		}
		if(li_index == 1) {
			slide();
			$(".slide_div2").css({
				bottom: "-40px",
				opacity: 0,
				right: 0
			});
			$(".slide_div2").stop().animate({
				bottom: "40px",
				opacity: 1,
				right: 0
			}, 1000);
		}
		if(li_index == 2) {
			slide();
			$(".slide_div3").css({
				top: "-50%",
				opacity: 0,
				left: "50px"
			});
			$(".slide_div3").stop().animate({
				top: 0,
				opacity: 1,
				left: "50px"
			}, 1000);
		}
		if(li_index == 3) {
			slide();
			$(".slide_div4").css({
				right: "-10%",
				opacity: 0
			});
			$(".slide_div4").stop().animate({
				opacity: 1,
				right: 0
			}, 1000);
		}
		addRight()
		li_time = setTimeout(dome, 2000)
	}
	//清除所有动画,设置当前动画
	function slide() {
		$(".slide_li").stop().animate({
			opacity: 0,
			zIndex: 1
		}, 500);
		$(".slide_li:eq(" + li_index + ")").stop().animate({
			opacity: 1,
			zIndex: 100
		}, 1000);
	}
	//判断str是否为true,设置不同的临界点
	function addRight() {
		if(str) {
			if(li_index < 3) {
				li_index++;
			} else {
				li_index = 0;
			}
		} else {
			if(li_index == 0) {
				li_index = 3;
			} else {
				li_index--;
			}
		}

	}
}
slideOne();
//index   轮播---end

//index 轮播2

var scrollHeight = 0;
var scrollTime = null;
var str0 = true;
$(".slide_bottom").click(function() {
	str0 = true;
	slideTwo()
})
$(".slide_top").click(function() {
	str0 = false;
	slideTwo()
})

function slideTwo() {
	function slideTo() {
		var str = 7;
		if(str0) {
			str0 = true;
		} else {
			str = -7;
			str0 = false;
		}
		scrollHeight += str;
		$(".slide_Box").scrollTop(scrollHeight);
		
		if(scrollHeight % 140 == 0 && scrollHeight != 0) {
			clearInterval(scrollTime);
			console.log(scrollHeight)
		}

	}
	scrollTime = setInterval(slideTo, 1000 / 60);
}

//index 轮播2-----end

//index 悬停变色
function index_li(){
	var liArr=["img/con5-4.png","img/con5-5.png","img/con5-6.png","img/con5-4o.png","img/con5-5o.png","img/con5-6o.png"];
	var index;
$(".con5_ul1 li").hover(function(){
	 index=$(this).index();
	for (var i = 0; i < $(".con5_ul1 li").length; i++) {
		$(".con5_ul1 li:eq("+i+") img").attr("src",liArr[i])
	}
	var index1=index+3;
	$(".con5_ul1 li:eq("+index+") img").attr("src",liArr[index1])
},function(){
	for (var i = 0; i < $(".con5_ul1 li").length; i++) {
		$(".con5_ul1 li:eq("+i+") img").attr("src",liArr[i])
	}
})
}
index_li()

