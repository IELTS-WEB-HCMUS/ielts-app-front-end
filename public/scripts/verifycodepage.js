document.addEventListener('DOMContentLoaded', function () {
    const otpInput = document.querySelector('input[name="otp"]');
    //const otpError = document.createElement('div');
    //otpError.className = 'alert alert-danger';
    //otpError.style.visibility = 'hidden';
    //otpInput.parentNode.insertBefore(otpError, otpInput.nextSibling);

    const submitButton = document.getElementById('btn_submit_otp');
    const otpError = document.getElementById('otp-error');
    submitButton.addEventListener('click', function (e) {
        if (!ValidationOTP(otpInput, otpError)) {
            e.preventDefault();
        }
    });
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error === 'otp_not_correct') {
        otpError.textContent = 'Mã OTP không đúng. Vui lòng thử lại.';
        otpError.style.visibility = 'visible';
    } else if (error === 'otp_expired') {
        otpError.textContent = 'Mã OTP đã hết hạn. Vui lòng gửi lại mã OTP.';
        otpError.style.visibility = 'visible';
    }

    const handlebarsError = document.getElementById('handlebars-error');

    const countdownElement = document.getElementById('countdown');
    const resendButton = document.getElementById('resend_otp');
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

    otpInput.addEventListener('input', function () {
        if (handlebarsError) {
            handlebarsError.style.display = 'none';
        }
    });
});

function ValidationOTP(input, errorElement) {
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
    input.classList.add('otp-error');
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible';
}
function clearError(input, errorElement) {
    input.classList.remove('otp-error');
    errorElement.textContent = '';
    errorElement.style.visibility = 'hidden';
}
