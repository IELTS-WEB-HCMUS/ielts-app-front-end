document.addEventListener('DOMContentLoaded', function () {
    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resend_otp');
    const emailInput = document.querySelector('input[name="email"]');
    const otpInput = document.querySelector('input[name="otp"]');
    const otpError = document.getElementById('otp-error');
    const submitButton = document.getElementById('btn_submit_otp');
    let countdown = 60;
    let countdownInterval;
    function startCountdown() {
        countdownElement.textContent = `Thời gian còn lại: ${countdown}s`;
        resendButton.style.visibility = 'visible';
        countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `Thời gian còn lại: ${countdown}s`;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = 'OTP đã hết hạn.';
                resendButton.style.visibility = 'visible';
            }
        }, 1000);
    }
    startCountdown();
    resendButton.addEventListener('click', function () {
        const email = emailInput.value;
        fetch('/user/register/resendotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(response => response.json()).then(result => {
            if (result.success) {
                
                clearInterval(countdownInterval);
                countdown = 60;
                startCountdown();
                // Hiển thị thông báo thành công
                otpError.textContent = 'Mã OTP đã được gửi lại thành công';
                otpError.style.visibility = 'visible';
                otpError.style.color = 'green';  // Đổi màu thành màu xanh để biểu thị thành công
                
                // Tự động ẩn thông báo sau 3 giây
                setTimeout(() => {
                    otpError.style.visibility = 'hidden';
                    otpError.style.color = '';  // Reset lại màu
                }, 3000);
            }
        }).catch(error => {
            console.error('Error resending OTP:', error);
        });
    });
    submitButton.addEventListener('click', function (e) {
        if (!validateOTP(otpInput, otpError)) {
            e.preventDefault();
        }
    });
    otpInput.addEventListener('input', function () {
        otpError.style.visibility = 'hidden';
    });
    function validateOTP(input, errorElement) {
        const otpValue = input.value.trim();
        if (!otpValue) {
            showError(input, errorElement, 'Vui lòng nhập mã OTP');
            return false;
        } else if (!/^\d{6}$/.test(otpValue)) {
            showError(input, errorElement, 'Mã OTP phải là 6 chữ số');
            return false;
        } else {
            clearError(input, errorElement);
            return true;
        }
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
}); 