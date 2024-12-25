document.addEventListener('DOMContentLoaded', function () {
    const examDateInput = document.getElementById('exam-date-input');
    const examDateBtn = document.getElementById('exam-date-btn');
    const remainingDaysSpan = document.getElementById('remaining-days');
    const selectedDateSpan = document.getElementById('selected-date');
    const overlay = document.querySelector('.date-picker-overlay');

    // Format date function
    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Lấy ngày thi từ localStorage nếu có
    const savedExamDate = localStorage.getItem('examDate');
    if (savedExamDate) {
        updateRemainingDays(new Date(savedExamDate));
        selectedDateSpan.textContent = formatDate(savedExamDate);
    } else {
        selectedDateSpan.textContent = 'Chọn ngày';
        remainingDaysSpan.textContent = 'Chưa chọn ngày thi';
    }

    const datePicker = flatpickr(examDateInput, {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function (selectedDates) {
            const selectedDate = selectedDates[0];
            if (selectedDate) {
                localStorage.setItem('examDate', selectedDate);
                selectedDateSpan.textContent = formatDate(selectedDate);
                updateRemainingDays(selectedDate);
                hideOverlay();
            }
        },
        onClose: function () {
            hideOverlay();
        }
    });

    // Xử lý sự kiện click vào nút Ngày thi
    examDateBtn.addEventListener('click', function () {
        showOverlay();
        datePicker.open();
    });

    // Xử lý click overlay để đóng date picker
    overlay.addEventListener('click', function () {
        datePicker.close();
        hideOverlay();
    });

    function showOverlay() {
        overlay.style.display = 'block';
    }

    function hideOverlay() {
        overlay.style.display = 'none';
    }

    // Hàm tính và hiển thị số ngày còn lại
    function updateRemainingDays(examDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const examDateTime = new Date(examDate);
        examDateTime.setHours(0, 0, 0, 0);

        const diffTime = examDateTime - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            remainingDaysSpan.textContent = 'Đã qua ngày thi';
        } else if (diffDays === 0) {
            remainingDaysSpan.textContent = 'Hôm nay là ngày thi';
        } else {
            remainingDaysSpan.textContent = `Còn ${diffDays} ngày`;
        }
    }
}); 