document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnmodelogin').addEventListener('click', function () {
        window.location.href = '/user/auth/login';
    });
    document.getElementById('btnmodesignup').addEventListener('click', function () {
        window.location.href = '/user/register';
    });
    document.getElementById('buy-now-btn').addEventListener('click', function () {
        window.location.href = '/payment';
    });
});