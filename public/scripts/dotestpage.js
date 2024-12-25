class Question {
    constructor(order, type, content, options = [], answer = null, explain) {
        this.order = order;
        this.type = type; // Loại câu hỏi: 'SINGLE-SELECTION', 'SINGLE-RADIO', 'FILL-IN-THE-BLANK'
        this.content = content; // Nội dung chi tiết của câu hỏi
        this.options = options; // Danh sách các lựa chọn (dành cho các câu hỏi có lựa chọn)
        this.answer = answer; // Đáp án hoặc câu trả lời đúng (tuỳ chọn)
        this.explain = explain // Lưu giải thích cho đáp án
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

class Part{
    constructor(title, content, description, question_count, questions = []){
        this.title = title; // Part 1, Part 2, Part 3
        this.content = content;
        this.description = description; // Được lấy từ trường description của question đầu tiên chứa trong part
        this.question_count = question_count;
        this.questions = questions;
    }
}

class Quiz {
    constructor(type, content, title, time, parts = []){
        this.type = type; // Listening hay reading
        this.content = content; // Nội dung bài đọc với reading full test
        this.title = title; // Tiêu đề của quiz
        this.time = time*60; //Thời gian giới hạn của quiz (tính bằng phút)
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

// Tạo các câu hỏi
let question1 = new Question(
    1, 
    'SINGLE-SELECTION', 
    'What is the capital of France?', 
    ['Berlin', 'Madrid', 'Paris', 'Rome'], 
    'Paris', 
    'Paris is the capital city of France.'
);

let question2 = new Question(
    2, 
    'SINGLE-RADIO',  // Đổi từ MULTIPLE thành SINGLE-RADIO
    'Which of the following are programming languages?', 
    ['JavaScript', 'HTML', 'CSS', 'Python'], 
    'JavaScript',  // Chỉ chọn một câu trả lời, vì chuyển sang SINGLE-RADIO
    'JavaScript and Python are programming languages.' // Cập nhật câu trả lời cho phù hợp với kiểu SINGLE-RADIO
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
    'SINGLE-RADIO',  // Đổi từ MULTIPLE thành SINGLE-RADIO
    'Which planets are gas giants?', 
    ['Mercury', 'Venus', 'Jupiter', 'Saturn'], 
    'Jupiter',  // Chỉ chọn một câu trả lời, vì chuyển sang SINGLE-RADIO
    'Jupiter and Saturn are gas giants.'  // Cập nhật câu trả lời cho phù hợp với kiểu SINGLE-RADIO
);

let question6 = new Question(
    6, 
    'FILL-IN-THE-BLANK', 
    'The sun is a type of ____.', 
    [], 
    'star', 
    'The sun is a star.'
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
    'SINGLE-RADIO',  // Đổi từ MULTIPLE thành SINGLE-RADIO
    'Which animals are mammals?', 
    ['Dog', 'Fish', 'Lion', 'Shark'], 
    'Dog',  // Chỉ chọn một câu trả lời, vì chuyển sang SINGLE-RADIO
    'Dog and Lion are mammals.'  // Cập nhật câu trả lời cho phù hợp với kiểu SINGLE-RADIO
);

// Tạo các phần (Part)
let part1 = new Part(
    'Part 1', 
    'This part contains general knowledge questions about geography and science.', 
    'A general overview of geographical knowledge and scientific facts.', 
    3, 
    [question1, question2, question3]
);

let part2 = new Part(
    'Part 2', 
    'This part tests knowledge of the solar system and natural sciences.', 
    'A set of questions related to the solar system, planets, and stars.', 
    3, 
    [question4, question5, question6]
);

let part3 = new Part(
    'Part 3', 
    'This part covers natural landmarks and animal species.', 
    'Questions related to mountains, oceans, and animal species.', 
    3, 
    [question7, question8, question9]
);

// Tạo quiz
let quiz = new Quiz(
    'Reading', 
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra euismod neque euismod vehicula venenatis faucibus scelerisque potenti vehicula. Maximus magna mollis elit molestie; tempor blandit pretium fames. Sem praesent dictumst dolor cubilia integer hac. Vivamus curabitur in rhoncus bibendum lacinia varius netus. Fames efficitur curae semper etiam ante. Interdum luctus nisl per sodales viverra gravida. Erat euismod iaculis non mi diam. Hac tempus volutpat urna convallis, placerat eget hac ante fringilla. Vulputate justo enim feugiat nunc sed vel. Aenean primis praesent eleifend adipiscing sem. Convallis non ipsum rutrum dignissim ornare aenean integer venenatis senectus. Mollis pharetra sapien sociosqu natoque felis; eu ultrices potenti netus. Eros tellus turpis eget nibh ornare sollicitudin. Per dignissim elit suspendisse magna posuere hendrerit proin inceptos. Tortor malesuada amet iaculis tortor gravida. Elementum bibendum conubia luctus laoreet dis congue augue parturient. Donec sem class imperdiet eu quis litora montes leo donec. Ultrices dignissim aenean iaculis gravida eget congue! Pharetra ridiculus lectus finibus parturient ut',
    'General Knowledge Quiz', 
    30, // 30 phút
    [part1, part2, part3]
);

// Chức năng tra từ - Start
function showWordIndex(index, word) {
    alert(`The word "${word}" is at index ${index} in the paragraph.`);
}

function makeWordsClickable(paragraph) {
    const text = paragraph.textContent.trim().replace(/\s+/g, ' ');  
    const words = text.split(' '); 

    const clickableWords = words.map((word, index) => {
        return `<a href="#" class="vocab-word" data-bs-target="#vocab-offcanvasBottom" 
        onclick="handleWordClick(this, ${index}, '${word}')">${word}</a>`; 
    });

    paragraph.innerHTML = clickableWords.join(' '); 
}

function handleWordClick(element, index, word) {
    removeUnderlineWord();
    element.classList.add('active');

    const offcanvas = document.getElementById('vocab-offcanvasBottom');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    showWordDefinition(index, word);
    bsOffcanvas.show();
}

function removeUnderlineWord(){
    const activeWords = document.querySelectorAll('.vocab-word.active');
    activeWords.forEach(word => word.classList.remove('active')); 
}


function showWordDefinition(index, word) {
    // Thay đổi nội dung với từ được nhấn
    const vocab = new Vocab(
        'run',                  // value
        'verb',                 // word_class
        'to move swiftly on foot', // meaning
        '/rʌn/',                // ipa (International Phonetic Alphabet)
        'I run every morning.', // example
        'run + object',         // verb_structure
        'To run means to move at a speed faster than a walk.' // explanation
    );

    document.getElementById('vocab-value').textContent = word; // Đổi thành vocab.value; !!!!!!!!!!!!
    document.getElementById('vocab-ipa').textContent = vocab.ipa;
    document.getElementById('vocab-word-class').textContent = vocab.word_class;
    document.getElementById('vocab-meaning').textContent = vocab.meaning;
    document.getElementById('vocab-verb-structure').textContent = vocab.verb_structure;
    document.getElementById('vocab-example').textContent = vocab.example;
    document.getElementById('vocab-explanation').textContent = vocab.explanation;
}
// Chức năng tra từ - End

// Chức năng Highlight Text - Start
function HighlightText() {
    const textElement = document.getElementById('quiz-content');

    // Biến kiểm tra trạng thái chọn văn bản
    let isSelecting = false;  
    let selectionRange = null;

    // Khi người dùng bắt đầu chọn văn bản
    textElement.addEventListener('mousedown', (event) => {
        isSelecting = true;
        const selection = window.getSelection();
        selection.removeAllRanges();  // Xóa tất cả các vùng đã chọn trước đó
        selectionRange = null;  // Reset phạm vi chọn
    });

    // Khi người dùng kết thúc chọn văn bản
    textElement.addEventListener('mouseup', (event) => {
        if (isSelecting) {
            const selection = window.getSelection();
            selectionRange = selection.getRangeAt(0);  // Lấy phạm vi văn bản đã chọn
            showFlyoutMenuOnText(event);  // Hiển thị menu flyout (hoặc control)
        }
        isSelecting = false;
    });

    // Hàm để highlight văn bản đã chọn
    function highlightSelectedText() {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        // Kiểm tra nếu có văn bản được chọn và có văn bản đã highlight trước đó
        if (selectedText) {
            const range = selection.getRangeAt(0);  

            // Tạo phần tử span bao bọc văn bản đã chọn
            const span = document.createElement('span');
            span.classList.add('highlighted');
            span.textContent = selectedText;

            span.addEventListener('click', (event) => {
                showFlyoutMenuOnHighlightedText(event, span); 
            });
    
            // Xóa nội dung đã chọn và chèn phần tử span vào
            range.deleteContents();  
            range.insertNode(span); 
    
            // Deselect vùng chọn sau khi highlight
            selection.removeAllRanges();
        }
    }

    // Hàm hiển thị menu flyout (hoặc control) khi người dùng chọn văn bản
    function showFlyoutMenuOnText(event) {
        const selection = window.getSelection();
        const selectedText = selection.toString();

        if (selectedText) {
            // Tạo một menu flyout (hoặc control) để người dùng quyết định có highlight hay không
            const flyout = document.createElement('div');
            flyout.id = 'flyout-menu-unhighlighted-text';
            flyout.classList.add('flyout-menu');
            flyout.style.position = 'absolute';
            flyout.style.left = `${event.pageX}px`;
            flyout.style.top = `${event.pageY}px`;

            // Thêm các tùy chọn vào menu
            const highlightOption = document.createElement('button');
            highlightOption.textContent = 'Highlight';
            highlightOption.onclick = () => {
                highlightSelectedText();  
                document.body.removeChild(flyout); 
            };

            flyout.appendChild(highlightOption);
            document.body.appendChild(flyout);
        }
    }
}

function showFlyoutMenuOnHighlightedText(event, targetSpan) {
    const existingFlyout = document.querySelector('.flyout-menu');
    if (existingFlyout) {
        existingFlyout.remove();
    }

    const flyout = document.createElement('div');
    flyout.id = 'flyout-menu-highlighted-text';
    flyout.classList.add('flyout-menu');
    flyout.style.position = 'absolute';
    flyout.style.left = `${event.pageX}px`;
    flyout.style.top = `${event.pageY}px`;
    flyout.addEventListener("focusout",flyout.remove());

    if (targetSpan) {
        const removeHighlightOption = document.createElement('button');
        removeHighlightOption.textContent = 'Xóa Highlight';
        removeHighlightOption.onclick = () => {
            const parent = targetSpan.parentNode;
            parent.replaceChild(document.createTextNode(targetSpan.textContent), targetSpan);
            flyout.remove();
        };
        flyout.appendChild(removeHighlightOption);
    }

    const removeAllHighlightsOption = document.createElement('button');
    removeAllHighlightsOption.textContent = 'Xóa tất cả Highlights';
    removeAllHighlightsOption.onclick = () => {
        removeAllHighlights();
        flyout.remove();
    };
    flyout.appendChild(removeAllHighlightsOption);

    document.body.appendChild(flyout);
}

function removeAllHighlights() {
    const textElement = document.getElementById('quiz-content');

    const highlightedElements = textElement.querySelectorAll('span.highlighted');

    highlightedElements.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
    });
}
// Chức năng Highlight Text - End


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
    loadButtonQuestion(quiz);

    const quizTitle = document.getElementById('quiz-title');
    quizTitle.innerHTML = quiz.title;

    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = quiz.content;
    HighlightText();
    //makeWordsClickable(quizContent);

    const container = document.getElementById('question-area');
    container.innerHTML = ''; // Clear previous UI
    let uiElement = ``;
    quiz.parts.forEach(part =>{
        const partUI = loadPart(part);
        uiElement += partUI;
    });
    container.innerHTML = uiElement;
}

function loadPart(part){
    let uiElement = `<div class="part-container">`;
    part.questions.forEach(question => {
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

// Xử lý sự kiện like hoặc dislike trên vocab offcanvas
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.feedback-icon'); // Đảm bảo chọn đúng class

    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            const isCheck = icon.getAttribute('data-ischeck') === 'true';  // Kiểm tra trạng thái hiện tại

            if (isCheck) {
                // Nếu đang ở trạng thái checked (fas), chuyển sang unchecked (far)
                icon.setAttribute('data-ischeck', 'false');
                icon.classList.remove('fas');
                icon.classList.add('far');
            } else {
                // Nếu chưa checked (far), reset tất cả icon về trạng thái far
                icons.forEach(function(otherIcon) {
                    otherIcon.setAttribute('data-ischeck', 'false');
                    otherIcon.classList.remove('fas');
                    otherIcon.classList.add('far');
                });

                // Chuyển icon đang click thành checked (fas)
                icon.setAttribute('data-ischeck', 'true');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    });
});


window.onload = function() {
    loadQuiz(quiz);
};

