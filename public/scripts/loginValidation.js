// Chỉ giữ regex cho email
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

class FormValidator {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.emailError = document.getElementById('email-error');
        this.loginError = document.getElementById('login-error');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.emailInput.addEventListener('input', () => {
            this.validateEmail();
           this.clearError(this.passwordInput, this.loginError); // Xóa thông báo lỗi đăng nhập
        });
        
        this.passwordInput.addEventListener('input', () => {
            this.clearError(this.passwordInput, this.loginError);
        });

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        
        if (!email) {
            this.showError(this.emailInput, this.emailError, 'Email không được để trống');
            return false;
        }
        
        if (!EMAIL_REGEX.test(email)) {
            this.showError(this.emailInput, this.emailError, 'Email không đúng định dạng');
            return false;
        }

        this.clearError(this.emailInput, this.emailError);
        return true;
    }

    showError(input, errorElement, message) {
        input.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.style.visibility = 'visible';
    }

    clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.style.visibility = 'hidden';
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const password = this.passwordInput.value;

        if (!password) {
            this.showError(this.passwordInput, this.loginError, 'Vui lòng nhập mật khẩu');
            return;
        }

        if (isEmailValid) {
            // Kiểm tra Remember Me
            const rememberMeChecked = document.querySelector('input[name="remember"]').checked;
            if (rememberMeChecked) {
                sessionStorage.setItem('email', this.emailInput.value);
                sessionStorage.setItem('password', this.passwordInput.value);
            } else {
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('password');
            }
            
            // Submit form
            this.form.submit();
        }
    }
}

// Khởi tạo validator và kiểm tra lỗi từ URL
document.addEventListener('DOMContentLoaded', () => {
    const validator = new FormValidator();
    
    const urlParams = new URLSearchParams(window.location.search);
    const loginError = urlParams.get('error');
    if (loginError) {
        const loginErrorElement = document.getElementById('login-error');
        if (loginErrorElement) {
            loginErrorElement.textContent = 'Email hoặc mật khẩu không chính xác';
            loginErrorElement.style.visibility = 'visible';
            document.getElementById('password').classList.add('input-error');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    if (form) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');

        emailInput.addEventListener('input', () => {
            validateEmail(emailInput, emailError);
        });

        form.addEventListener('submit', (e) => {
            if (!validateEmail(emailInput, emailError)) {
                e.preventDefault();
            }
        });
    }
});

function validateEmail(input, errorElement) {
    const email = input.value.trim();
    if (!email) {
        showError(input, errorElement, 'Email không được để trống');
        return false;
    }
    if (!EMAIL_REGEX.test(email)) {
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