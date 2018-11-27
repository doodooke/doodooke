//在线客服
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 800) {
            $(".sliderbar-up").fadeIn(500);
        } else {
            $(".sliderbar-up").fadeOut(500);
        }
    });

    $(".sliderbar-qq:eq(0)").click(function() {
        window.open(
            "http://wpa.qq.com/msgrd?v=3&uin=3367414088&site=qq&menu=yes"
        );
        return false;
    });

    $(".sliderbar-qq:eq(1)").click(function() {
        window.open(
            "http://wpa.qq.com/msgrd?v=3&uin=1642709442&site=qq&menu=yes"
        );
        return false;
    });

    $(".sliderbar-up").click(function() {
        $("body, html").animate({ scrollTop: 0 }, 1000);
        return false;
    });

    $(".sliderbar-up").mouseover(function() {
        $(".sliderbar-up .sliderbar-item").addClass("active");

        $(".sliderbar-up-show").show();
    });

    $(".sliderbar-up").mouseout(function() {
        $(".sliderbar-up .sliderbar-item").removeClass("active");

        $(".sliderbar-up-show").hide();
    });

    $(".sliderbar-qq").mouseover(function() {
        $(this).find(".sliderbar-item").addClass("active");

        $(".sliderbar-qq-show").show();
    });

    $(".sliderbar-qq").mouseout(function() {
        $(".sliderbar-qq .sliderbar-item").removeClass("active");

        $(".sliderbar-qq-show").hide();
    });

    $(".sliderbar-phone").mouseover(function() {
        $(".sliderbar-phone .sliderbar-item").addClass("active");

        $(".sliderbar-phone-show").show();
    });

    $(".sliderbar-phone").mouseout(function() {
        $(".sliderbar-phone .sliderbar-item").removeClass("active");

        $(".sliderbar-phone-show").hide();
    });

    $(".sliderbar-qrcode").mouseover(function() {
        $(".sliderbar-qrcode .sliderbar-item").addClass("active");

        $(".sliderbar-qrcode-show").show();
    });

    $(".sliderbar-qrcode").mouseout(function() {
        $(".sliderbar-qrcode .sliderbar-item").removeClass("active");

        $(".sliderbar-qrcode-show").hide();
    });
});

//返回顶部
$(function() {
    $(window).bind(
        "scroll",
        {
            fixedOffsetBottom: parseInt($("#Fixed").css("bottom"))
        },
        function(e) {
            var scrollTop = $(window).scrollTop();
            var referFooter = $("#newBottomHtml");
            scrollTop > 100 ? $("#goTop").show() : $("#goTop").hide();
            if (!/msie 6/i.test(navigator.userAgent)) {
                if (
                    $(window).height() -
                        (referFooter.offset() - $(window).scrollTop()) >
                    e.data.fixedOffsetBottom
                ) {
                    $("#Fixed").css(
                        "bottom",
                        $(window).height() -
                            (referFooter.offset() - $(window).scrollTop())
                    );
                } else {
                    $("#Fixed").css("bottom", e.data.fixedOffsetBottom);
                }
            }
        }
    );
    $("#goTop").click(function() {
        $("body,html").stop().animate({
            scrollTop: 0,
            duration: 100,
            easing: "ease-in"
        });
    });
});
