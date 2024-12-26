document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn_submit_email').addEventListener('click', function () {
        window.location.href = '/user/auth/resetpassword';
    });
});