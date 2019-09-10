$(document).ready(function() {
    $ipone = $('.log'); //手机号登录
    $move = $('.m-layer'); //拖动的位置
    $reg = $('.reg') //注册
    let regorlogin = null;
    $ipone.on('click', function() {
        regorlogin = 0;
        $('#mask').show();
        $('.logli').show();
    })
    $('.zcls').on('click', function() {
        $('#mask').hide();
        $('.logli').hide();
    })
    $reg.on('click', function() {
        regorlogin = 1;
        $('#mask').show();
        $('.regli').show();
    })
    $('.zcls').on('click', function() {
        $('#mask').hide();
        $('.regli').hide();
    })
    $('.otlog').on('click', function() {
        $('#mask').hide();
        $('.logli').hide();
    })
    $('.otreg').on('click', function() {
        $('#mask').hide();
        $('.regli').hide();
    })
    $('.regnow').on('click', function() {
        $('.logli').hide();
        $('.regli').show();
    })
    $move.on('mousedown', ".zbar", function(e) {
        var $l = e.clientX - $('.zbar').eq(regorlogin).offset().left;
        var $t = e.clientY - $('.zbar').eq(regorlogin).offset().top;

        $(document).on('mousemove', function(ev) {
            var $left = ev.clientX - $l;
            var $top = ev.clientY - $t;
            if ($left < 0) {
                $left = 0
            } else if ($left >= $(document).width() - $move.width()) {
                $left = $(document).width() - $move.width()
            }
            if ($top <= 0) {
                $top = 0
            } else if ($top >= $(document).height() - $move.height()) {
                $top = $(document).height() - $move.height()
            }
            $move.css('left', $left)
            $move.css('top', $top)
            return false;
        })
        $(document).on('mouseup', function(ev) {
            // $move.off("mousedown");
            $(document).off("mousemove");
            $(document).off('mouseup')
        })
    })

    const loginphone = $('.loginphone')
    const loginpass = $('.loginpass')
    const login = $('.login')

    login.on('click', function() {
        $.ajax({
            url: 'http://10.31.157.36:8088/Netease%20Cloud/php/login.php',
            data: {
                username: loginphone.val(),
                password: loginpass.val()
            },
            success(data) {
                localStorage.setItem('username', loginphone.val());
                if (data)
                    window.location.href = "http://10.31.157.36:8088/Netease%20Cloud/src/html/inde.html";
            },
            error() {

            }
        })
    })


})