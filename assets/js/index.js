$(function () {
    getUserInfo()
    // 实现退出功能
    $('.btnout').on('click', function (e) {
        e.preventDefault()
        layui.layer.alert('确定退出吗', function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            
            layer.close(index);
          });         
    });
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
          },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            // console.log(res);
            renderAvatar(res.data)       
        }
    });
}
// 渲染头像页面
function renderAvatar(user) {
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic==null){
        $('.text-avatar').html(name[0].toUpperCase()).show()
    $('.layui-nav-img').hide()
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show(),
        $('.text-avatar').hide()       
    }
 
}