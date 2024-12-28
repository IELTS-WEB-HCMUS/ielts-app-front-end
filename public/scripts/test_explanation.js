class Question {
    constructor(order, type, content, options = [], answer, explain, description = null) {
        this.order = order;
        this.type = type; // Loại câu hỏi: 'SINGLE-SELECTION', 'SINGLE-RADIO', 'FILL-IN-THE-BLANK'
        this.content = content; // Nội dung chi tiết của câu hỏi
        this.options = options; // Danh sách các lựa chọn (dành cho các câu hỏi có lựa chọn)
        this.answer = answer; // Đáp án 
        this.explain = explain; // Lưu giải thích cho đáp án
        this.description = description; // Lưu hướng dẫn cách làm của dạng câu hỏi (có thể có giá trị hoặc null)
    }
}

class Part{
    constructor(question_count, questions = []){
        this.question_count = question_count
        this.questions = questions;
    }
}

class Quiz {
    constructor(type, content, title, time, parts = []){
        this.type = type; // Listening(2) hay reading(1)
        this.content = content; // Nội dung bài đọc với reading full test
        this.title = title; // Tiêu đề của quiz
        this.time = time * 60; //Thời gian giới hạn của quiz (tính bằng phút)
        this.parts = parts
    }
}

class Vocab {
    constructor(value, word_class, meaning, ipa, example, verb_structure, explanation){
        this.value = value;
        this.word_class = word_class;
        this.meaning = meaning;
        this.ipa = ipa;
        this.example = example;
        this.verb_structure = verb_structure;
        this.explanation = explanation;
    }
}

class AnswerQuestion {
    constructor(id_question, success_count = 0, total = 1) {
        this.id_question = id_question;  
        this.success_count = success_count; 
        this.total = total;  
    }
}


class Answer {
    constructor(text, answer, correct, order_question, type, id_question) {
        this.text = text; // Nội dung câu hỏi
        this.answer = answer; // Câu trả lời của người dùng
        this.correct = correct; // Đúng hay sai (true/false)
        this.order_question = order_question; // Thứ tự câu hỏi
        this.type = type; // Loại câu hỏi (SINGLE-SELECTION, SINGLE-RADIO, FILL-IN-THE-BLANK)
        this.id_question = id_question; // id của câu hỏi
    }
}

// Cấu trúc của một phần trong quiz
class AnswerPart {
    constructor(order_part, answers = []) {
        this.order_part = order_part; // thứ tự của phần bắt đầu từ 0
        this.answers = answers; // Danh sách các câu trả lời trong phần
    }
}

// Cấu trúc của quiz tổng thể
class AnswerQuiz {
    constructor(id, type, completed_duration, parts = [], summary = { correct: 0, total: 0, left_time: 0 }) {
        this.id = id;  // id của quiz
        this.type = type; // Loại quiz (1: Reading, 2: Listening)
        this.completed_duration = completed_duration; // Thời gian còn lại (số giây)
        this.summary = summary; // Tổng hợp kết quả quiz (số câu đúng, tổng số câu hỏi, thời gian còn lại)
    }
}


// Tạo các câu hỏi
let question1 = new Question(
    1, 
    'SINGLE-SELECTION', 
    'What is the capital of France?', 
    ['Berlin', 'Madrid', 'Paris', 'Rome'], 
    'Paris', 
    'Paris is the capital city of France.',
    '<h3><strong>Questions 1 - 5:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>' // Dữ liệu lấy xuống config có tag html sẵn
);

let question2 = new Question(
    2, 
    'SINGLE-RADIO',  
    'Which of the following are programming languages?', 
    ['JavaScript', 'HTML', 'CSS', 'Python'], 
    'JavaScript',  
    'JavaScript and Python are programming languages.' 
);

let question3 = new Question(
    3, 
    'FILL-IN-THE-BLANK', 
    'The chemical symbol for water is ____.', 
    [], 
    'H2O', 
    'H2O is the chemical formula for water.'
);

let question4 = new Question(
    4, 
    'SINGLE-RADIO', 
    'Which of the following is the largest planet in our solar system?', 
    ['Earth', 'Jupiter', 'Saturn', 'Mars'], 
    'Jupiter', 
    'Jupiter is the largest planet in our solar system.'
);

let question5 = new Question(
    5, 
    'SINGLE-RADIO',  
    'Which planets are gas giants?', 
    ['Mercury', 'Venus', 'Jupiter', 'Saturn'], 
    'Jupiter',  
    'Jupiter and Saturn are gas giants.'  
);

let question6 = new Question(
    6, 
    'FILL-IN-THE-BLANK', 
    'The sun is a type of ____.', 
    [], 
    'star', 
    'The sun is a star.',
    '<h3><strong>Questions 6 - 9:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>'
);

let question7 = new Question(
    7, 
    'SINGLE-SELECTION', 
    'What is the tallest mountain in the world?', 
    ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'], 
    'Mount Everest', 
    'Mount Everest is the tallest mountain in the world.'
);

let question8 = new Question(
    8, 
    'SINGLE-RADIO', 
    'Which ocean is the largest?', 
    ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], 
    'Pacific Ocean', 
    'The Pacific Ocean is the largest ocean on Earth.'
);

let question9 = new Question(
    9, 
    'SINGLE-RADIO',  
    'Which animals are mammals?', 
    ['Dog', 'Fish', 'Lion', 'Shark'], 
    'Dog',  
    'Dog and Lion are mammals.'  
);

// Tạo các phần (Part)
let part1 = new Part(
    3, 
    [question1, question2, question3]
);

let part2 = new Part(
    3, 
    [question4, question5, question6]
);

let part3 = new Part(
    3, 
    [question7, question8, question9]
);

// Tạo quiz
let quiz = new Quiz(
    1, 
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra euismod neque euismod vehicula venenatis faucibus scelerisque potenti vehicula. Maximus magna mollis elit molestie; tempor blandit pretium fames. Sem praesent dictumst dolor cubilia integer hac. Vivamus curabitur in rhoncus bibendum lacinia varius netus. Fames efficitur curae semper etiam ante. Interdum luctus nisl per sodales viverra gravida. Erat euismod iaculis non mi diam. Hac tempus volutpat urna convallis, placerat eget hac ante fringilla. Vulputate justo enim feugiat nunc sed vel. Aenean primis praesent eleifend adipiscing sem. Convallis non ipsum rutrum dignissim ornare aenean integer venenatis senectus. Mollis pharetra sapien sociosqu natoque felis; eu ultrices potenti netus. Eros tellus turpis eget nibh ornare sollicitudin. Per dignissim elit suspendisse magna posuere hendrerit proin inceptos. Tortor malesuada amet iaculis tortor gravida. Elementum bibendum conubia luctus laoreet dis congue augue parturient. Donec sem class imperdiet eu quis litora montes leo donec. Ultrices dignissim aenean iaculis gravida eget congue! Pharetra ridiculus lectus finibus parturient ut.',
    'General Knowledge Quiz', 
    30, // 30 phút
    [part1, part2, part3]
);


// Dữ liệu giả trả lời của người dùng lấy từ api
let answer1 = new Answer(
    'What is the capital of France?',
    'Paris',
    true, 
    1, 
    'SINGLE-SELECTION', 
    1
);

let answer2 = new Answer(
    'Which of the following are programming languages?',
    'JavaScript',
    true,
    2,
    'SINGLE-RADIO',
    2
);

let answer3 = new Answer(
    'The chemical symbol for water is ____.',
    'H2O',
    true,
    3,
    'FILL-IN-THE-BLANK',
    3
);

let answer_part1 = new AnswerPart(0, [answer1, answer2]);
let answer_part2 = new AnswerPart(1, [answer3]);

let answer_quiz = new AnswerQuiz(1001, 1, 60, [part1, part2], {
    correct: 3,
    total: 3,
    left_time: 45
});

function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60); // Lấy phần nguyên của số phút
    const remainingSeconds = seconds % 60; // Số giây còn lại

    // Đảm bảo rằng phút và giây luôn có 2 chữ số
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function loadPart(part){
    let uiElement = `<div class="part-container">`;
    part.questions.forEach(question => {
        if (question.description) {
            uiElement += question.description; 
        }
        const questionUI = loadQuestion(question); 
        uiElement += questionUI; 
    });
    uiElement += '</div>';
    return uiElement
}

function loadQuestion(question) {
    let uiElement = `<div class="question-container" id="question-${question.order}">`;

    switch (question.type) {
        case 'SINGLE-SELECTION':
            uiElement += `
                <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                    <div class="question-order-number" style="margin: 2%">${question.order}</div>
                    <select class="custom-dropdown" onchange="checkAnswer(${question.order})">
                        <option value="" selected disabled>None</option> 
                        ${question.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                    <p style="margin: 2%; align-items: center;">${question.content}</p>
                </div>
            `;
            break;

        case 'SINGLE-RADIO':
            uiElement += `
            <div style="display: flex; flex-direction: row; align-items: flex-start; width: 100%">
                <div class="question-order-number" style="margin-left: 2%; margin-right: 2%; margin-top: 1%; align-self: flex-start;">${question.order}</div>
                <div style="display: flex; flex-direction: column; margin: 2%;">
                    <p>${question.content}</p>
                    ${question.options.map(option => `
                        <div class="option" style="display: flex; align-items: center;">
                            <input type="radio" name="question-${question.order}" value="${option}" id="option-${question.order}-${option}" onchange="checkAnswer(${question.order})">
                            <label for="option-${question.order}-${option}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
            break;

        case 'FILL-IN-THE-BLANK':
            uiElement += `
            <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                <div class="question-order-number" style="margin: 2%">${question.order}</div>
                <p style="font-size: 1rem; margin: 2%; line-height: 1.5;">
                    ${question.content.replace(/_+/g, '<input type="text" class="input-answer" data-question-id="' + question.order + '" oninput="checkAnswer(' + question.order + ')">')}
                </p>
            </div>
            `;
            break;

        default:
            uiElement += '<p>Invalid question type.</p>';
    }

    uiElement += '</div>'; // Close container
    return uiElement;
}

function loadButtonQuestion(quiz) {
    let totalQuestion = 0;
    quiz.parts.forEach(part => {
        totalQuestion += part.question_count;
    });

    const container = document.getElementById('question-buttons');
    container.innerHTML = ''; 
    let uiElement = ``;

    for (let order = 1; order <= totalQuestion; order++) {
        uiElement += `
            <button class="button-question" data-question-id="${order}">${order}</button>
        `;
    }

    container.innerHTML = uiElement; 
}


function checkAnswer(questionId) {
    const question = document.getElementById(`question-${questionId}`);
    const inputs = question.querySelectorAll('input, select'); 

    let isAnswered = false;

    inputs.forEach(input => {
        if (input.type === 'radio' && input.checked) {
            isAnswered = true;
        }

        if (input.type === 'text' && input.value.trim() !== '') {
            isAnswered = true;
        }

        if (input.tagName.toLowerCase() === 'select' && input.value !== '') {
            isAnswered = true;
        }
    });

    const button = document.querySelector(`button[data-question-id="${questionId}"]`);
    if (button) {
        if (isAnswered) {
            button.classList.add('answered'); 
        } else {
            button.classList.remove('answered'); 
        }
    }
}

function loadQuiz(quiz, answer_quiz){
    const quizType = document.getElementById('quiz-type-label');
    const strQuizType = quiz.type === 1 ? "Reading" : "Listening";
    quizType.innerHTML = `MePass - ${strQuizType} Practice`;

    const timerElement = document.getElementById("timer");
    timerElement.textContent = convertSecondsToMinutes(answer_quiz.completed_duration);
    loadButtonQuestion(quiz);

    const quizTitle = document.getElementById('quiz-title');
    quizTitle.innerHTML = quiz.title;

    const quizContentHighlight = document.getElementById('quiz-content-highlight');
    quizContentHighlight.innerHTML = quiz.content;

    const container = document.getElementById('question-area');
    container.innerHTML = ''; // Clear previous UI
    let uiElement = ``;
    quiz.parts.forEach(part =>{
        const partUI = loadPart(part);
        uiElement += partUI;
    });
    container.innerHTML = uiElement;
}

window.onload = function() {
    loadQuiz(quiz, answer_quiz);
};