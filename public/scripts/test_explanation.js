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
        this.time = time * 60; //Thời gian giới hạn của quiz (tính bằng phút) *60 để đổi ra giây
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
    10001,  
    1, 
    'SINGLE-SELECTION', 
    'What is the capital of France?', 
    ['Berlin', 'Madrid', 'Paris', 'Rome'], 
    'Paris', 
    'Paris is the capital city of France.',
    '<h3><strong>Questions 1 - 5:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>'
);

let question2 = new Question(
    10002,  
    2, 
    'SINGLE-RADIO',  
    'Which of the following are programming languages?', 
    ['JavaScript', 'HTML', 'CSS', 'Python'], 
    'JavaScript',  
    'JavaScript and Python are programming languages.'
);

let question3 = new Question(
    10003,  
    3, 
    'FILL-IN-THE-BLANK', 
    'The chemical symbol for water is ____.', 
    [], 
    'H2O', 
    'H2O is the chemical formula for water.'
);

let question4 = new Question(
    10004,  
    4, 
    'SINGLE-RADIO', 
    'Which of the following is the largest planet in our solar system?', 
    ['Earth', 'Jupiter', 'Saturn', 'Mars'], 
    'Jupiter', 
    'Jupiter is the largest planet in our solar system.'
);

let question5 = new Question(
    10005,  
    5, 
    'SINGLE-RADIO',  
    'Which planets are gas giants?', 
    ['Mercury', 'Venus', 'Jupiter', 'Saturn'], 
    'Jupiter',  
    'Jupiter and Saturn are gas giants.'
);

let question6 = new Question(
    10006,  
    6, 
    'FILL-IN-THE-BLANK', 
    'The sun is a type of ____.', 
    [], 
    'star', 
    'The sun is a star.',
    '<h3><strong>Questions 6 - 9:</strong></h3> <p>Complete the table below. Choose ONE WORD ONLY from the: passage for each answer. Write your answers in boxes 1-4 on your answer sheet.</p>'
);

let question7 = new Question(
    10007,  
    7, 
    'SINGLE-SELECTION', 
    'What is the tallest mountain in the world?', 
    ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'], 
    'Mount Everest', 
    'Mount Everest is the tallest mountain in the world.'
);

let question8 = new Question(
    10008,  
    8, 
    'SINGLE-RADIO', 
    'Which ocean is the largest?', 
    ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], 
    'Pacific Ocean', 
    'The Pacific Ocean is the largest ocean on Earth.'
);

let question9 = new Question(
    10009,  
    9, 
    'SINGLE-RADIO',  
    'Which animals are mammals?', 
    ['Dog', 'Fish', 'Lion', 'Shark'], 
    'Dog',  
    'Dog and Lion are mammals.'
);

// Tạo các phần (Part) với id
let part1 = new Part(
    2001,  
    [question1, question2, question3]
);

let part2 = new Part(
    2002,  
    [question4, question5, question6]
);

let part3 = new Part(
    2003,  
    [question7, question8, question9]
);

// Tạo quiz với id
let quiz = new Quiz(
    3001,  
    1, 
    'Jean-Antoine Nollet was a French clergyman and physicist. In 1746 he gathered about two hundred monks into a circle about a mile (1.6 km) in circumference, with pieces of iron wire connecting them. He then discharged a battery of Leyden jars through the human chain and observed that each man reacted at substantially the same time to the electric shock, showing that the speed of electricity’s propagation was very high. Given a more humane detection system, this could be a way of signaling over long distances. In 1748, Nollet invented one of the first electrometers, the electroscope, which detected the presence of an electric charge by using electrostatic attraction and repulsion.<br>After the introduction of the European semaphore lines in 1792, the world’s desire to further its ability to communicate from a distance only grew. People wanted a way to send and receive news from remote locations so that they could better understand what was happening in the world around them - not just what was going on in their immediate town or city. This type of communication not only appealed to the media industry, but also to private individuals and companies who wished to stay in touch with contacts. In 1840 Charles Wheatstone from Britain, with William Cooke, obtained a new patent for a telegraphic arrangement. The new apparatus required only a single pair of wires, but the telegraph was still too costly for general purposes. In 1845, however, Cooke and Wheatstone succeeded in producing the single needle apparatus, which they patented, and from that time the electric telegraph became a practical instrument, soon adopted on all the railway lines of the country.<br>It was the European optical telegraph, or semaphore, that was the predecessor of the electrical recording telegraph that changed the history of communication forever. Building on the success of the optical telegraph, Samuel F. B. Morse completed a working version of the electrical recording telegraph, which only required a single wire to send code of dots and dashes. At first, it was imagined that only a few highly skilled encoders would be able to use it but it soon became clear that many people could become proficient in Morse code. A system of lines strung on telegraph poles began to spread in Europe and America.<br>In the 1840s and 1850s several individuals proposed or advocated construction of a telegraph cable across the Atlantic Ocean, including Edward Thornton and Alonzo Jackman. At that time there was no material available for cable insulation and the first breakthrough came with the discovery of a rubber-like latex called gutta-percha. Introduced to Britain in 1843, gutta-percha is the gum of a tree native to the Malay Peninsula and Malaysia. After the failure of their first cable in 1850, the British brothers John and Jacob Brett laid a successful submarine cable from Dover to Calais in 1851. This used two layers of gutta-percha insulation and an armoured outer layer. With thin wire and thick insulation, it floated and had to be weighed down with lead pipe.<br>In the case of first submarine-cable telegraphy, there was the limitation of knowledge of how its electrical properties were affected by water. The voltage which may be impressed on the cable was limited to a definite value. Moreover, for certain reasons, the cable had an impedance associated with it at the sending end which could make the voltage on the cable differ from the voltage applied to the sending-end apparatus. In fact, the cable was too big for a single boat, so two had to start in the middle of the Atlantic, join their cables and sail in opposite directions. Amazingly, the first official telegram to pass between two continents was a letter of congratulation from Queen Victoria of the United Kingdom to the President of the United States, James Buchanan, on August 16, 1858. However, signal quality declined rapidly, slowing transmission to an almost unusable speed and the cable was destroyed the following month.<br>To complete the link between England and Australia, John Pender formed the British-Australian Telegraph Company. The first stage was to lay a 557nm cable from Singapore to Batavia on the island of Java in 1870. It seemed likely that it would come ashore at the northern port of Darwin from where it might connect around the coast to Queensland and New South Wales. It was an undertaking more ambitious than spanning ocean. Flocks of sheep had to be driven with the 400 workers to provide food. They needed horses and bullock carts and, for the parched interior, camels. In the north, tropical rains left the teams flooded. In the centre, it seemed that they would die of thirst. One critical section in the red heart of Australia involved finding a route through the McDonnell mountain range and then finding water on the other side. The water was not only essential for the construction teams. There had to be telegraph repeater stations every few hundred miles to boost the signal and the staff obviously had to have a supply of water.<br>On August 22, 1872, the Northern and Southern sections of the Overland Telegraph Line were connected, uniting the Australian continent and within a few months, Australia was at last in direct contact with England via the submarine cable, too. This allowed the Australian Government to receive news from around the world almost instantaneously for the first time. It could cost several pounds to send a message and it might take several hours for it to reach its destination on the other side of the globe, but the world would never be the same again. The telegraph was the first form of communication over a great distance and was a landmark in human history.', 
    'General Knowledge Quiz', 
    30, // 30 phút
    [part1, part2, part3],
    true
);


// Chỉ cần lấy ra tất cả answer của bài quiz là có thể hiển thị giao diện các answer này là của tất cả các part
let answers = [
    new Answer(
        'What is the capital of France?',  
        'Paris',  
        true,  
        1,  
        'SINGLE-SELECTION',  
        10001 
    ),
    new Answer(
        'Which of the following are programming languages?',  
        'HTML',  
        false,  
        2,  
        'SINGLE-RADIO',  
        10002
    ),
    new Answer(
        'The chemical symbol for water is ____.',
        'ytr',
        false,
        3,
        'FILL-IN-THE-BLANK',
        10003
    ),
    new Answer(
        'Which of the following is the largest planet in our solar system?',
        'Jupiter',
        true,
        4,
        'SINGLE-RADIO',
        10004
    ),
    new Answer(
        'Which planets are gas giants?',
        'Jupiter',
        true,  
        5,
        'SINGLE-RADIO',
        10005
    ),

    new Answer(
        'What is the tallest mountain in the world?',
        'Mount Everest',
        true,
        7,
        'SINGLE-SELECTION',
        10007
    ),
    new Answer(
        'Which ocean is the largest?',
        'Pacific Ocean',
        true,
        8,
        'SINGLE-RADIO',
        10008
    ),
    new Answer(
        'Which animals are mammals?',
        'Dog',
        true,
        9,
        'SINGLE-RADIO',
        10009
    )
];

let answer_part1 = new AnswerPart(0, []);
let answer_part2 = new AnswerPart(1, []);

let answer_quiz = new AnswerQuiz(1001, 1, 120, [part1, part2], {
    correct: 3,
    total: 3,
    left_time: 45
});


function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = seconds % 60; 

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function loadPart(part, answers){
    let uiElement = `<div class="part-container">`;
    part.questions.forEach(question => {
        if (question.description) {
            uiElement += question.description; 
        }
        const questionUI = loadQuestion(question, answers); 
        uiElement += questionUI; 
    });
    uiElement += '</div>';
    return uiElement
}

function loadQuestion(question, answers) {
    const answerObj = answers.find(a => a.id_question === question.id);
    let Color = 'red'; 
    let answer = ''; 

    if (answerObj) {
        answer = answerObj.answer; 
        Color = answerObj.correct ? 'green' : 'red'; 
    }

    let uiElement = `<div class="question-container" id="question-${question.order}" style="margin: 3% 0%;">`;

    switch (question.type) {
        case 'SINGLE-SELECTION':
            uiElement += `
                <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                    <div class="question-order-number" style="margin: 2%">${question.order}</div>
                    <select class="custom-dropdown" style="background-color: ${Color}; color: white;" disabled>
                        <option value="${answer}" selected disabled>${answer}</option> 
                    </select>
                    <p style="margin: 2%; align-items: center;">${question.content}</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <div class="rectangle" id="answer-${question.id}" style="margin-left: 2%;">Đáp án: ${question.answer}</div>
                    <button id="btn_explanation-${question.id}" class="btn-explain" onclick="toggleExplanation(${question.id})">Giải thích</button>
                </div>
                <div class="explain-box" id="explanation-${question.id}" style="display: none; margin-left: 2%; margin-top: 2%">
                    ${question.explain}
                </div>
            `;
            break;

        case 'SINGLE-RADIO':
            uiElement += `
            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 2%">
                <div style="display: flex; flex-direction: row; align-items: flex-start; width: 100%; align-items: center;">
                    <div class="question-order-number" style="; margin-right: 2%; margin-top: 1%; align-self: flex-start;">${question.order}</div>
                    <p style="margin-top: 1%">${question.content}</p>
                </div>
                <div style="display: flex; flex-direction: column; width: 100%; margin: 0% 2%;">
                    ${question.options.map((option,index) => `
                                <div class="option" style="display: flex; align-items: center;">
                                    <div class="question-order-number" style="margin-left: 2%; margin-right: 2%; align-items: center; font-size: 1em">
                                        ${String.fromCharCode(65 + index)}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="question-${question.order}" 
                                        value="${option}" 
                                        id="option-${question.order}-${option}" 
                                        class="${answer === option ? (answerObj.correct ? 'correct' : 'incorrect') : ''}"
                                        ${answer === option ? 'checked' : ''}
                                        disabled>
                                    <label for="option-${question.order}-${option}"
                                    style="color: ${answerObj && answer === option ? Color : ''}">${option}</label>
                                </div>
                        `).join('')}
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                    <div class="rectangle" id="answer-${question.id}">Đáp án: ${String.fromCharCode(65 + question.options.indexOf(question.answer))}</div>
                    <button id="btn_explanation-${question.id}" class="btn-explain" onclick="toggleExplanation(${question.id})">Giải thích</button>
                </div>
                <div class="explain-box" id="explanation-${question.id}" style="display: none; margin-top: 2%; width: 100%;">
                    ${question.explain}
                </div>
            </div>
            `;
            break;

        case 'FILL-IN-THE-BLANK':
            uiElement += `
            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 2%">
                <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                    <div class="question-order-number" style="margin-right: 2%;">${question.order}</div>
                    <p style="font-size: 1rem; line-height: 1.5;">
                        ${question.content.replace(/_+/g, `
                            <input type="text" 
                                class="input-answer" 
                                data-question-id="' + question.order + '" 
                                value="${answer}"
                                style="${answer ? `color: ${Color};` : ''}"
                                disabled>
                                `)}
                    </p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
                    <div class="rectangle" id="answer-${question.id}">Đáp án: ${question.answer}</div>
                    <button id="btn_explanation-${question.id}" class="btn-explain" onclick="toggleExplanation(${question.id})">Giải thích</button>
                </div>
                <div class="explain-box" id="explanation-${question.id}" style="display: none; margin-top: 2%; width: 100%;">
                    ${question.explain}
                </div>
            </div>
            `;
            break;

        default:
            uiElement += '<p>Invalid question type.</p>';
    }

    uiElement += '</div>'; 
    return uiElement;
}

function toggleExplanation(questionId) {
    const explanationElement = document.getElementById(`explanation-${questionId}`);
    if (explanationElement.style.display === 'none') {
        explanationElement.style.display = 'block';
    } else {
        explanationElement.style.display = 'none'; 
    }
}

function loadButtonQuestion(quiz, answers) {
    let totalQuestion = 0;
    quiz.parts.forEach(part => {
        totalQuestion += part.questions.length;
    });

    const container = document.getElementById('question-buttons');
    container.innerHTML = ''; 
    let uiElement = ``;

    for (let order = 1; order <= totalQuestion; order++) {
        const answerObj = answers.find(answer => answer.order_question === order);
        let backgroundColor = '';
        let color = 'black';
        if (answerObj) {
            backgroundColor = answerObj.correct ? 'green' : 'red';
            color = 'white';
        }

        uiElement += `
            <button 
                class="button-question" 
                data-question-order="${order}" 
                style="background-color: ${backgroundColor}; color: ${color}">
                ${order}
            </button>
        `;
    }

    container.innerHTML = uiElement; 
}


function loadQuiz(quiz, answer_quiz,answers){
    const quizType = document.getElementById('quiz-type-label');
    const strQuizType = quiz.type === 1 ? "Reading" : "Listening";
    quizType.innerHTML = `MePass - ${strQuizType} Practice`;

    const timerElement = document.getElementById("timer");
    timerElement.textContent = convertSecondsToMinutes(quiz.time - answer_quiz.completed_duration);
    loadButtonQuestion(quiz, answers);

    const quizTitle = document.getElementById('quiz-title');
    quizTitle.innerHTML = quiz.title;

    const content = quiz.content.split('<br>').join('<br><br>');
    const quizContentHighlight = document.getElementById('quiz-content-highlight');
    quizContentHighlight.innerHTML = content;

    const container = document.getElementById('question-area');
    container.innerHTML = ''; 
    let uiElement = ``;
    quiz.parts.forEach(part =>{
        const partUI = loadPart(part, answers);
        uiElement += partUI;
    });
    container.innerHTML = uiElement;
}

window.onload = function() {
    loadQuiz(quiz, answer_quiz, answers);
};