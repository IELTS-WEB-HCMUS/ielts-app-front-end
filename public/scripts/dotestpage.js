class Question {
    constructor(id, order, type, content, options = [], answer, explain, description = null) {
        this.id = id
        this.order = order;
        this.type = type; // Loại câu hỏi: 'SINGLE-SELECTION', 'SINGLE-RADIO', 'FILL-IN-THE-BLANK'
        this.content = content; // Nội dung chi tiết của câu hỏi
        this.options = options; // Danh sách các lựa chọn (dành cho các câu hỏi có lựa chọn)
        this.answer = answer; // Đáp án 
        this.explain = explain; // Lưu giải thích cho đáp án
        this.description = description; // Lưu hướng dẫn cách làm của dạng câu hỏi (có thể có giá trị hoặc null)
    }

    checkAnswer(userAnswer) {
        if (this.type === 'SINGLE-SELECTION' || this.type === 'SINGLE-RADIO') {
            return userAnswer === this.answer;
        } else if (this.type === 'FILL-IN-THE-BLANK') {
            return userAnswer.trim().toLowerCase() === this.answer.trim().toLowerCase();
        } else {
            throw new Error(`Unsupported question type: ${this.type}`);
        }
    }
}

class Part{
    constructor(id, questions = []){
        this.id = id;
        this.questions = questions;
    }
}

class Quiz {
    constructor(id, type, content, title, time, parts = [], is_test){
        this.id = id;
        this.type = type; // Listening(2) hay reading(1)
        this.content = content; // Nội dung bài đọc với reading full test
        this.title = title; // Tiêu đề của quiz
        this.time = time * 60; //Thời gian giới hạn của quiz (tính bằng phút)
        this.parts = parts;
        this.is_test = is_test;
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


let question1 = new Question(
    10001,  // Thêm id
    1, 
    'SINGLE-SELECTION', 
    'What is the capital of France?', 
    ['Berlin', 'Madrid', 'Paris', 'Rome'], 
    'Paris', 
    'Paris is the capital city of France.',
    '<h3><strong>Questions 1 - 5:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>'
);

let question2 = new Question(
    10002,  // Thêm id
    2, 
    'SINGLE-RADIO',  
    'Which of the following are programming languages?', 
    ['JavaScript', 'HTML', 'CSS', 'Python'], 
    'JavaScript',  
    'JavaScript and Python are programming languages.'
);

let question3 = new Question(
    10003,  // Thêm id
    3, 
    'FILL-IN-THE-BLANK', 
    'The chemical symbol for water is ____.', 
    [], 
    'H2O', 
    'H2O is the chemical formula for water.'
);

let question4 = new Question(
    10004,  // Thêm id
    4, 
    'SINGLE-RADIO', 
    'Which of the following is the largest planet in our solar system?', 
    ['Earth', 'Jupiter', 'Saturn', 'Mars'], 
    'Jupiter', 
    'Jupiter is the largest planet in our solar system.'
);

let question5 = new Question(
    10005,  // Thêm id
    5, 
    'SINGLE-RADIO',  
    'Which planets are gas giants?', 
    ['Mercury', 'Venus', 'Jupiter', 'Saturn'], 
    'Jupiter',  
    'Jupiter and Saturn are gas giants.'
);

let question6 = new Question(
    10006,  // Thêm id
    6, 
    'FILL-IN-THE-BLANK', 
    'The sun is a type of ____.', 
    [], 
    'star', 
    'The sun is a star.',
    '<h3><strong>Questions 6 - 9:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>'
);

let question7 = new Question(
    10007,  // Thêm id
    7, 
    'SINGLE-SELECTION', 
    'What is the tallest mountain in the world?', 
    ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'], 
    'Mount Everest', 
    'Mount Everest is the tallest mountain in the world.'
);

let question8 = new Question(
    10008,  // Thêm id
    8, 
    'SINGLE-RADIO', 
    'Which ocean is the largest?', 
    ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], 
    'Pacific Ocean', 
    'The Pacific Ocean is the largest ocean on Earth.'
);

let question9 = new Question(
    10009,  // Thêm id
    9, 
    'SINGLE-RADIO',  
    'Which animals are mammals?', 
    ['Dog', 'Fish', 'Lion', 'Shark'], 
    'Dog',  
    'Dog and Lion are mammals.'
);

// Tạo các phần (Part) với id
let part1 = new Part(
    2001,  // Thêm id
    [question1, question2, question3]
);

let part2 = new Part(
    2002,  // Thêm id
    [question4, question5, question6]
);

let part3 = new Part(
    2003,  // Thêm id
    [question7, question8, question9]
);

// Tạo quiz với id
let quiz = new Quiz(
    3001,  // Thêm id
    'reading', 
    'Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra euismod neque euismod vehicula venenatis faucibus scelerisque potenti vehicula. Maximus magna mollis elit molestie; tempor blandit pretium fames. Sem praesent dictumst dolor cubilia integer hac. Vivamus curabitur in rhoncus bibendum lacinia varius netus. Fames efficitur curae semper etiam ante. Interdum luctus nisl per sodales viverra gravida. Erat euismod iaculis non mi diam. Hac tempus volutpat urna convallis, placerat eget hac ante fringilla. Vulputate justo enim feugiat nunc sed vel. Aenean primis praesent eleifend adipiscing sem. Convallis non ipsum rutrum dignissim ornare aenean integer venenatis senectus. Mollis pharetra sapien sociosqu natoque felis; eu ultrices potenti netus. Eros tellus turpis eget nibh ornare sollicitudin. Per dignissim elit suspendisse magna posuere hendrerit proin inceptos. Tortor malesuada amet iaculis tortor gravida. Elementum bibendum conubia luctus laoreet dis congue augue parturient. Donec sem class imperdiet eu quis litora montes leo donec. Ultrices dignissim aenean iaculis gravida eget congue! Pharetra ridiculus lectus finibus parturient ut.', 
    'General Knowledge Quiz', 
    30, // 30 phút
    [part1, part2, part3],
    true
);

// Chức năng tra từ - Start
function showWordIndex(index, word) {
    alert(`The word "${word}" is at index ${index} in the paragraph.`);
}

function makeWordsClickable(paragraph) {
    // Get the text content and split into sentences
    const text = paragraph.textContent.trim();
    const sentenceRegex = /[^.!?]+[.!?]/g; // Match sentences ending with . ! or ?
    const sentences = text.match(sentenceRegex) || [text]; // Fallback to the full text if no match

    // Process each sentence
    const clickableSentences = sentences.map((sentence, sentenceIndex) => {
      const words = sentence.trim().split(/\s+/); // Split sentence into words by spaces
      let validWordIndex = 0; // Track valid words only

      const clickableWords = words.map((word) => {
        // Remove extra punctuation (except for valid alphanumeric words)
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');

        // Ignore empty results or single dashes
        if (cleanWord === '') {
          return word; // Return unmodified (e.g., punctuation stays unclickable)
        }

        // Valid word: Make it clickable and increment index
        const wordHTML = `<a href="#" class="vocab-word" data-bs-target="#vocab-offcanvasBottom"
        onclick="handleWordClick(this,${sentenceIndex}, ${validWordIndex}, '${cleanWord}')">${word}</a>`;
        validWordIndex++;
        return wordHTML;
      });

      return `<span class="sentence">${clickableWords.join(' ')}</span>`;
    });

    // Update the paragraph content
    paragraph.innerHTML = clickableSentences.join(' ');
}

function handleWordClick(element, sentenceIndex, wordIndex, word) {
    removeUnderlineWord();
    element.classList.add('active');

    const offcanvas = document.getElementById('vocab-offcanvasBottom');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    showWordDefinition(sentenceIndex, wordIndex, word);
    bsOffcanvas.show();
}

function removeUnderlineWord(){
    const activeWords = document.querySelectorAll('.vocab-word.active');
    activeWords.forEach(word => word.classList.remove('active')); 
}


function showWordDefinition(sentenceIndex, wordIndex, word) {
    // Thay đổi nội dung với từ được nhấn
    const vocab = new Vocab(
        'run',                  // value
        'verb',                 // word_class
        'to move swiftly on foot', // meaning
        '/rʌn/',                // ipa (International Phonetic Alphabet)
        'I run every morning.', // example
        'run + object',         // verb_structure
        'Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra euismod neque euismod vehicula venenatis faucibus scelerisque potenti vehicula. Maximus magna mollis elit molestie; tempor blandit pretium fames. Sem praesent dictumst dolor cubilia integer hac. Vivamus curabitur in rhoncus bibendum lacinia varius netus. Fames efficitur curae semper etiam ante. Interdum luctus nisl per sodales viverra gravida. Erat euismod iaculis non mi diam. Hac tempus volutpat urna convallis, placerat eget hac ante fringilla. Vulputate justo enim feugiat nunc sed vel. Aenean primis praesent eleifend adipiscing sem. Convallis non ipsum rutrum dignissim ornare aenean integer venenatis senectus. Mollis pharetra sapien sociosqu natoque felis; eu ultrices potenti netus. Eros tellus turpis eget nibh ornare sollicitudin. Per dignissim elit suspendisse magna posuere hendrerit proin inceptos. Tortor malesuada amet iaculis tortor gravida. Elementum bibendum conubia luctus laoreet dis congue augue parturient. Donec sem class imperdiet eu quis litora montes leo donec. Ultrices dignissim aenean iaculis gravida eget congue! Pharetra ridiculus lectus finibus parturient ut.' // explanation
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
    const textElement = document.getElementById('quiz-content-highlight');

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
    
        if (selectedText) {
            const range = selection.getRangeAt(0);
            const parentElement = range.commonAncestorContainer;
    
            // Duyệt qua các phần tử cha để tìm <p id="quiz-content-highlight">
            let paragraphElement = parentElement;
            while (paragraphElement && paragraphElement.tagName !== 'P') {
                paragraphElement = paragraphElement.parentElement;
            }
    
            if (paragraphElement && paragraphElement.id === 'quiz-content-highlight') {
                // Tạo một <span> bao bọc văn bản đã chọn
                const span = document.createElement('span');
                span.classList.add('highlighted');
                span.textContent = selectedText;
    
                // Thêm sự kiện click vào <span> đã tạo
                span.addEventListener('click', (event) => {
                    showFlyoutMenuOnHighlightedText(event, span);
                });
    
                // Kiểm tra xem vùng chọn có bao trùm toàn bộ nội dung trong <p> không
                const paragraphRange = document.createRange();
                paragraphRange.selectNodeContents(paragraphElement);
    
                if (
                    range.compareBoundaryPoints(Range.START_TO_START, paragraphRange) === 0 &&
                    range.compareBoundaryPoints(Range.END_TO_END, paragraphRange) === 0
                ) {
                    // Nếu vùng chọn bao phủ toàn bộ nội dung, chỉ cần highlight toàn bộ văn bản
                    const existingContent = paragraphElement.innerHTML; // Lưu lại nội dung cũ
                    paragraphElement.innerHTML = ''; // Xóa nội dung cũ
                    span.innerHTML = existingContent; // Chèn toàn bộ nội dung vào trong <span>
                    paragraphElement.appendChild(span); // Thêm <span> vào <p>
                } else {
                    // Highlight phần văn bản được chọn
                    range.deleteContents(); 
                    range.insertNode(span); 
                }
    
                // Xóa vùng chọn sau khi highlight
                selection.removeAllRanges();
            }
        }
    }
    

    // Hàm hiển thị menu flyout (hoặc control) khi người dùng chọn văn bản
    function showFlyoutMenuOnText(event) {
        const existingFlyout = document.querySelector('.flyout-menu');
        if (existingFlyout) {
            existingFlyout.remove();
        }
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
    const textElement = document.getElementById('quiz-content-highlight');

    const highlightedElements = textElement.querySelectorAll('span.highlighted');

    highlightedElements.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
    });
}

function closeAllFlyouts() {
    const flyouts = document.querySelectorAll('.flyout-menu');
    flyouts.forEach(flyout => {
        flyout.style.display = "none";  // Hide all flyouts
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
                    <select class="custom-dropdown" onchange="checkAnswered(${question.order}, ${question.id})">
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
                            <input type="radio" name="question-${question.order}" value="${option}" id="option-${question.order}-${option}" onchange="checkAnswered(${question.order}, ${question.id})">
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
                    ${question.content.replace(/_+/g, '<input type="text" class="input-answer" data-question-id="' + question.order + '" oninput="checkAnswered(' + question.order + ' ,' + question.id + ')">')}
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
        totalQuestion += part.questions.length;
    });

    const container = document.getElementById('question-buttons');
    container.innerHTML = ''; 
    let uiElement = ``;

    for (let order = 1; order <= totalQuestion; order++) {
        uiElement += `
            <button class="button-question" data-question-order="${order}">${order}</button>
        `;
    }

    container.innerHTML = uiElement; 
}

const userAnswers = {}; // Đối tượng lưu câu trả lời của người dùng cần truyền vào api để submit

function checkAnswered(questionOrder, question_id) {
    const question = document.getElementById(`question-${questionOrder}`);
    const inputs = question.querySelectorAll('input, select'); 

    let isAnswered = false;
    let answer = null;

    inputs.forEach(input => {
        if (input.type === 'radio' && input.checked) {
            isAnswered = true;
            answer = input.value;
        }

        if (input.type === 'text' && input.value.trim() !== '') {
            isAnswered = true;
            answer = input.value.trim();
        }

        if (input.tagName.toLowerCase() === 'select' && input.value !== '') {
            isAnswered = true;
            answer = input.value;
        }
    });

    if (isAnswered) {
        userAnswers[question_id] = answer; // Ghi nhận câu trả lời
    } else {
        delete userAnswers[question_id]; // Xóa nếu câu trả lời không hợp lệ hoặc bị xóa
    }

    const button = document.querySelector(`button[data-question-order="${questionOrder}"]`);
    if (button) {
        if (isAnswered) {
            button.classList.add('answered'); 
        } else {
            button.classList.remove('answered'); 
        }
    }
}

function loadQuiz(quiz){
    const quizType = document.getElementById('quiz-type-label');
    const strQuizType = quiz.type === 1 ? "Reading" : "Listening";
    quizType.innerHTML = `MePass - ${strQuizType} Practice`;
    startCountdown(quiz); 
    loadButtonQuestion(quiz);

    const quizTitle = document.getElementById('quiz-title');
    quizTitle.innerHTML = quiz.title;

    const quizContentHighlight = document.getElementById('quiz-content-highlight');
    quizContentHighlight.innerHTML = quiz.content;
    const quizContentVocab = document.getElementById('quiz-content-vocab');
    quizContentVocab.innerHTML = quiz.content;

    const container = document.getElementById('question-area');
    container.innerHTML = ''; // Clear previous UI
    let uiElement = ``;
    quiz.parts.forEach(part =>{
        const partUI = loadPart(part);
        uiElement += partUI;
    });
    container.innerHTML = uiElement;
}



// Biến này sẽ chứa giá trị thời gian hoàn thành bài test khi người dùng bấm submit (để tính toán thời gian còn lại)
let completion_Time = 0;
// Xử lý sự kiện like hoặc dislike trên vocab offcanvas
document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.feedback-icon'); 

    icons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            const isCheck = icon.getAttribute('data-ischeck') === 'true';  

            if (isCheck) {
                icon.setAttribute('data-ischeck', 'false');
                icon.classList.remove('fas');
                icon.classList.add('far');
            } else {
                icons.forEach(function(otherIcon) {
                    otherIcon.setAttribute('data-ischeck', 'false');
                    otherIcon.classList.remove('fas');
                    otherIcon.classList.add('far');
                });

                icon.setAttribute('data-ischeck', 'true');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    });

    document.getElementById('flyout-menu-highlight-text').onpointerleave = this.remove();
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn_submit_test').addEventListener('click', function() {
        completion_Time = (() => {
            const [minutes, seconds] = document.getElementById('timer').textContent.split(':').map(Number);
            return (minutes * 60) + seconds;
        })();
        const result = getAnswered(quiz,userAnswers); // Khi bấm nút Nộp bài thì gọi hàm logic này để submit gửi api result
        // Test
        // document.getElementById('getResult').textContent = JSON.stringify(result, null, 2);
    });
});



// Hàm logic kiểm tra kết quả đúng sai để gửi api, hàm này được gọi trong checkAnswered
function getAnswered(quiz, userAnswers) {
        // Initializing the result structure
        parts = quiz.parts;
        const result = {
            question: [],
            dictionary: {},
            quiz: {
                id: quiz.id,
                type: quiz.type,
                completed_duration: completion_Time,
                summary: {
                    correct: 0,
                    total: 0,
                    left_time: 0,
                },
            },
        };
    
        let totalQuestions = 0;
        let totalCorrect = 0;
    
        // Iterate over parts
        parts.forEach((part, partIndex) => {
            const partKey = partIndex.toString();
            result.dictionary[partKey] = []; 
    
            part.questions.forEach((question) => {
                const userAnswer = userAnswers[question.id] || ""; 
                const isCorrect = question.checkAnswer(userAnswer); 
    
                // Update total counts
                totalQuestions++;
                if (isCorrect) totalCorrect++;
    
                // Add question to submit list
                result.question.push({
                    id: question.id,
                    success_count: isCorrect ? 1 : 0,
                    total: 1,
                });
    
                // Add question details to dictionary
                result.dictionary[partKey].push({
                    title: {
                        text: question.content,
                        answer: userAnswer,
                    },
                    correct: isCorrect,
                    order: question.order,
                    type: question.type,
                    id_question: question.id,
                });
            });
        });
    
        // Update summary
        result.quiz.summary.correct = totalCorrect;
        result.quiz.summary.total = totalQuestions;
        result.quiz.summary.left_time = completion_Time; // Assuming no time used
    
        return result;
}
    

window.onload = function() {
    loadQuiz(quiz);
    HighlightText();
};

