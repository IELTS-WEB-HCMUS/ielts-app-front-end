document.addEventListener('DOMContentLoaded', function () {
    const skills = ['reading', 'listening', 'speaking', 'writing'];
    const scores = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

    skills.forEach(skill => {
        const scoreBox = document.getElementById(`${skill}-score`).parentElement;
        let currentScore = localStorage.getItem(`${skill}-goal`) || '--';
        document.getElementById(`${skill}-score`).textContent = currentScore;

        scoreBox.addEventListener('click', function (e) {
            const scoreValue = prompt(`Chọn điểm ${skill} (0.5-9.0):`, currentScore);
            const score = parseFloat(scoreValue);

            if (scoreValue && !isNaN(score) && scores.includes(score)) {
                currentScore = score.toFixed(1);
                document.getElementById(`${skill}-score`).textContent = currentScore;
                localStorage.setItem(`${skill}-goal`, currentScore);
                updateOverallScore();
            } else if (scoreValue !== null) {
                alert('Vui lòng nhập điểm hợp lệ (0.5-9.0)');
            }
        });
    });

    function roundToIELTS(score) {
        // Làm tròn đến 0.5 gần nhất
        const roundedToHalf = Math.round(score * 2) / 2;
        return parseFloat(roundedToHalf.toFixed(1));
    }

    function updateOverallScore() {
        let total = 0;
        let validScores = 0;

        // Tính tổng và đếm số điểm hợp lệ
        skills.forEach(skill => {
            const score = localStorage.getItem(`${skill}-goal`);
            if (score && !isNaN(score)) {
                total += parseFloat(score);
                validScores++;
            }
        });

        // Chỉ tính điểm trung bình khi có đủ 4 kỹ năng
        if (validScores === 4) {
            const average = total / 4;
            const roundedAverage = roundToIELTS(average);
            document.getElementById('overall-score').textContent = roundedAverage.toFixed(1);
            localStorage.setItem('overall-goal', roundedAverage.toFixed(1));
        } else {
            document.getElementById('overall-score').textContent = '--';
            localStorage.removeItem('overall-goal');
        }
    }

    // Load overall score khi trang được tải
    updateOverallScore();
}); 