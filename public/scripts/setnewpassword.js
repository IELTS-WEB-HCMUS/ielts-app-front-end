document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordError = document.createElement('div');
    const confirmPasswordError = document.createElement('div');
    const handlebarsError = document.getElementById('handlebars-error');
    const submitButton = document.getElementById('btn_submit_new_password');

    passwordError.className = 'error-message';
    confirmPasswordError.className = 'error-message';

    passwordInput.parentNode.insertBefore(passwordError, passwordInput.nextSibling);
    confirmPasswordInput.parentNode.insertBefore(confirmPasswordError, confirmPasswordInput.nextSibling);

    passwordInput.addEventListener('input', function () {
        if (handlebarsError) {
            handlebarsError.style.display = 'none';
        }
        clearError(passwordInput, passwordError);
        checkPasswordStrength(passwordInput, passwordError);
        toggleSubmitButton();
    });

    confirmPasswordInput.addEventListener('input', function () {
        if (handlebarsError) {
            handlebarsError.style.display = 'none';
        }
        clearError(confirmPasswordInput, confirmPasswordError);
        checkPasswordMatch(passwordInput, confirmPasswordInput, confirmPasswordError);
        toggleSubmitButton();
    });

    function checkPasswordStrength(input, errorElement) {
        const password = input.value.trim();
        if (!password) {
            showError(input, errorElement, 'Mật khẩu không được để trống', 'strength-weak');
        } else if (password.length < 8) {
            showError(input, errorElement, 'Mật khẩu phải có ít nhất 8 ký tự', 'strength-weak');
        } else {
            let strength = 0;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[@$!%*?&]/.test(password)) strength++;

            if (strength < 2 || !/[A-Z]/.test(password)) {
                showError(input, errorElement, 'Mật khẩu yếu (thêm chữ hoa, số hoặc ký tự đặc biệt)', 'strength-weak');
            } else if (strength === 2) {
                showError(input, errorElement, 'Mật khẩu trung bình (thêm số hoặc kí tự đặc biêt) ', 'strength-medium');
            } else if (strength === 4) {
                showError(input, errorElement, 'Mật khẩu mạnh', 'strength-very-strong');
            }
        }
    }

    function checkPasswordMatch(passwordInput, confirmPasswordInput, errorElement) {
        if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, errorElement, 'Mật khẩu xác nhận không khớp', 'strength-weak');
        } else {
            clearError(confirmPasswordInput, errorElement);
        }
    }

    function toggleSubmitButton() {
        const isPasswordStrong = passwordError.textContent.includes('Mật khẩu mạnh');
        const isPasswordMatch = confirmPasswordInput.value === passwordInput.value;
        submitButton.disabled = !(isPasswordStrong && isPasswordMatch);
    }

    function showError(input, errorElement, message, strengthClass) {
        input.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.className = `error-message ${strengthClass}`;
        errorElement.style.visibility = 'visible';
    }

    function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
    }
});