// script.js
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "Lê triều sử ký soạn thành, họ Ngô?", answer: "Ngô Thì Nhậm" },
        { question: "Bình Chiêm, dẹp Tống, Lý trào nổi danh?", answer: "Lý Thường Kiệt" },
        { question: "Vua nào mặt sắt đen sì?", answer: "Mai Hắc Đế" },
        { question: "Đục chìm thuyền địch dưới sông Bạch Đằng?", answer: "Yết Kiêu" },
        { question: "Đại vương bẻ gãy sừng trâu?", answer: "Phùng Hưng" },
        { question: "Lừng danh duyên hải dinh điền là ai?", answer: "Nguyễn Công Trứ" },
        { question: "Còn ai đổi mặc hoàng bào?", answer: "Lê Lai" },
        { question: "Hà- Ninh tổng đốc vị thành vong thân?", answer: "Hoàng Diệu" },
        { question: "Vua nào trong buổi hàn vi ở chùa?", answer: "Lý Công Uẩn" },
        { question: "Đông y lừng tiếng danh sư?", answer: "Hải Thượng Lãn Ông, Lê Hữu Trác" },
        { question: "Mùa xuân nào phá quân Thanh?", answer: "Kỷ Dậu" },
        { question: "Móng rùa thần tặng vua nào?", answer: "An Dương Vương" },
        { question: "Tướng nào bẻ gậy phò vua?", answer: "Quang Trung" },
        { question: "Dẹp Thanh giữ vững giang sơn?", answer: "Quang Trung" },
        { question: "Anh hùng đại thắng Đống Đa?", answer: "Quang Trung-Nguyễn Huệ" },
        { question: "Tây Sơn có nữ tướng tài?", answer: "Bùi Thị Xuân" }
    ];

    const loginContainer = document.getElementById('login-container');
    const questionContainer = document.getElementById('question-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const createQuestionContainer = document.getElementById('create-question-container');
    const loginForm = document.getElementById('login-form');
    const createQuestionForm = document.getElementById('create-question-form');
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const leaderboard = document.getElementById('leaderboard');
    const newQuestion = document.getElementById('new-question');
    const newAnswer = document.getElementById('new-answer');
    let currentQuestionIndex = 0;
    let score = 0;
    const maxScore = 100;
    const pointsPerQuestion = maxScore / questions.length;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion(questions[currentQuestionIndex]);
    });

    createQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = newQuestion.value.trim();
        const answer = newAnswer.value.trim();
        if (question && answer) {
            questions.push({ question, answer });
            newQuestion.value = '';
            newAnswer.value = '';
            alert('Câu hỏi mới đã được thêm.');
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            questionContainer.classList.add('hidden');
            leaderboardContainer.classList.remove('hidden');
            displayLeaderboard();
        }
    });

    function showQuestion(question) {
        questionElement.innerText = question.question;
        answerButtons.innerHTML = '';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'user-answer';
        input.placeholder = 'Trả lời';
        answerButtons.appendChild(input);

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Trả lời';
        submitButton.addEventListener('click', () => checkAnswer(input.value, question.answer));
        answerButtons.appendChild(submitButton);
    }

    function checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            score += pointsPerQuestion;
        }
        nextButton.classList.remove('hidden');
    }

    function displayLeaderboard() {
        leaderboard.innerHTML = `<li>Điểm của bạn: ${score}</li>`;
    }
});
