async function loadQuizData() {
    try {
        const response = await fetch('quizSet.json'); // quizSet.json 파일 경로
        const quizSet = await response.json();  // JSON 데이터를 JavaScript 객체로 변환
        const params = new URLSearchParams(window.location.search);
        const quizIndex = params.get('id');
        quizRender(quizSet[quizIndex]);
    } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
    }
}

function quizRender(quiz) { // 퀴즈 렌더링
    console.log(quiz);
    const quizSection = document.getElementById('quiz-section');

    // quiz-title 생성
    const quizTitle = document.createElement('div');
    quizTitle.classList.add('quiz-title');
    quizTitle.textContent = quiz.quizTitle;

    // quiz-title 생성
    const quizContent = document.createElement('div');
    quizContent.classList.add('quiz-content');
    quizContent.textContent = quiz.quizContent;

    const startButton = document.createElement('button');
    startButton.classList.add('quiz-start');
    startButton.textContent = "Start";
    startButton.addEventListener('click', () => quizStarter(quiz, quizSection));

    quizSection.append(quizTitle, quizContent, startButton);

}

const quizStarter = (quiz, quizSection, index = 0) => {
    // 퀴즈 소개 요소 제거
    quizSection.replaceChildren(); // 모든 자식 요소 삭제
    quizMaker(quiz, 0, quizSection);
    console.log(quiz.questions[0].title)

}

function quizMaker(quiz, index, quizSection) {
    quizSection.replaceChildren();
    const question = document.createElement('div');
    question.classList.add('question');
    question.textContent = quiz.questions[index].title;
    quizSection.append(question);

    const options = quiz.questions[index].options;
    const checkboxes = [];

    const submit = document.createElement('button');
    submit.classList.add('submit-button');
    submit.textContent = 'Submit';
    submit.disabled = true;
    quizSection.appendChild(submit);

    for (const key in options) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.value = key;

        const label = document.createElement('label');
        label.classList.add('question');

        label.appendChild(checkBox);
        label.appendChild(document.createTextNode(options[key]));

        quizSection.insertBefore(label, submit);
        checkboxes.push(checkBox);

        checkBox.addEventListener('change', function() {
            if (this.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
                submit.disabled = false;
            } else {
                const anyChecked = checkboxes.some(cb => cb.checked);
                submit.disabled = !anyChecked;
            }
        });
    }

    submit.addEventListener('click', () => {
        const selectedOption = checkboxes.find(cb => cb.checked);
        let correct = 0;
        if (selectedOption) {
            const selectedValue = selectedOption.value;
            console.log('선택된 옵션 값:', selectedValue);

            const correctAnswer = quiz.questions[index].answer;
            if (selectedValue === correctAnswer) {
                correct++;
            } 
        }
        nextQuiz(quiz, index, quizSection,correct);
    });
}

const nextQuiz = (quiz, index, quizSection,correct) => {
    let quizLength = quiz.questions.length;
    index++; // index를 증가시킴
    if (index < quizLength) {
        quizMaker(quiz, index, quizSection);
    } else {
        quizResult(correct,quizSection);
    }
};


function quizResult(correct,quizSection){
    quizSection.replaceChildren(); // 모든 자식 요소 삭제
    const result = document.createElement('div');

    result.classList.add("quiz-result");
    result.textContent = `당신이 맞은 갯수는 ${correct}`;

    const resultComment = document.createElement('div');
    resultComment.classList.add('quiz-resultComment');

    if(correct<2){
        resultComment.textContent = '야이 쓰레기야 공부좀 해라!';
    }else if(correct<4){
        resultComment.textContent = 'SOSO~';
    }else{
        resultComment.textContent = 'Great~';

    }

    quizSection.append(result);
    quizSection.append(resultComment);


}

loadQuizData()
