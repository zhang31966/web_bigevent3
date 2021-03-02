$(function () {
    form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        oldpwd: function (value) {
            if (value == $('.layui-form [name=oldPwd]').val()) {
                return '新旧密码不允许一致'
            }
        },
        newpwd: function (value) { 
            if (value !== $('.layui-form [name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
         }
    })
    // 发起重置密码的请求
    $('#from-repwd').submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败');
                }
                layui.layer.msg('更新密码成功，请重新登录')
                window.parent.location.href='/login.html'    
            }
        });
    
        
    });
    



})