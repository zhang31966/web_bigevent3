$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间'
            }
        }
    })
    initUserInfo()
    // 重置
    $('#btnReset').on('click', function (e) {
        // alert(1)
        // e.preventDefault()
        e.preventDefault()
        initUserInfo()
    })
    // 发起更新用户信息请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败');
                }
                layui.layer.msg('更新用户信息成功');
           window.parent.getUserInfo()
            }
        });
    })
})
// 初始化用户基本信息
function initUserInfo() {
    var form = layui.form
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {      
            if (res.status !== 0) {
                layui.layer.msg('用户信息获取失败');
            }
            // 使用 form.val() 方法为表单赋值
            form.val('formUserInfo', res.data)


        }
    });
}