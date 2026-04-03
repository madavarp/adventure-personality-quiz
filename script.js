const questions = [
  "I enjoy exploring places I have never been before.",
  "I prefer spontaneous plans over fixed schedules.",
  "I like challenges that push me outside my comfort zone.",
  "I enjoy carefully planning trips or projects before starting.",
  "Trying something new excites me more than repeating something familiar.",
  "I enjoy taking leadership when a group faces a difficult challenge.",
  "I prefer solving problems creatively rather than following strict rules."
];

let currentQuestion = 0;
let scores = {
  explorer: 0,
  planner: 0,
  challenger: 0
};

function startQuiz() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  document.getElementById("questionText").textContent = questions[currentQuestion];
  document.getElementById("questionCounter").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = `${progressPercent}%`;
}

function selectAnswer(answer) {
  if (currentQuestion === 0) {
    if (answer === "agree") scores.explorer += 2;
    if (answer === "neutral") scores.explorer += 1;
    if (answer === "disagree") scores.planner += 1;
  }

  if (currentQuestion === 1) {
    if (answer === "agree") scores.explorer += 2;
    if (answer === "neutral") scores.explorer += 1;
    if (answer === "disagree") scores.planner += 2;
  }

  if (currentQuestion === 2) {
    if (answer === "agree") scores.challenger += 2;
    if (answer === "neutral") scores.explorer += 1;
    if (answer === "disagree") scores.planner += 1;
  }

  if (currentQuestion === 3) {
    if (answer === "agree") scores.planner += 2;
    if (answer === "neutral") scores.planner += 1;
    if (answer === "disagree") scores.explorer += 1;
  }

  if (currentQuestion === 4) {
    if (answer === "agree") scores.explorer += 2;
    if (answer === "neutral") scores.challenger += 1;
    if (answer === "disagree") scores.planner += 1;
  }

  if (currentQuestion === 5) {
    if (answer === "agree") scores.challenger += 2;
    if (answer === "neutral") scores.explorer += 1;
    if (answer === "disagree") scores.planner += 1;
  }

  if (currentQuestion === 6) {
    if (answer === "agree") scores.challenger += 2;
    if (answer === "neutral") scores.explorer += 1;
    if (answer === "disagree") scores.planner += 2;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let resultType = "Explorer";
  let resultDescription = "You are curious, adventurous, and energized by discovering new experiences.";
  let resultIcon = "🧭";

  if (scores.planner >= scores.explorer && scores.planner >= scores.challenger) {
    resultType = "Planner";
    resultDescription = "You enjoy structure, thoughtful decisions, and making sure every step has purpose.";
    resultIcon = "🗺️";
  } else if (scores.challenger >= scores.explorer && scores.challenger >= scores.planner) {
    resultType = "Challenger";
    resultDescription = "You thrive on bold choices, exciting risks, and pushing boundaries with confidence.";
    resultIcon = "⛰️";
  }

  document.getElementById("resultText").textContent = resultType;
  document.getElementById("resultDescription").textContent = resultDescription;
  document.getElementById("resultIcon").textContent = resultIcon;
}

function restartQuiz() {
  currentQuestion = 0;
  scores = {
    explorer: 0,
    planner: 0,
    challenger: 0
  };

  document.getElementById("result").classList.add("hidden");
  document.getElementById("welcome").classList.remove("hidden");
}
