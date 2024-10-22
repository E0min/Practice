const quizSection = document.getElementById("quiz-section");

// JSON 파일을 불러오는 함수
async function loadQuizData() {
    try {
        const response = await fetch('quizSet.json'); // quizSet.json 파일 경로
        const quizSet = await response.json();  // JSON 데이터를 JavaScript 객체로 변환
        generateQuizzes(quizSet);
    } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 오류 발생:", error);
    }
}

function quizGenerator(quizObj) {
    let quiz = document.createElement('div');
    const quizTitle = document.createElement('h3');
    const quizContent = document.createElement('div');

    quiz.classList.add('quiz');
    quizTitle.classList.add('quiz-title');
    quizContent.classList.add('quiz-content');

    quizTitle.textContent = quizObj.quizTitle;
    quizContent.textContent = quizObj.quizContent;

    quiz.append(quizTitle, quizContent);
    quiz.addEventListener('click', () => {
        const queryString = `id=${quizObj.id}`;
        window.location.href = `quizPage.html?${queryString}`;
    });
    
    return quiz;
}

function generateQuizzes(quizSet) {
    quizSet.forEach((quizObj) => {
        const quiz = quizGenerator(quizObj);
        quizSection.appendChild(quiz);
    });
}

// 페이지 로드 시 퀴즈 데이터 불러오기
loadQuizData();
