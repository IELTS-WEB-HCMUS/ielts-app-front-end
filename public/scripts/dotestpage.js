class Question {
    constructor(order, type, content, options = [], answer = null) {
        this.order = order;
        this.type = type; // Loại câu hỏi: 'SINGLE-SELECTION', 'MULTIPLE', 'SINGLE-RADIO', 'FILL-IN-THE-BLANK'
        this.content = content; // Nội dung chi tiết của câu hỏi
        this.options = options; // Danh sách các lựa chọn (dành cho các câu hỏi có lựa chọn)
        this.answer = answer; // Đáp án hoặc câu trả lời đúng (tuỳ chọn)
    }
    checkAnswer(userAnswer) {
        if (this.type === 'SINGLE-SELECTION' || this.type === 'SINGLE-RADIO') {
            return userAnswer === this.answer;
        } else if (this.type === 'MULTIPLE') {
            return JSON.stringify(userAnswer.sort()) === JSON.stringify(this.answer.sort());
        } else if (this.type === 'FILL-IN-THE-BLANK') {
            return userAnswer.trim().toLowerCase() === this.answer.trim().toLowerCase();
        }
        return false;
    }
}

class Quiz {
    constructor(type, time){
        this.type = type;
        this.time = time*60;
    }
}

class Part{
    constuctor(){
        
    }
}

const quiz = new Quiz('Reading','50')

function startCountdown(quiz) {
    const timerElement = document.getElementById("timer");
    countdownTime = quiz.time

    // Cập nhật đồng hồ mỗi giây
    const interval = setInterval(function () {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;

        // Đảm bảo rằng phút và giây có 2 chữ số
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Hiển thị thời gian đếm ngược
        timerElement.textContent = `${minutes}:${seconds}`;

        // Kiểm tra khi đồng hồ hết giờ
        if (countdownTime <= 0) {
            clearInterval(interval);
            timerElement.textContent = "Time's up!";
        } else {
            countdownTime--;
        }
    }, 1000);
}

function loadQuiz(quiz){
    const quizType = document.getElementById('quiz-type-label');
    quizType.innerHTML = `MePass - ${quiz.type} Practice`;
    startCountdown(quiz); 
}

window.onload = function() {
    loadQuiz(quiz)
};


function loadQuestion(question) {
    const container = document.getElementById('question-area');
    container.innerHTML = ''; // Clear previous UI

    let uiElement = `<div class="question-container">`;

    switch (question.type) {
        case 'SINGLE-SELECTION':
            uiElement += `
                <div style="display: flex; flex-direction: row; align-items: center; ">
                    <div class="question-order-number" style="margin: 2%">${question.order}</div>
                    <select class="custom-dropdown">
                        ${question.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                    <p style="margin: 2%; align-items: center;">${question.content}</p>
                </div>
            `;
            break;

        case 'SINGLE-RADIO':
            uiElement += `
            <div style="display: flex; flex-direction: row; align-items: flex-start;">
                <div class="question-order-number" style="margin-left: 2%; margin-right: 2%; margin-top: 1%; align-self: flex-start;">${question.order}</div>
                    <div style="display: flex; flex-direction: column; margin: 2%;">
                        <p>${question.content}</p>
                        ${question.options.map(option => `
                            <div class="option" style="display: flex; align-items: center;">
                                <input type="radio" name="question" value="${option}" id="option-${option}">
                                <label for="option-${option}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            `;
            break;

        case 'FILL-IN-THE-BLANK':
            uiElement += `
            <div style="display: flex; flex-direction: row; align-items: center;">
                <div class="question-order-number" style="font-size: 2%; font-weight: bold; color: var(--question-order-color); margin-left: 2%">${question.order}</div>
                <p style="font-size: 1rem; margin: 2%; line-height: 1.5;">
                    ${question.content.replace(/_+/g, '<input type="text" class="input-answer" placeholder="Your answer here">')}
                </p>
            </div>
            `;
            break;

        default:
            uiElement += '<p>Invalid question type.</p>';
    }

    uiElement += '</div>'; // Close container
    container.innerHTML = uiElement;
}