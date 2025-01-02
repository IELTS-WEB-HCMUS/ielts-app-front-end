async function fetchData() {
    const id = new URLSearchParams(window.location.search).get("id");
    const response = await fetch(`http://localhost:3000/user/dotest/detailquiz?id=${id}`);
    const data = await response.json();
    localStorage.setItem('quiz', JSON.stringify(data));
    localStorage.setItem('quiz_id', data.id);
    return JSON.stringify(data);
}

async function fetchSubmit(result) {
    const id = new URLSearchParams(window.location.search).get("id");
    const response = await fetch(`http://localhost:3000/user/dotest/submitquiz?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            result: result
        }),
    });
    const data = await response.json();
    console.log('Data returned from server:', data);
    if (data.data && data.data.id) {
        console.log('Storing to localStorage:', data.data.id);
        localStorage.setItem('answer_id', data.data.id);
    } else {
        console.error('data.data.id is invalid or missing');
    }

    return data;
}

async function fetchLookup(quiz_id, sentence_index, vocab_index, word) {
    const response = await fetch(`http://localhost:3000/user/dotest/lookup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quiz_id: quiz_id,
            sentence_index: sentence_index,
            vocab_index: vocab_index,
            word: word
        }),
    });
    console.log('response:', response);
    const data = await response.json();
    return JSON.stringify(data);
}

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

class Part {
    constructor(id, questions = []) {
        this.id = id;
        this.questions = questions;
    }
}

class Quiz {
    constructor(id, type, content, title, time, parts = [], is_test) {
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
    constructor(value, word_class, meaning, ipa, example, verb_structure, explanation) {
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
let _quiz = new Quiz(
    3001,
    1,
    'Jean-Antoine Nollet was a French clergyman and physicist. In 1746 he gathered about two hundred monks into a circle about a mile (1.6 km) in circumference, with pieces of iron wire connecting them. He then discharged a battery of Leyden jars through the human chain and observed that each man reacted at substantially the same time to the electric shock, showing that the speed of electricity’s propagation was very high. Given a more humane detection system, this could be a way of signaling over long distances. In 1748, Nollet invented one of the first electrometers, the electroscope, which detected the presence of an electric charge by using electrostatic attraction and repulsion.<br>After the introduction of the European semaphore lines in 1792, the world’s desire to further its ability to communicate from a distance only grew. People wanted a way to send and receive news from remote locations so that they could better understand what was happening in the world around them - not just what was going on in their immediate town or city. This type of communication not only appealed to the media industry, but also to private individuals and companies who wished to stay in touch with contacts. In 1840 Charles Wheatstone from Britain, with William Cooke, obtained a new patent for a telegraphic arrangement. The new apparatus required only a single pair of wires, but the telegraph was still too costly for general purposes. In 1845, however, Cooke and Wheatstone succeeded in producing the single needle apparatus, which they patented, and from that time the electric telegraph became a practical instrument, soon adopted on all the railway lines of the country.<br>It was the European optical telegraph, or semaphore, that was the predecessor of the electrical recording telegraph that changed the history of communication forever. Building on the success of the optical telegraph, Samuel F. B. Morse completed a working version of the electrical recording telegraph, which only required a single wire to send code of dots and dashes. At first, it was imagined that only a few highly skilled encoders would be able to use it but it soon became clear that many people could become proficient in Morse code. A system of lines strung on telegraph poles began to spread in Europe and America.<br>In the 1840s and 1850s several individuals proposed or advocated construction of a telegraph cable across the Atlantic Ocean, including Edward Thornton and Alonzo Jackman. At that time there was no material available for cable insulation and the first breakthrough came with the discovery of a rubber-like latex called gutta-percha. Introduced to Britain in 1843, gutta-percha is the gum of a tree native to the Malay Peninsula and Malaysia. After the failure of their first cable in 1850, the British brothers John and Jacob Brett laid a successful submarine cable from Dover to Calais in 1851. This used two layers of gutta-percha insulation and an armoured outer layer. With thin wire and thick insulation, it floated and had to be weighed down with lead pipe.<br>In the case of first submarine-cable telegraphy, there was the limitation of knowledge of how its electrical properties were affected by water. The voltage which may be impressed on the cable was limited to a definite value. Moreover, for certain reasons, the cable had an impedance associated with it at the sending end which could make the voltage on the cable differ from the voltage applied to the sending-end apparatus. In fact, the cable was too big for a single boat, so two had to start in the middle of the Atlantic, join their cables and sail in opposite directions. Amazingly, the first official telegram to pass between two continents was a letter of congratulation from Queen Victoria of the United Kingdom to the President of the United States, James Buchanan, on August 16, 1858. However, signal quality declined rapidly, slowing transmission to an almost unusable speed and the cable was destroyed the following month.<br>To complete the link between England and Australia, John Pender formed the British-Australian Telegraph Company. The first stage was to lay a 557nm cable from Singapore to Batavia on the island of Java in 1870. It seemed likely that it would come ashore at the northern port of Darwin from where it might connect around the coast to Queensland and New South Wales. It was an undertaking more ambitious than spanning ocean. Flocks of sheep had to be driven with the 400 workers to provide food. They needed horses and bullock carts and, for the parched interior, camels. In the north, tropical rains left the teams flooded. In the centre, it seemed that they would die of thirst. One critical section in the red heart of Australia involved finding a route through the McDonnell mountain range and then finding water on the other side. The water was not only essential for the construction teams. There had to be telegraph repeater stations every few hundred miles to boost the signal and the staff obviously had to have a supply of water.<br>On August 22, 1872, the Northern and Southern sections of the Overland Telegraph Line were connected, uniting the Australian continent and within a few months, Australia was at last in direct contact with England via the submarine cable, too. This allowed the Australian Government to receive news from around the world almost instantaneously for the first time. It could cost several pounds to send a message and it might take several hours for it to reach its destination on the other side of the globe, but the world would never be the same again. The telegraph was the first form of communication over a great distance and was a landmark in human history.',
    'General Knowledge Quiz',
    30, // 30 phút
    [part1, part2, part3],
    true
);

// Chức năng tra từ - Start
function showWordIndex(index, word) {
    alert(`The word "${word}" is at index ${index} in the paragraph.`);
}

function splitParagraphIntoSentences(paragraph) {
    const doc = nlp(paragraph);
    const sentences = doc.sentences().out('array');
    return sentences;
}

function preserveHyphenatedWords(sentence) {
    const hyphenatedWordRegex = /\b\w+(-\w+)+\b/g;

    const hyphenatedWords = sentence.match(hyphenatedWordRegex) || [];
    hyphenatedWords.forEach((word, index) => {
        sentence = sentence.replace(word, `_HYPO${index}_`);
    });

    return { sentence, hyphenatedWords };
}

function restoreHyphenatedWords(sentence, hyphenatedWords) {
    hyphenatedWords.forEach((word, index) => {
        sentence = sentence.replace(`_HYPO${index}_`, word);
    });
    return sentence;
}

function splitSentenceIntoWords(sentence) {
    const { sentence: modifiedSentence, hyphenatedWords } = preserveHyphenatedWords(sentence);

    const doc = nlp(modifiedSentence);
    const words = doc.terms().out('array');

    const restoredWords = words.map(word => restoreHyphenatedWords(word, hyphenatedWords));

    return restoredWords;
}

function makeWordsClickable(paragraph) {
    const text = _quiz.content;

    const passages = text.split('<br>');

    let sentenceIndex = 0;
    const clickablePassages = passages.map(passage => {
        const sentences = splitParagraphIntoSentences(passage.trim());

        const clickableSentences = sentences.map(sentence => {
            const words = splitSentenceIntoWords(sentence);
            const clickableWords = words.map((word, wordIndex) => {
                const exception = [/\b\w+(-\w+)+\b/g, /\b\d+,\d+\b/g, /\b\d+\.\d+\b/g, /\b\w+’\w+\b/g]

                const isException = exception.some(regex => regex.test(word));

                const cleanWord = isException ? word : word.replace(/[^a-zA-Z0-9]/g, '');
                return `<a href="#" class="vocab-word" data-bs-target="#vocab-offcanvasBottom"
                            onclick="handleWordClick(this, ${sentenceIndex + 1}, ${wordIndex + 1}, '${cleanWord}')">${word}</a>`;
            });

            sentenceIndex++;
            return `<span>${clickableWords.join(' ')}</span>`;
        });

        return `<p class="passage">${clickableSentences.join(' ')}</p>`; // Wrap each passage in a <p>
    });

    paragraph.innerHTML = clickablePassages.join('');
}

function handleWordClick(element, sentenceIndex, wordIndex, word) {
    //debug
    console.log(`Sentence: ${sentenceIndex}, Word: ${wordIndex}, Value: ${word}`);
    removeUnderlineWord();
    element.classList.add('active');

    const offcanvas = document.getElementById('vocab-offcanvasBottom');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvas);
    showWordDefinition(sentenceIndex, wordIndex, word);
    bsOffcanvas.show();
}

function removeUnderlineWord() {
    const activeWords = document.querySelectorAll('.vocab-word.active');
    activeWords.forEach(word => word.classList.remove('active'));
}


async function showWordDefinition(sentenceIndex, wordIndex, word) {
    // Thay đổi nội dung với từ được nhấn
    const id = JSON.parse(localStorage.getItem('quiz')).id;
    const result = await fetchLookup(id, sentenceIndex, wordIndex, word);
    const vocab = new Vocab(
        JSON.parse(result).data.word_display,      // value
        JSON.parse(result).data.word_class,       // word_class
        JSON.parse(result).data.meaning, // meaning
        JSON.parse(result).data.ipa,                // ipa (International Phonetic Alphabet)
        JSON.parse(result).data.example[0], // example
        JSON.parse(result).data.collocation,        // verb_structure
        JSON.parse(result).data.explanation // explanation
    );
    console.log('vocab:', vocab);
    document.getElementById('vocab-value').textContent = vocab.value;
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
                selectedTexts = selectedText.split(/(\n)/);
                console.log(selectedTexts);
                const fragment = document.createDocumentFragment();

                selectedTexts.forEach(part => {
                    if (part == '\n') {
                        fragment.appendChild(document.createElement('br'));
                    }
                    else {
                        if (part) { // Skip empty segments
                            const span = document.createElement('span');
                            span.classList.add('highlighted');
                            span.textContent = part;

                            // Add click event to the span
                            span.addEventListener('click', (event) => {
                                showFlyoutMenuOnHighlightedText(event, span);
                            });

                            fragment.appendChild(span);
                        }
                    }
                });

                range.deleteContents();
                range.insertNode(fragment);

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

function loadPart(part) {
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
    let uiElement = `<div class="question-container" id="question-${question.order}" style="margin: 3% 0%;">`;

    switch (question.type) {
        case 'SINGLE-SELECTION':
            uiElement += `
                <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                    <div class="question-order-number" style="margin: 2%">${question.order}</div>
                    <select class="custom-dropdown" onchange="checkAnswered(${question.order}, ${question.id})">
                        <option value="" selected disabled>None</option> 
                        ${question.options.map(option => `<option value="${option.option}">${option.option}</option>`).join('')}
                    </select>
                    <p style="margin: 2%; align-items: center;">${question.content}</p>
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
                    ${question.options.map((option, index) => `
                        <div class="option" style="display: flex; align-items: center;">
                            <div class="question-order-number" style="margin-left: 2%; margin-right: 2%; align-items: center; font-size: 1em">
                                ${String.fromCharCode(65 + index)}
                            </div>
                            <input type="radio" name="question-${question.order}" value="${option}" id="option-${question}-${option}" onchange="checkAnswered(${question.order}, ${question.id})">
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
    const submitTest = document.getElementById('btn_toggle_modal_submit');

    let isAnswered = false;
    let isDisabledBtnToggleModalSubmit = true;
    let answer = null;

    inputs.forEach(input => {
        if (input.type === 'radio' && input.checked) {
            isAnswered = true;
            isDisabledBtnToggleModalSubmit = false;
            answer = input.value;
        }

        if (input.type === 'text' && input.value.trim() !== '') {
            isAnswered = true;
            isDisabledBtnToggleModalSubmit = false;
            answer = input.value.trim();
        }

        if (input.tagName.toLowerCase() === 'select' && input.value !== '') {
            isAnswered = true;
            isDisabledBtnToggleModalSubmit = false;
            answer = input.value;
        }
    });
    submitTest.disabled = isDisabledBtnToggleModalSubmit;

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

function loadQuiz(quiz) {
    const quizType = document.getElementById('quiz-type-label');
    const strQuizType = quiz.type === 1 ? "Reading" : "Listening";
    quizType.innerHTML = `MePass - ${strQuizType} Practice`;
    startCountdown(quiz);
    loadButtonQuestion(quiz);

    const quizTitle = document.getElementById('quiz-title');
    quizTitle.innerHTML = quiz.title;

    const content = quiz.content.split('<br>').join('<br><br>');
    const quizContentHighlight = document.getElementById('quiz-content-highlight');
    quizContentHighlight.innerHTML = content;
    const quizContentVocab = document.getElementById('quiz-content-vocab');
    quizContentVocab.innerHTML = quiz.content;

    const container = document.getElementById('question-area');
    container.innerHTML = ''; // Clear previous UI
    let uiElement = ``;
    quiz.parts.forEach(part => {
        const partUI = loadPart(part);
        uiElement += partUI;
    });
    container.innerHTML = uiElement;

    const submitTest = document.getElementById('btn_toggle_modal_submit');
    submitTest.disabled = true;
}



// Biến này sẽ chứa giá trị thời gian hoàn thành bài test khi người dùng bấm submit (để tính toán thời gian còn lại)
let completion_Time = 0;
// Xử lý sự kiện like hoặc dislike trên vocab offcanvas
document.addEventListener('DOMContentLoaded', function () {
    const icons = document.querySelectorAll('.feedback-icon');

    icons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            const isCheck = icon.getAttribute('data-ischeck') === 'true';

            if (isCheck) {
                icon.setAttribute('data-ischeck', 'false');
                icon.classList.remove('fas');
                icon.classList.add('far');
            } else {
                icons.forEach(function (otherIcon) {
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

document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('btn_submit_test').addEventListener('click', async function () {
        completion_Time = (() => {
            const [minutes, seconds] = document.getElementById('timer').textContent.split(':').map(Number);
            return (minutes * 60) + seconds;
        })();
        const result = getAnswered(_quiz, userAnswers); // Khi bấm nút Nộp bài thì gọi hàm logic này để submit gửi api result
        const data = await fetchSubmit(result);
        window.location.href = `/user/quiz-result?id=${data.data.id}`;
    });
});

// Hàm logic kiểm tra kết quả đúng sai để gửi api, hàm này được gọi trong checkAnswered
function getAnswered(quiz, userAnswers) {
    // Initializing the result structure
    const parts = quiz.parts;
    const result = {
        question: [],
        dictionary: {},
        quiz: {
            quiz: quiz.id,
            type: quiz.type,
            completed_duration: completion_Time,
            status: "reviewed",
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
            if (!userAnswers.hasOwnProperty(question.id)) {
                totalQuestions++;
                return;
            }
            const userAnswer = userAnswers[question.id];
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
                answer: {
                    title: {
                        text: question.content,
                        answer: userAnswer,
                        id: question.id,
                    }
                },
                correct: isCorrect,
                question: question.order,
                type: question.type,
                id_question: question.id,
            });

        });
    });

    // Update summary
    result.quiz.summary.correct = totalCorrect;
    result.quiz.summary.total = totalQuestions;
    const hours = Math.floor(completion_Time / 3600);
    const minutes = Math.floor((completion_Time % 3600) / 60);
    const seconds = completion_Time % 60;
    result.quiz.summary.left_time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return result;
}

async function initializePage() {
    const data = await fetchData();
    const quizData = JSON.parse(data);

    // Lấy dữ liệu phần (parts) và câu hỏi (questions) từ quizData
    const parts = quizData.parts.map(partData => {
        const questions = partData.questions.map(qData => {
            let content = qData.selection
                ? qData.selection[0].text
                : (qData.gap_fill_in_blank ? qData.gap_fill_in_blank.text : '');
            if (qData.type === 'SINGLE-RADIO') {
                content = qData.content;
            }

            // Xử lý lấy các options từ multiple_choice mà không dùng map
            let selectionOption = [];
            let answer = ""
            let explain = ""
            if (qData.selection_option) {
                selectionOption = qData.selection_option;
                answer = qData.selection[0].answer;
                explain = qData.explain.explanation;
            } else if (qData.multiple_choice) {
                selectionOption = [];
                for (let i = 0; i < qData.multiple_choice.length; i++) {
                    selectionOption.push(qData.multiple_choice[i].text);
                    if (qData.multiple_choice[i].correct === true) {
                        answer = qData.multiple_choice[i].text;
                    }
                    explain = qData.explain.explain;
                }
            } else if (qData.gap_fill_in_blank) {
                answer = qData.explain[0].answer;
                explain = qData.explain[0].explain;
            }

            return new Question(
                qData.id,
                qData.order,
                qData.type,
                content,
                selectionOption, // Truyền danh sách options đã xử lý
                answer,
                explain,
                qData.description || null // Nếu không có description thì gán null
            );
        });

        return new Part(partData.id, questions);
    });

    // Tạo quiz với các phần (parts) đã được tạo
    const quiz = new Quiz(
        quizData.id,
        1, // Giả sử luôn là 1, bạn có thể thay đổi theo yêu cầu
        quizData.content,
        quizData.title,
        quizData.time, // 30 phút
        parts, // Truyền các phần vào
        true // Giả sử quiz đã được kích hoạt
    );
    _quiz = quiz;

    loadQuiz(quiz);
    HighlightText();
}

window.onload = initializePage;
window.onpageshow = function (event) {
    if (event.persisted) {
        initializePage();
    }
};