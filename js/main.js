AOS.init({
    duration: 800,
    easing: "slide",
});

(function($) {
    "use strict";

    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: true,
        parallaxElements: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: "scroll",
    });

    let fullHeight = function() {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function() {
            $(".js-fullheight").css("height", $(window).height());
        });
    };
    fullHeight();

    // loader
    let loader = function() {
        setTimeout(function() {
            if ($("#ftco-loader").length > 0) {
                $("#ftco-loader").removeClass("show");
            }
        }, 1);
    };
    loader();

    // Scrollax
    $.Scrollax();

    // Burger Menu
    let burgerMenu = function() {
        $("body").on("click", ".js-fh5co-nav-toggle", function(event) {
            event.preventDefault();

            if ($("#ftco-nav").is(":visible")) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        });
    };
    burgerMenu();

    let onePageClick = function() {
        $(document).on("click", '#ftco-nav a[href^="#"]', function(event) {
            event.preventDefault();

            let href = $.attr(this, "href");

            $("html, body").animate({
                    scrollTop: $($.attr(this, "href")).offset().top - 70,
                },
                500,
                function() {
                    // window.location.hash = href;
                }
            );
        });
    };

    onePageClick();

    let carousel = function() {
        $(".home-slider").owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
            nav: false,
            autoplayHoverPause: false,
            items: 1,
            navText: [
                "<span class='ion-md-arrow-back'></span>",
                "<span class='ion-chevron-right'></span>",
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });
    };
    carousel();

    $("nav .dropdown").hover(
        function() {
            let $this = $(this);
            // 	 timer;
            // clearTimeout(timer);
            $this.addClass("show");
            $this.find("> a").attr("aria-expanded", true);
            // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
            $this.find(".dropdown-menu").addClass("show");
        },
        function() {
            let $this = $(this);
            // timer;
            // timer = setTimeout(function(){
            $this.removeClass("show");
            $this.find("> a").attr("aria-expanded", false);
            // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
            $this.find(".dropdown-menu").removeClass("show");
            // }, 100);
        }
    );

    $("#dropdown04").on("show.bs.dropdown", function() {
        console.log("show");
    });

    // scroll
    let scrollWindow = function() {
        $(window).scroll(function() {
            let $w = $(this),
                st = $w.scrollTop(),
                navbar = $(".ftco_navbar"),
                sd = $(".js-scroll-wrap");

            if (st > 150) {
                if (!navbar.hasClass("scrolled")) {
                    navbar.addClass("scrolled");
                }
            }
            if (st < 150) {
                if (navbar.hasClass("scrolled")) {
                    navbar.removeClass("scrolled sleep");
                }
            }
            if (st > 350) {
                if (!navbar.hasClass("awake")) {
                    navbar.addClass("awake");
                }

                if (sd.length > 0) {
                    sd.addClass("sleep");
                }
            }
            if (st < 350) {
                if (navbar.hasClass("awake")) {
                    navbar.removeClass("awake");
                    navbar.addClass("sleep");
                }
                if (sd.length > 0) {
                    sd.removeClass("sleep");
                }
            }
        });
    };
    scrollWindow();

    let counter = function() {
        $("#section-counter, .hero-wrap, .ftco-counter, .ftco-about").waypoint(
            function(direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("ftco-animated")
                ) {
                    let comma_separator_number_step =
                        $.animateNumber.numberStepFactories.separator(",");
                    $(".number").each(function() {
                        let $this = $(this),
                            num = $this.data("number");
                        console.log(num);
                        $this.animateNumber({
                                number: num,
                                numberStep: comma_separator_number_step,
                            },
                            7000
                        );
                    });
                }
            }, { offset: "95%" }
        );
    };
    counter();

    let contentWayPoint = function() {
        let i = 0;
        $(".ftco-animate").waypoint(
            function(direction) {
                if (
                    direction === "down" &&
                    !$(this.element).hasClass("ftco-animated")
                ) {
                    i++;

                    $(this.element).addClass("item-animate");
                    setTimeout(function() {
                        $("body .ftco-animate.item-animate").each(function(k) {
                            let el = $(this);
                            setTimeout(
                                function() {
                                    let effect = el.data("animate-effect");
                                    if (effect === "fadeIn") {
                                        el.addClass("fadeIn ftco-animated");
                                    } else if (effect === "fadeInLeft") {
                                        el.addClass("fadeInLeft ftco-animated");
                                    } else if (effect === "fadeInRight") {
                                        el.addClass("fadeInRight ftco-animated");
                                    } else {
                                        el.addClass("fadeInUp ftco-animated");
                                    }
                                    el.removeClass("item-animate");
                                },
                                k * 50,
                                "easeInOutExpo"
                            );
                        });
                    }, 100);
                }
            }, { offset: "95%" }
        );
    };
    contentWayPoint();

    // magnific popup
    $(".image-popup").magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            verticalFit: true,
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
        },
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
    });

    let goHere = function() {
        $(".mouse-icon").on("click", function(event) {
            event.preventDefault();

            $("html,body").animate({
                    scrollTop: $(".goto-here").offset().top,
                },
                500,
                "easeInOutExpo"
            );

            return false;
        });
    };
    goHere();

    // $("#myScrollspy").scrollspy({ offset: -75 });

    let TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        let that = this;
        let delta = 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };

    window.onload = function() {
        let elements = document.getElementsByClassName("txt-rotate");
        for (let i = 0; i < elements.length; i++) {
            let toRotate = elements[i].getAttribute("data-rotate");
            let period = elements[i].getAttribute("data-period");
            if (toRotate) {
                new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        let css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };
})(jQuery);

// this makes the height of each page equal to the height of the window
// $('.page').css('height', $( window ).height());

// scrollspy section
(function($) {
    //letiable that will hold the href attr of the links in the menu
    let sections = [];
    //letiable that stores the id of the section
    let id = false;
    //letiable for the selection of the anchors in the navbar
    let $navbara = $("#navi a");

    $navbara.click(function(e) {
        //prevent the page from refreshing
        e.preventDefault();
        //set the top offset animation and speed
        $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top - 180,
            },
            500
        );
        hash($(this).attr("href"));
    });

    //select all the anchors in the navbar one after another
    $navbara.each(function() {
        // and adds them in the sections letiable
        sections.push($($(this).attr("href")));
    });
    $(window).scroll(function(e) {
        // scrollTop retains the value of the scroll top with the reference at the middle of the page
        let scrollTop = $(this).scrollTop() + $(window).height() / 2;
        //cycle through the values in sections array
        for (let i in sections) {
            let section = sections[i];
            //if scrollTop letiable is bigger than the top offset of a section in the sections array then
            if (scrollTop > section.offset().top) {
                let scrolled_id = section.attr("id");
            }
        }
        if (scrolled_id !== id) {
            id = scrolled_id;
            $($navbara).removeClass("current");
            $('#navi a[href="#' + id + '"]').addClass("current");
        }
    });
})(jQuery);

hash = function(h) {
    if (history.pushState) {
        history.pushState(null, null, h);
    } else {
        location.hash = h;
    }
};

$(function() {
    $(".progress").each(function() {
        let value = $(this).attr("data-value");
        let left = $(this).find(".progress-left .progress-bar");
        let right = $(this).find(".progress-right .progress-bar");

        if (value > 0) {
            if (value <= 50) {
                right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)");
            } else {
                right.css("transform", "rotate(180deg)");
                left.css(
                    "transform",
                    "rotate(" + percentageToDegrees(value - 50) + "deg)"
                );
            }
        }
    });

    function percentageToDegrees(percentage) {
        return (percentage / 100) * 360;
    }
});