$('.u-btn2  button').on('click', function() {


    $username = $('.regphone'); //用户手机号
    $password = $('.regpass'); //用户密码
    //判断手机号
    if ($username.val() !== '') {
        let tel = /^1[34578]\d{9}$/; //规则
        if (tel.test($username.val())) {
            $.ajax({
                url: "http://10.31.157.36:8088/Netease%20Cloud/php/reg.php",
                data: {
                    username: $username.val(),
                    password: $password.val()
                },
                success(data) {
                    if (!data) {
                        window.location.href = "http://10.31.157.36:8088/Netease%20Cloud/src/html/login.html"
                        alert('注册成功，请登录')
                    } else {
                        alert('该账号已注册，请登录')
                    }

                },

            })

        } else {
            alert('请输入正确的手机号')
        }
    }



})