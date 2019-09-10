! function($) {
    //渲染轮播列表
    $.ajax({
        url: 'http://10.31.157.36:8088/Netease%20Cloud/php/lunbo.php',
        dataType: 'json'
    }).done(function(data) {
        // console.log(data);
        let $strhtml = "";
        $.each(data, function(index, value) {
            $strhtml += `
            <li class="f-pa " sid=${value.sid} 
            data-url="${value.url}" 
            style="background-image: url(${value.backgroundurl});">
                 
            <a class="f-pa" href="${value.backgroundurl}"  sid="${value.sid}"  data-url="${value.backgroundurl}">
            <img src="${value.url}" ></a>
        </li>
            `;
        })
        $('.lunboul').html($strhtml);
        var $banner = $('.n-banner'); //大盒子
        var $btn = $(".dots a") //小园点
        var $img = $(".lunboul li"); //移动的图片
        var $left = $('.point .left'); //左箭头
        var $right = $('.point .left +.right'); //右箭头
        var $qindex = 0; //前一个索引
        var $index = 0; //当前索引

        $img.eq($index).addClass('active').siblings().removeClass('active');
        $btn.eq($index).addClass('z-sel').siblings().removeClass('z-sel');
        //1.给小圆点添加点击事件
        $btn.on('click', function() {
                //先存储当前点击的索引
                $index = $(this).index();
                lunbotab();
                $qindex = $index; //将当前的索引给前一个索引
            })
            //左右箭头hover后背景图变色
        $left.hover(
            function() {
                $left.css({ 'background': '#000' })
            },
            function() {
                $left.css({ 'background': '#ccc' })
            }
        );
        $right.hover(
            function() {
                $right.css({ 'background': '#000' })
            },
            function() {
                $right.css({ 'background': '#ccc' })
            }
        );
        //给左右箭头添加事件
        $right.on('click', function(ev) {
            $index++;
            if ($index > 5) {
                $index = 0;
                $qindex = 5;
            }
            lunbotab(ev);
        })
        $left.on('click', function(ev) {
            $index--;
            if ($index < 0) {
                $index = 5;
                $qindex = 0;
            }
            lunbotab(ev);
        })

        function lunbotab() {
            $btn.eq($index).addClass('z-sel').siblings().removeClass('z-sel');
            $img.eq($index).addClass('active').siblings().removeClass('active');
        }


        // 定时器
        $timer = setInterval(function(ev) {
            $index++;
            if ($index > 5) {
                $index = 0;
                $qindex = 5;
            }
            lunbotab(ev);
        }, 2000)

        $banner.on('mouseover', function(ev) {
            clearInterval($timer);
        })
        $banner.on('mouseout', function(ev) {
            $timer = setInterval(function(ev) {
                $index++;
                if ($index > 5) {
                    $index = 0;
                    $qindex = 5;
                }
                lunbotab(ev);
            }, 2000)

        })

    });

}(jQuery);