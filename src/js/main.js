$(document).ready(function() {
    $.ajax({

            url: "http://10.31.157.36:8088/Netease%20Cloud/php/main.php",
            dataType: "json",
        }).done(function(datali) {
            // console.log(datali);
            var $strli = '';
            var $trli = '';
            var $hotli = '';
            $.each(datali, function(index, value) {
                if (index < 8) {
                    $strli += `     
                <li data-index=${index}>
                <div>
                
                    <a class="cover f-pr f-blk j-statistics"  href="goos.html?sid=${value.sid} ">
    
                        <img src="${value.url}" class="f-img">
    
                        <span class="spec f-pa" style="display:${value.price ? "block" : "none"}">
                         <span class="origin f-pa">&yen;${value.breaks}</span>
                        <span class="cut f-pa"><del>&yen;${value.price}</del></span>
                        </span>
                    </a>
                    <div class="cnt f-tc">
                        <h3 class="f-thide2">
                            <span class="tag tag-red"><em>Free Shipping</em></span>
    
                            <a  sid=${value.sid}  href="/store/product/detail?id=17994022">${value.titile}</a>
                        </h3>
    
                        <p class="txt f-thide">
    
                        &yen;<em>${value.breaks}</em>
    
                        </p>
                    </div>
                </div>
            </li>    
                
                `
                }
                if (index < 12) {
                    $trli += `     
                <li data-index=${index}>
                <div>
                
                    <a class="cover f-pr f-blk j-statistics"  href="goos.html?sid=${value.sid} ">
    
                        <img src="${value.url}" class="f-img">
    
                        <span class="spec f-pa"  style="display:${value.price ? "block" : "none"}">
                         <span class="origin f-pa">&yen;${value.breaks}</span>
                        <span class="cut f-pa"><del>&yen;${value.price}</del></span>
                        </span>
                    </a>
                    <div class="cnt f-tc">
                        <h3 class="f-thide2">
                            <span class="tag tag-red"><em>Free Shipping</em></span>
    
                            <a  sid=${value.sid}  href="/store/product/detail?id=17994022">${value.titile}</a>
                        </h3>
    
                        <p class="txt f-thide">
    
                            &yen;<em>${value.breaks}</em>
    
                        </p>
                    </div>
                </div>
            </li>    
                
                `
                }
                if (index < 4) {
                    $hotli += `     
                <li data-index=${index}>
                <div>
                
                    <a class="cover f-pr f-blk "  href="goos.html?sid=${value.sid} ">
    
                        <img src="${value.url}" class="f-img">
    
                        <span class="spec f-pa"  style="display:${value.price ? "block" : "none"}">
                         <span class="origin f-pa">&yen;${value.breaks}</span>
                        <span class="cut f-pa"><del>&yen;${value.price}</del></span>
                        </span>
                    </a>
                    <div class="cnt f-tc">
                        <h3 class="f-thide2">
                            <span class="tag tag-red"><em>Free Shipping</em></span>
    
                            <a  sid=${value.sid}  href="goos.html?sid=${value.sid}">${value.titile}</a>
                        </h3>
    
                        <p class="txt f-thide">
    
                        &yen;<em>${value.breaks}</em>
    
                        </p>
                    </div>
                </div>
            </li>    
                
                `
                }


            });
            $('.trul').html($trli);
            $('.listlil').html($strli);
            $('.mainul').html($strli);
            $('.hotul').html($hotli);

            // console.log(location.search.substring(1).split('=')[1]);
            //判断索引为3，7，11...的li添加有边框为0
            //编辑推荐
            $('.mainul').find('li').attr('data-index', function(index, val) {
                    if ((val - 3) % 4 === 0) {
                        $(this).css("padding-right", "0px", )
                    }
                })
                //热门商品
            $('.trul').find('li').attr('data-index', function(index, val) {
                    if ((val - 3) % 4 === 0) {
                        $(this).css("padding-right", "0px", )
                    }
                })
                //购物车页
            $('.listlil').find('li').attr('data-index', function(index, val) {
                if ((val - 3) % 4 === 0) {
                    $(this).css("padding-right", "0px", )
                }
            })

        })
        //判断如果没有折后的价格，jiugei .spec添加display:nono
        // $del = $('.cut del').text()
        //     // console.log($del);
        // var str = $del.split('¥').slice(1, -1);
        // // console.log(str);
        // $.each(str, function(index, val) {
        //         if (val !== 'null') {
        //             // console.log(val)
        //         }
        //     })
        //右边栏的固定效果
        //给windo添加滚轮
    $(window).on('scroll', function() {
        let $topvalue = $(this).scrollTop();
        // console.log($topvalue)
        if ($topvalue > 600) {
            $('#m-top').css('position', 'fixed');
            $('#m-top').css('top', '50%');
            $('#m-top').css('margin-top', -138);
            $('.ab').show();

            $('#shooptop').show();
        } else {
            $('#m-top').css('position', 'absolute');
            $('#m-top').css('top', 701);
            $('#m-top').css('margin-top', 0);
            $('.ab').hide();
            $('#shooptop').hide();
        }
        //滚轮滚到哪儿哪儿添加active
        $('.louceng').each(function(index, element) {
            let $litop = $(element).offset().top; //楼层的top
            // console.log($litop);
            if ($litop + 600 > $topvalue) { //如果盒子的top值大于滚动条的top值，添加active.
                $('.ab').find('.redsp ').eq(index).addClass('active').siblings().removeClass('active');
                return false;
            }
        })
    });


    //2.给左侧的楼梯添加点击事件，进行位置的跳转
    //offset():盒子的偏移值，返回一个对象，包含left/top
    $('.redsp').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        var $top = $('.louceng').eq($(this).index()).offset().top; //当前楼梯li项对应的楼层的top值。
        $('html,body').animate({
            scrollTop: $top
        })
    });

    //3.回到顶部
    $('.backtop').on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        });
    });

    $('.shopcar').on('click', function() {
        window.location.href = "http://10.31.157.36:8088/Netease%20Cloud/src/html/car.html"
    })

    $('.block').on('click', function() {
        window.location.href = "http://10.31.157.36:8088/Netease%20Cloud/src/html/car.html"
    })

    // $('.num').html(JSON.parse(localStorage.getItem('goods')).length || [])
    $('.num').html(JSON.parse(localStorage.getItem('goods') || []).length);

})