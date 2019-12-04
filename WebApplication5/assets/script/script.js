$(function() {
    $('.news-bar').width($('.news').width());
    $('.current-date').css('left', ($('.current').outerWidth() - $('.current-date').outerWidth()) / 2 + 'px');
    var count = $('.banners').length,
        current = 1;
    if (count > 1) {
        $('.banners').not(':eq(0)').hide();
        setInterval(function() {
            $('.banners:visible').fadeOut(function() {
                $('.banners').eq(current).fadeIn();
                if (current < count - 1) {
                    current++;
                } else {
                    current = 0;
                }
            });
        }, 5000);
    }
        $('.add-student').on('click',function(){
            let newStudent = $('div.student>div.form-row').clone();
            newStudent.find("input[type=text]").val("");
            newStudent.appendTo('.more-students');
        });
        $(".students-submit").click(function(e){
            var alert = $(".alert");
            var required = true;
            var response = grecaptcha.getResponse();
            $(".form-group input").each(function(){
                if ( !$(this).val() && required == true ){
                    e.preventDefault();
                    required = false;
                    message("Полетата означени с * са задължителни!", "alert-danger");
                }
            })
            var mailCheck = validateEmail($('#signal-email').text())
            console.log($('#signal-email').text())
            console.log(mailCheck)
            if ( required == true){
                if (response.length === 0) {
                    e.preventDefault();
                    if(alert.hasClass("alert") ){
                        message("Полето 'reCaptcha' е задължително!", "alert-danger");
                    }
                }
                if(!mailCheck){
                    e.preventDefault();
                    message("Въведения email е невалиден!", "alert-danger");
                }else {
                    message("Сигнала е подаден успешно.", "alert-success");
                }
            }
            function validateEmail(email) {
                var checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return checker.test(String(email).toLowerCase());
            }
            function message(msg, type){
                if ( type == "alert-danger" ){
                    alert.addClass("alert-danger")
                } 
                else if ( type == "alert-success" ){
                    if ( alert.hasClass("alert") ){
                        alert.removeClass("alert-danger");
                    }
                    alert.addClass("alert-success");
                    $(".alert-success")
                }
                alert.text(msg).fadeIn(100).delay(2000).fadeOut(2000);
            }
        })
    $('.accessibility-menu-btn').on('click', function(e) {
        e.preventDefault();
        $('.top-menu').toggleClass('accessible');
    });
    $('a.text-only').on('click', function(e) {
        var media = $('link[rel=stylesheet]').attr('media');
        media = media == 'none' ? 'all' : 'none';
        $('link[rel=stylesheet]').attr('media', media);
        var v = $(this).data('v');
        $(this).data('v', $(this).text());
        $(this).text(v);
    });
    $('a.accessibility-btn').on('click', function(e) {
        var cls = $(this).attr('class').replace('accessibility-btn ', '');
        switch (cls) {
            case 'accessibility-blue':
            case 'accessibility-yellow':
                $('html').attr('class', cls);
                $('header').addClass('white');
                break;
            case 'accessibility-dark':
                $('html').attr('class', cls);
                $('header').removeClass('white');
                break;
            case 'accessibility-normal':
                $('html').attr('class', '');
                $('header').removeClass('white');
        }
    });
    var accmenu = '';
    $('h2, footer').each(function(i, e) {
        if (!$(e).attr('id')) {
            $(e).attr('id', 'title-' + (i + 1));
        }
        switch ($(e).prop('tagName')) {
            case 'H2':
                //$('.accessibility-menu a:not(.goto):eq(0)').before(' <a href="#'+$(e).attr('id')+'" class="goto">'+$(e).text()+'</a>');
                accmenu += '<a href="#' + $(e).attr('id') + '" class="goto">' + $(e).text() + '</a>';
                break;
            case 'FOOTER':
                //$('.accessibility-menu a:not(.goto):eq(0)').before(' <a href="#'+$(e).attr('id')+'" class="goto">'+$(e).attr('title')+'</a>');
                accmenu += '<a href="#' + $(e).attr('id') + '" class="goto">' + $(e).data('title') + '</a>';
                break;
        }
    });
    $('.accessibility-menu a:not(.goto):eq(0)').before(accmenu);
    var menu = {
        run: function(item) {
            menu.clone(item);
            var scrollInterval = setInterval(menu.stickIt, 10);
        },
        clone: function(item) {
            $(item).addClass('original').clone().insertAfter(item).addClass('cloned').removeClass('original').hide();
        },
        stickIt: function() {
            if ($(window).scrollTop() >= ($('.original').offset().top)) {
                $('.cloned').show();
                $('.original').css('visibility', 'hidden');
            } else {
                $('.cloned').hide();
                $('.original').css('visibility', 'visible');
            }
        }
    };
    $('.show-menu').on('click', function() {
        $('.bar1, .bar3').toggleClass("change-close");
        $('.show-menu').toggleClass("change");
        $('.education-type, .right-side-menu').toggle(400);
    });
    // Equal home page actual news
    if ($(window).outerWidth() > 767) {
        var maxheight = 0;
        $('.current').each(function(i, v) {
            if (maxheight < $(v).outerHeight()) {
                maxheight = $(v).outerHeight();
            }
        }).outerHeight(maxheight);
    }

});