document.addEventListener('DOMContentLoaded', function () {
    const otpInput = document.querySelector('input[name="otp"]');
    const otpError = document.createElement('div');
    otpError.className = 'alert alert-danger';
    otpError.style.visibility = 'hidden';
    otpInput.parentNode.insertBefore(otpError, otpInput.nextSibling);

    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resend_otp');
    let countdown = 60;
    let countdownInterval;

    function startCountdown() {
        countdownElement.textContent = `Thời gian còn lại: ${countdown}s`;
        resendButton.style.visibility = 'hidden';
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
        fetch('/user/forget_password/resendotp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(result => {
            if (result.success) {
                clearInterval(countdownInterval);
                countdown = 60;
                startCountdown();
            }
        }).catch(error => {
            console.error('Error resending OTP:', error);
        });
    });

    document.getElementById('btn_submit_otp').addEventListener('click', function (e) {
        const otpValue = otpInput.value.trim();
        if (!otpValue) {
            showError(otpInput, otpError, 'Vui lòng nhập mã OTP');
            e.preventDefault();
        } else if (!/^\d{6}$/.test(otpValue)) {
            showError(otpInput, otpError, 'Mã OTP phải là 6 chữ số');
            e.preventDefault();
        } else {
            clearError(otpInput, otpError);
        }
    });

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