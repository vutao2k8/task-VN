// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ====== DANH SÁCH CÂU HỎI ======
    const questions = [
        { question: "Lê triều sử ký soạn thành, họ Ngô?", answer: "Ngô Thì Nhậm" },
        { question: "Bình Chiêm, dẹp Tống, Lý trào nổi danh?", answer: "Lý Thường Kiệt" },
        { question: "Vua nào mặt sắt đen sì?", answer: "Mai Hắc Đế" },
        { question: "Đục chìm thuyền địch dưới sông Bạch Đằng?", answer: "Yết Kiêu" },
        { question: "Đại vương bẻ gãy sừng trâu?", answer: "Phùng Hưng" },
        { question: "Lừng danh duyên hải dinh điền là ai?", answer: "Nguyễn Công Trứ" },
        { question: "Còn ai đổi mặc hoàng bào?", answer: "Lê Lai" },
        { question: "Hà-Ninh tổng đốc vị thành vong thân?", answer: "Hoàng Diệu" },
        { question: "Vua nào trong buổi hàn vi ở chùa?", answer: "Lý Công Uẩn" },
        { question: "Đông y lừng tiếng danh sư?", answer: "Hải Thượng Lãn Ông" },
        { question: "Mùa xuân nào phá quân Thanh?", answer: "Kỷ Dậu" },
        { question: "Móng rùa thần tặng vua nào?", answer: "An Dương Vương" },
        { question: "Tướng nào bẻ gậy phò vua?", answer: "Quang Trung" },
        { question: "Anh hùng đại thắng Đống Đa?", answer: "Nguyễn Huệ" },
        { question: "Tây Sơn có nữ tướng tài?", answer: "Bùi Thị Xuân" },
        { question: "Ai là người khởi nghĩa Lam Sơn?", answer: "Lê Lợi" },
        { question: "Ai là người soạn Bình Ngô Đại Cáo?", answer: "Nguyễn Trãi" },
        { question: "Nhà khoa bảng nổi tiếng xứ Nghệ?", answer: "Chu Văn An" },
        { question: "Người sáng lập triều Nguyễn?", answer: "Gia Long" },
        { question: "Nhà bác học toàn tài TK XVIII?", answer: "Lê Quý Đôn" }
    ];

    // ====== BIẾN QUẢN LÝ ======
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
    let playerName = "";
    const pointsPerQuestion = 10;

    // ====== LOGIN ======
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playerName = document.getElementById('player-name').value.trim() || "Người chơi";
        loginContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion(questions[currentQuestionIndex]);
    });

    // ====== THÊM CÂU HỎI ======
    createQuestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = newQuestion.value.trim();
        const a = newAnswer.value.trim();
        if (q && a) {
            questions.push({ question: q, answer: a });
            newQuestion.value = '';
            newAnswer.value = '';
            toast("✅ Câu hỏi mới đã được thêm!");
        }
    });

    // ====== NÚT NEXT ======
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            endGame();
        }
    });

    // ====== HIỂN THỊ CÂU HỎI ======
    function showQuestion(q) {
        questionElement.innerText = q.question;
        answerButtons.innerHTML = '';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'user-answer';
        input.placeholder = 'Nhập câu trả lời...';
        answerButtons.appendChild(input);

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Trả lời';
        submitButton.addEventListener('click', () => checkAnswer(input.value, q.answer));
        answerButtons.appendChild(submitButton);

        nextButton.classList.add('hidden');
    }

    // ====== KIỂM TRA TRẢ LỜI ======
    function checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
            score += pointsPerQuestion;
            toast("🎉 Chính xác!");
        } else {
            toast(`❌ Sai! Đáp án đúng: ${correctAnswer}`);
        }
        nextButton.classList.remove('hidden');
    }

    // ====== KẾT THÚC GAME ======
    function endGame() {
        questionContainer.classList.add('hidden');
        leaderboardContainer.classList.remove('hidden');
        saveScore();
        displayLeaderboard();
    }

    // ====== LƯU & HIỂN THỊ BẢNG XẾP HẠNG ======
    function saveScore() {
        const scores = JSON.parse(localStorage.getItem('leaderboard') || "[]");
        scores.push({ name: playerName, score });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('leaderboard', JSON.stringify(scores.slice(0, 5)));
    }

    function displayLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('leaderboard') || "[]");
        leaderboard.innerHTML = scores
            .map((s, i) => `<li>${i + 1}. ${s.name} - ${s.score} điểm</li>`)
            .join('');
    }

    // ====== TOAST THÔNG BÁO ======
    function toast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
});
