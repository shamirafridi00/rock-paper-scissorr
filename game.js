const roundsInput = document.getElementById("rounds");
const userChoiceInput = document.getElementById("user-choice");
const playButton = document.getElementById("play-button");
const roundResultP = document.getElementById("round-result");
const finalResultP = document.getElementById("final-result");

let totalRounds = 0;
let currentRound = 0;
let humanScore = 0;
let computerScore = 0;
let gameStarted = false;

function getComputerChoice(){
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getHumanChoice(){
    const choice = userChoiceInput.value.toLowerCase();
    if (['rock', 'paper', 'scissors'].includes(choice)) {
        return choice;
    } else {
        alert("Invalid choice. Please select rock, paper, or scissors.");
        return null;
    }
}

function determineWinner(humanChoice, computerChoice){
    if (humanChoice === computerChoice) {
        return "tie";
    }
    if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "human";
    } else {
        return "computer";
    }
}

function playRound(){
    const humanChoice = getHumanChoice();
    if (!humanChoice) return;

    const computerChoice = getComputerChoice();
    const winner = determineWinner(humanChoice, computerChoice);

    let resultMessage = `Round ${currentRound}: You chose ${humanChoice}, Computer chose ${computerChoice}. `;
    
    if (winner === "tie") {
        resultMessage += "It's a tie!";
    } else if (winner === "human") {
        resultMessage += "You win!";
        humanScore++;
    } else {
        resultMessage += "Computer wins!";
        computerScore++;
    }

    roundResultP.innerHTML += resultMessage + "<br>";
    roundResultP.innerHTML += `Score - You: ${humanScore}, Computer: ${computerScore}<br><br>`;

    // Check if game is over
    if (currentRound === totalRounds) {
        endGame();
    }
}

function endGame(){
    gameStarted = false;
    playButton.textContent = "Start New Game";
    roundsInput.disabled = false;
    
    let finalMessage = `<strong>GAME OVER!</strong><br>`;
    finalMessage += `Final Score - You: ${humanScore}, Computer: ${computerScore}<br>`;
    
    if (humanScore > computerScore) {
        finalMessage += "🎉 Congratulations! You won the game!";
    } else if (computerScore > humanScore) {
        finalMessage += "😔 Computer wins the game! Better luck next time.";
    } else {
        finalMessage += "🤝 The game is a tie!";
    }
    
    finalResultP.innerHTML = finalMessage;
}

function startGame(){
    totalRounds = parseInt(roundsInput.value);
    if (isNaN(totalRounds) || totalRounds <= 0) {
        alert("Please enter a valid positive number for rounds.");
        return;
    }

    // Reset everything
    currentRound = 0;
    humanScore = 0;
    computerScore = 0;
    roundResultP.innerHTML = "";
    finalResultP.innerHTML = "";
    gameStarted = true;
    
    roundsInput.disabled = true;
    playButton.textContent = "Play Round";
    
    alert(`Game started! Play ${totalRounds} rounds.`);
}

playButton.addEventListener("click", () => {
    if (!gameStarted) {
        startGame();
    } else {
        currentRound++;
        playRound();
    }
});
