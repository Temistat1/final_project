// Game State Variables
let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 60;  // Timer set to 60 seconds
let timerInterval;
let questions = [
  {
    statement: "The Great Wall of China is visible from space.",
    isFact: false,
    correctFact: "The Great Wall of China is not visible from space with the naked eye.",
    image: "images/great_wall.jpg"
  },
  {
    statement: "Bats are blind.",
    isFact: false,
    correctFact: "Bats are not blind; they have excellent vision, especially in low-light conditions.",
    image: "images/bat.jpg"
  },
  {
    statement: "Humans only use 10% of their brains.",
    isFact: false,
    correctFact: "Humans use almost all parts of their brains, even while sleeping.",
    image: "images/brain.jpg"
  },
  {
    statement: "Goldfish have a three-second memory.",
    isFact: false,
    correctFact: "Goldfish can remember things for months and even recognize their owners.",
    image: "images/goldfish.jpg"
  },
  {
    statement: "Lightning never strikes the same place twice.",
    isFact: false,
    correctFact: "Lightning can strike the same place multiple times, especially in tall structures.",
    image: "images/lightning.jpg"
  },
  {
    statement: "Sharks can only swim forward, not backward.",
    isFact: true,
    correctFact: "This is true! Sharks lack the muscles to propel themselves backward.",
    image: "images/shark.jpg"
  },
  {
    statement: "Bananas grow on trees.",
    isFact: false,
    correctFact: "Bananas grow on large plants that are often mistaken for trees.",
    image: "images/banana.jpg"
  },
  {
    statement: "The Eiffel Tower grows taller in the summer.",
    isFact: true,
    correctFact: "The Eiffel Tower expands due to heat, making it taller in summer.",
    image: "images/eiffel_tower.jpg"
  },
  {
    statement: "You swallow spiders in your sleep every year.",
    isFact: false,
    correctFact: "There is no evidence that spiders regularly crawl into people's mouths while sleeping.",
    image: "images/spider.jpg"
  },
  {
    statement: "Water spirals down drains differently in the Southern Hemisphere.",
    isFact: false,
    correctFact: "The Coriolis effect doesn't influence small-scale water movement like drains.",
    image: "images/drain.jpg"
  },
  {
    statement: "Humans share 98% of their DNA with chimpanzees.",
    isFact: true,
    correctFact: "This is true! Humans and chimps share about 98% of their DNA.",
    image: "images/chimpanzee.jpg"
  },
  {
    statement: "Ostriches bury their heads in the sand.",
    isFact: false,
    correctFact: "Ostriches do not bury their heads; they lower them to the ground to avoid predators.",
    image: "images/ostrich.jpg"
  },
  {
    statement: "A penny dropped from a skyscraper can kill someone.",
    isFact: false,
    correctFact: "A penny is too light to cause serious harm, even at high speeds.",
    image: "images/penny.jpg"
  },
  {
    statement: "Carrots improve your night vision.",
    isFact: false,
    correctFact: "Carrots contain Vitamin A, which supports eye health, but they don't enhance night vision.",
    image: "images/carrot.jpg"
  },
  {
    statement: "An octopus has three hearts.",
    isFact: true,
    correctFact: "This is true! Octopuses have two hearts for pumping blood to the gills and one for the body.",
    image: "images/octopus.jpg"
  },
  {
    statement: "Eating too much sugar causes diabetes.",
    isFact: false,
    correctFact: "Sugar itself doesn't directly cause diabetes, but a high-calorie diet can increase risk factors.",
    image: "images/sugar.jpg"
  },
  {
    statement: "Dogs can only see in black and white.",
    isFact: false,
    correctFact: "Dogs can see some colors, but not as vividly as humans. They see shades of blue and yellow.",
    image: "images/dog.jpg"
  },
  {
    statement: "Gold is edible.",
    isFact: true,
    correctFact: "This is true! Edible gold is used in desserts and drinks and is safe to consume.",
    image: "images/gold.jpg"
  },
  {
    statement: "Camels store water in their humps.",
    isFact: false,
    correctFact: "Camels store fat in their humps, not water.",
    image: "images/camel.jpg"
  }
];

// Function to shuffle the questions
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]; // Swap the elements
  }
}

// Game State Functions
function startGame() {
  shuffleQuestions();  // Shuffle the questions
  document.querySelector('.start-screen').style.display = 'none'; // Hide the start screen
  document.querySelector('.game').style.display = 'block'; // Show the game screen
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = currentQuestion.statement;
    document.getElementById('questionImage').src = currentQuestion.image;
    document.getElementById('feedback').style.display = 'none'; // Hide feedback
    document.getElementById('factButton').disabled = false; // Enable buttons
    document.getElementById('mythButton').disabled = false;
  } else {
    gameOver();
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    document.getElementById('timeLeft').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function checkAnswer(isFact) {
  let currentQuestion = questions[currentQuestionIndex];
  let feedback = document.getElementById('feedback');

  // Check if the answer is correct
  if (isFact === currentQuestion.isFact) {
    feedback.textContent = "Correct! " + currentQuestion.correctFact;
    feedback.className = 'feedback correct';  // Green for correct
    score += 10;
  } else {
    feedback.textContent = "Incorrect. " + currentQuestion.correctFact;
    feedback.className = 'feedback incorrect';  // Red for incorrect
  }

  document.getElementById('score').textContent = score; // Update score
  document.getElementById('feedback').style.display = 'block'; // Show feedback
  document.getElementById('factButton').disabled = true; // Disable buttons
  document.getElementById('mythButton').disabled = true;

  // Go to the next question after a short delay
  setTimeout(function () {
    currentQuestionIndex++;
    loadQuestion();
  }, 2000);
}

function gameOver() {
  clearInterval(timerInterval);
  document.querySelector('.game').style.display = 'none';
  document.querySelector('.game-over').style.display = 'block';
  document.getElementById('finalScore').textContent = score;
}

// Event Listeners for Buttons
document.getElementById('factButton').addEventListener('click', function () {
  checkAnswer(true);
});
document.getElementById('mythButton').addEventListener('click', function () {
  checkAnswer(false);
});

// Start the game when the page loads
window.onload = function () {
  document.querySelector('.cta-button').addEventListener('click', startGame);
};
