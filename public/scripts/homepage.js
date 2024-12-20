document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnmodelogin').addEventListener('click', function () {
        window.location.href = '/login';
    });
    document.getElementById('btnmodesignup').addEventListener('click', function () {
        window.location.href = '/register';
    });
    document.getElementById('buy-now-btn').addEventListener('click', function () {
        window.location.href = '/payment';
    });
});