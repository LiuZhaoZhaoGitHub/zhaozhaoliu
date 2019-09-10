$(document).ready(function() {
    $('.num').html(JSON.parse(localStorage.getItem('goods') || []).length);



    //获取id
    var picsid = location.search.substring(1).split('=')[1];
    let itemdata = null;
    //将当前的picsid传给后端
    $.ajax({
            url: "http://10.31.157.36:8088/Netease%20Cloud/php/goos.php",
            data: {
                sid: picsid
            },
            dataType: 'json'
        }).done(function(data) {
            console.log(data)
            itemdata = data;
            $('.lefttit').html(`<i></i>${data.titile}`);
            $('.imgBox img').attr('src', data.url)
            $('.bigimgbox img').attr('src', data.url)
            $('.basic h2').html(data.titile)
            $('.basic').find('.price em').html(data.breaks);
            $('.basic').find('.price sub').html(data.price)
            $('.basic').find('.sellpoint ').html(data.now)
                //对url是进行遍历
            var arr = data.urls.split(',');
            // console.log(arr);
            var str = '';
            $.each(arr, function(index, value) {
                str += `
       <li data-action="go" index="${index}">
          <img class="img1" src="${value}">
      </li>
                       `
            })
            $('.simg').html(str);
            $('.simg li').eq(0).addClass("z-sel");
            //点击小图    考虑事件委托
            $('.simg').on('click', 'li', function() {
                $(this).addClass('z-sel').siblings().removeClass("z-sel");
                var $imgurl = $(this).find('img').attr('src');
                $('.imgBox img').attr('src', $imgurl);
                $('#bpic').attr('src', $imgurl);
            });
        })
        // 面向对象
    class goods {
        constructor() {

            }
            //放大镜效果
        init() {

            var bili = $('#bpic').width() / $('#imgBox').width();
            $("#imgBox").on('mousemove', function(ev) {
                // console.log('.pic mousemove')
                $('.smallmask').css('visibility', 'visible');
                //给大放添加显示
                $('#bigImgBox').css('visibility', 'visible');
                $('.arrowleft').css('display', 'block')
                $('.arrowright').css('display', 'block')

                //获得鼠标的位置
                var $left = ev.pageX - $(".imgBox").offset().left - $(".smallmask").width() / 2;
                var $top = ev.pageY - $(".imgBox").offset().top - $(".smallmask").height() / 2;
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('#imgBox').width() - $('.smallmask').width()) {
                    $left = $('#imgBox').width() - $('.smallmask').width()
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('#imgBox').height() - $('.smallmask').height()) {
                    $top = $('#imgBox').height() - $('.smallmask').height()
                }
                $('.smallmask').css('left', $left);
                $('.smallmask').css('top', $top);
                $('#bpic').css('left', -$left * bili);
                $('#bpic').css('top', -$top * bili);

            });
            //关闭
            $(".pic").on('mouseout', function(ev) {
                $(this).off("mousemove");
                $('.smallmask').css('visibility', 'hidden');
                $('.bigimgbox').css('visibility', 'hidden');
                $('.arrowleft').css('display', 'none')
                $('.arrowright').css('display', 'none')
            });

            //给右箭头添加点击事件
            var $num = 0; //可视区可见的图片为1
            //鼠标碰到有箭头的盒子时大方小放关闭
            $('.j-arrow').hover(function() {
                    $('.smallmask').hide();
                    $('.bigimgbox').hide();

                }, function() {
                    $('.smallmask').show();
                    //给大放添加显示
                    $('#bigImgBox').show();

                })
                //点击右箭头
                //点击右箭头
            $('.arrowright').on('click', function() {
                var $list = $('.simg li');
                $('.simg li').eq($num).addClass("z-sel");
                if ($list.length > $num) {
                    $num++;
                    if ($num === $list.length) $num = 0;

                }
                $('.simg li').eq($num).addClass('z-sel').siblings().removeClass("z-sel");
                var $imgli = $('.simg li').attr('index')
                let smallImg = $('.simg li img').eq($num).attr('src');
                let bigImg = $('.simg li img').eq($num).attr('src');
                $('#spic').attr('src', smallImg.split('?')[0] + '?244y244')
                $('#bpic').attr('src', bigImg.split('?')[0] + '?244y244')


            });
            //点击左箭头
            $('.arrowleft').on('click', function() {
                var $list = $('.simg li');
                if ($list.length > 1) {
                    $num--;

                    if ($num === -1) $num = $list.length - 1
                }

                $('.simg li').eq($num).addClass('z-sel').siblings().removeClass("z-sel");
                var $imgli = $('.simg li').attr('index')
                let smallImg = $('.simg li img').eq($num).attr('src');
                $('#spic').attr('src', smallImg.split('?')[0] + '?244y244')
            });


        }



    }
    new goods().init();
    //加入购物车
    const addCart = $('#addCart');
    const cartlist = JSON.parse(localStorage.getItem('goods')) || []; //获取localstorage里面的购物车数据，将json格式转换

    addCart.on('click', function() {
        const ishas = cartlist.find(item => {
            return item.sid === itemdata.sid;

        })
        if (ishas) ishas.num += Number($('#auto-id-qeFsbgMb0BWTDkRh').val());
        else cartlist.push({
            ...itemdata,
            num: Number($('#auto-id-qeFsbgMb0BWTDkRh').val())
        })

        localStorage.setItem('goods', JSON.stringify(cartlist))
        $('.num').html(JSON.parse(localStorage.getItem('goods')).length)
        alert("加入成功");

    })


    $('.basic').on('click', '.numplus', function(e) {
        const numInput = $('#auto-id-qeFsbgMb0BWTDkRh');
        let val = Number(numInput.val());
        numInput.val(val += 1)
    })
    $('.basic').on('click', '.numdown', function(e) {
        const numInput = $('#auto-id-qeFsbgMb0BWTDkRh');
        let val = Number(numInput.val());
        if (val === 1) return;
        else numInput.val(val -= 1);
    })

    return false;
})