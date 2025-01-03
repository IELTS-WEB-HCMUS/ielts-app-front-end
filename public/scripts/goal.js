// const accessToken = "<%= access_token %>";

// document.addEventListener('DOMContentLoaded', function () {
//     const skills = ['TargetReading', 'TargetListening', 'TargetSpeaking', 'TargetWriting'];
//     const scores = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

//     const selectedDateElement = document.getElementById('selected-date');
//     const remainingDaysElement = document.getElementById('remaining-days');
//     const examDateButton = document.getElementById('exam-date-btn');
//     const examDateInput = document.getElementById('exam-date-input');

//     let examDate = selectedDateElement.textContent.trim();

//     // Initialize Flatpickr for exam date input
//     flatpickr(examDateInput, {
//         dateFormat: "d/m/Y",
//         defaultDate: examDate,
//         onChange: function (selectedDates, dateStr) {
//             examDate = dateStr;
//             selectedDateElement.textContent = examDate;
//             updateRemainingDays(examDate);
//             updateExamInfo();
//         }
//     });

//     examDateButton.addEventListener('click', function () {
//         examDateInput.click();
//     });

//     function updateRemainingDays(examDateStr) {
//         if (!examDateStr) return;

//         const examDateArr = examDateStr.split('/');
//         const examDateObj = new Date(examDateArr[2], examDateArr[1] - 1, examDateArr[0]);
//         const currentDate = new Date();
//         const timeDiff = examDateObj - currentDate;

//         if (timeDiff > 0) {
//             const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
//             remainingDaysElement.textContent = `${daysRemaining} ngày`;
//         } else {
//             remainingDaysElement.textContent = "Ngày thi đã qua";
//         }
//     }

//     function roundToIELTS(score) {
//         return parseFloat((Math.round(score * 2) / 2).toFixed(1));
//     }

//     function updateOverallScore() {
//         let total = 0;
//         let validScores = 0;

//         skills.forEach(skill => {
//             const score = document.getElementById(skill).textContent;
//             if (score && !isNaN(score)) {
//                 total += parseFloat(score);
//                 validScores++;
//             }
//         });

//         const overallScoreElement = document.getElementById('overall-score');
//         if (validScores === 4) {
//             const average = total / 4;
//             overallScoreElement.textContent = roundToIELTS(average).toFixed(1);
//         } else {
//             overallScoreElement.textContent = '--';
//         }

//         createTargetChart(50);
//     }

//     function getAllScores() {
//         const allScores = {};
//         skills.forEach(skill => {
//             allScores[skill] = document.getElementById(skill).textContent;
//         });
//         return allScores;
//     }

//     async function updateExamInfo() {
//         try {
//             const allScores = getAllScores();
//             console.log('Cập nhật:', { allScores, examDate });

//             if (!accessToken) {
//                 alert('Không tìm thấy token, vui lòng đăng nhập lại!');
//                 return;
//             }

//             const response = await fetch('/user/dashboard/updatetarget', {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ allScores, examDate }),
//             });

//             if (response.status === 200) {
//                 console.log('Cập nhật thành công:', { allScores, examDate });
//             } else {
//                 console.error('Lỗi khi cập nhật:', response.statusText);
//                 alert('Cập nhật thất bại.');
//             }
//         } catch (error) {
//             console.error('Lỗi kết nối:', error);
//         }
//     }

//     skills.forEach(skill => {
//         const scoreElement = document.getElementById(skill);
//         let currentScore = scoreElement.textContent;

//         if (currentScore && !currentScore.includes('.')) {
//             currentScore = parseFloat(currentScore).toFixed(1);
//             scoreElement.textContent = currentScore;
//         }

//         const scoreBox = scoreElement.parentElement;
//         scoreBox.addEventListener('click', async function () {
//             const scoreValue = prompt(`Chọn điểm ${skill} (0.5-9.0):`, currentScore);
//             const score = parseFloat(scoreValue);

//             if (scoreValue && !isNaN(score) && scores.includes(score)) {
//                 currentScore = score.toFixed(1);
//                 scoreElement.textContent = currentScore;
//                 updateOverallScore();
//                 updateExamInfo();
//             } else if (scoreValue !== null) {
//                 alert('Vui lòng nhập điểm hợp lệ (0.5-9.0)');
//             }
//         });
//     });

//     if (examDate && examDate !== 'dd/mm/yyyy') {
//         selectedDateElement.textContent = examDate;
//         updateRemainingDays(examDate);
//     } else {
//         selectedDateElement.textContent = 'dd/mm/yyyy';
//         remainingDaysElement.textContent = 'xx ngày';
//     }

//     updateOverallScore();
// });
