
/// <reference path="./typings/globals/jquery/index.d.ts" />



$(document).ready(function () {

    /*SIMPLE JQUERY TO OFFSET PAGE FROM THE TOP*/
    $("a.nav-link").click(function (e) {
        e.preventDefault();
        var target = $(this).attr("href");
        var offsetTop = $(target).offset().top;
        $("html, body").animate({ scrollTop: offsetTop }, 1000);
    });

    /*SUPER SLIDES  */
    $('#slides').superslides({
        animation: 'slide',
        animation_speed: 'slow',
        play: 5000,
        pagination: true
    });
    var type = new Typed(".type-js", {
        strings: ["Your UK-based Software Developer"],
        loop: true,
        typeSpeed: 100,
        startDelay: 2000,
        showCursor: false

    });

    /*OWL CAROUSEL  */
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 5,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 4
            },
            1200: {
                items: 5
            },
        }
    })
    /* LOADING SKILLS PERCENTAGE ONCE SCROLLING TO THE SECTION */
    var skillsTopOffset = $(".skills").offset().top;
    var statsTopOffset = $(".statsSection").offset().top;
    var countUpFinished = false;
    $(window).scroll(function () {

        if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

            /*EASY PIE CHART*/
            $('.chart').easyPieChart({
                easing: 'easeInQuad',
                barColor: '#44bd32',
                trackColor: '#ecf0f1',
                scaleColor: false,
                lineWidth: 5,
                size: 152,
                animate: { duration: 5000, enabled: true },
                onStep: function (from, to, percent) {
                    $(this.el).find(".percent").text(Math.round(percent))
                }

            });


        }

        /* THE NUMBER COUNT UP DYNAMICALLY FOR THE EXPERIENCE? CLIENTS ...*/
        if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 100) {
            $(".counter").each(function () {
                var element = $(this);
                var endVal = parseInt(element.text());

                element.countup(endVal);

            })

            countUpFinished = true;

        }


    });
    /*USING FANCYBOX TO DISPLAY  THE PORTFOLIO IMAGES*/
    $('.fancybox').fancybox();

    /* ISOTOPE PLUGIN * USED FIRST AFTER LAYING THE UNORDERED  LIST THEN THE STYLING */


    $('#portfolioItems').isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            layoutMode:'fitRows',
            percentPosition: true,
            queue: false

        }
    })

    $(".filter a").click(function () {
        $(".filter .current").removeClass("current");
        $(this).addClass("current");
        var elementClicked = $(this).attr("data-filter");

        $('#portfolioItems').isotope({
            filter: elementClicked,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                layoutMode:'fitRows',
                percentPosition: true,
                queue: false
            }
        });
        return false;
    });





    const element = $(".skills");
    const elementOffSetTop = element.offset().top;
    $(window).on("scroll", callSticky);

    function callSticky (){
        var nav = $(".mainNavbar")
        if($(window).scrollTop() >= elementOffSetTop){
            nav.removeClass("navbar")
            nav.addClass("navbarSticky")
        }
        else{
            nav.removeClass("navbarSticky")
            nav.addClass("navbar")
        }
    }


    $("#contactForm").validate({

        rules:{
            username:{
                required:true,
                minlength:5,


            },
            email:{
                required:true,
                email:true,

            },
            bodyMessage:{
                required:true,
                minlength:10
            }
        },
        messages:{
            username:{
                required:"Oops!! I think you forgot to type in your name",
                minlength: "Is your name that short?"
            },
            email:{
                required:"I need your email address to contact you",
                email:"Your email address must be in the format of name@domain.com"
            },
            bodyMessage:{
                required:"Tell me about your request",
                minlength:"More than 10 characters would be better"
            }
        },

       highlight: function(element){
           $(element).addClass("error");
       },

       submitHandler: function(form){
        var formData = $("#contactForm").serialize();
        $.ajax("https://jsonplaceholder.typicode.com/posts", {
            
            method:"POST",
            data: formData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",   

             error: function(data){
                 console.log(data);
             },
             success: function(data){
                 console.log(data);
             }
        }).done(function(){

            var dialog = bootbox.dialog({
                title: 'Notification Message',
                message: '<p><i class="fa fa-spin fa-spinner"></i> Loading...</p>'
            });

            dialog.init(function(){
                setTimeout(function(){
                    dialog.find('.bootbox-body').html('Your message was sent successfully!');
                }, 1500);
            });
          setTimeout(function(){
              window.location.reload();
          }, 5000)

           })
       }

    });



})

