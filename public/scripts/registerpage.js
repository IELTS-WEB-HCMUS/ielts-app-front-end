document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const passwordInput = document.getElementById('password1');
    const passwordError = document.getElementById('password-error');
    const submitButton = document.getElementById('log');


    emailInput.addEventListener('input', function () {
        validateEmail(emailInput, emailError);
    });

    passwordInput.addEventListener('input', function () {
        clearError(passwordInput, passwordError);
        checkPasswordStrength(passwordInput, passwordError);
    });


}); 