document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('btn_submit_email');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    submitButton.addEventListener('click', function (e) {
        if (!validateEmail(emailInput, emailError)) {
            e.preventDefault(); 
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error === 'email_not_found') {
        emailError.textContent = 'Email không tồn tại.';
        emailError.style.visibility = 'visible';
    }
});

function validateEmail(input, errorElement) {
    const email = input.value.trim();
    if (!email) {
        showError(input, errorElement, 'Email không được để trống');
        return false;
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
        showError(input, errorElement, 'Email không đúng định dạng');
        return false;
    }
    clearError(input, errorElement);
    return true;
}

function showError(input, errorElement, message) {
    input.classList.add('input-error');
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible';
}

function clearError(input, errorElement) {
    input.classList.remove('input-error');
    errorElement.textContent = '';
    errorElement.style.visibility = 'hidden';
}