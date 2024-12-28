document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('btn_submit_email');
    submitButton.addEventListener('click', function (e) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (!validateEmail(emailInput, emailError)) {
            e.preventDefault(); 
        }
    });
});