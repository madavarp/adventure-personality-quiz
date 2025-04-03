const questions = [
    "Do you enjoy exploring unknown places without a plan?",
    "Would you try a new cuisine in a foreign country?",
    "Are you comfortable traveling solo to a remote location?"
];

let currentQuestion = 0;
let answers = [];

function startQuiz() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    document.getElementById('questionText').textContent = questions[currentQuestion];
}

function selectAnswer(choice) {
    answers.push(choice);
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById('quiz').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        showResult();
    }
}

function showResult() {
    const agreeCount = answers.filter(a => a === 'agree').length;
    const neutralCount = answers.filter(a => a === 'neutral').length;
    const disagreeCount = answers.filter(a => a === 'disagree').length;

    let result = '';
    if (agreeCount >= 2) {
        result = 'Brave';
    } else if (neutralCount >= 2) {
        result = 'Cautious';
    } else {
        result = 'Enthusiast';
    }

    document.getElementById('resultText').textContent = `You are a ${result}!`;

    // Send result type to backend
    trackPersonality(result);

    function trackPersonality(resultType) {
        fetch('https://your-api-id.amazonaws.com/dev/track-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result: resultType })
        })
            .then(res => res.json())
            .then(data => console.log(data.message))
            .catch(err => console.error('Error tracking personality:', err));
    }

}

function trackPersonality(resultType) {
    fetch('https://your-api-endpoint.amazonaws.com/track-personality', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ result: resultType, timestamp: new Date().toISOString() })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to track result');
            }
            return response.json();
        })
        .then(data => console.log('Tracked result:', data))
        .catch(error => console.error('Tracking error:', error));
}




