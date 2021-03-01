$(function () {
    // 登录注册页面
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    });
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    });
    var form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pass = $('#pass').val()
            if (pass !== value) {
                return '两次输入的密码不一致'

            }
        }
    })
    // 注册页面
    $('#reg-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('.reg_box [name=username]').val(),
                password: $('.reg_box [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功请登录');
                $('#link_login').click()

            }
        });

    });
    // 登录界面
    $('#login-form').on('submit', function (e) {
        e.preventDefault()
       var data= {
        username: $('.login_box [name=username]').val(),
        password: $('.login_box [name=password]').val()
    }
        $.post('/api/login', data, function (res) {
        
            if (res.status !== 0) {

                layui.layer.msg(res.message);
            }
            layui.layer.msg(res.message)
            console.log(res.token);
            localStorage.setItem('token', res.token)
            location.href='/index.html'
              })







    })

})