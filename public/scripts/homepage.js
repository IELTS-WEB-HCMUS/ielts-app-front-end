document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnmodelogin').addEventListener('click', function () {
        window.location.href = '/user/login';
    });
    document.getElementById('btnmodesignup').addEventListener('click', function () {
        window.location.href = '/user/register';
    });
});