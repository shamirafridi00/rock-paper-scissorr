function getComputerChoice(){
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


function getHumanChoice(){
    let choice = prompt("Enter rock, paper, or scissors:").toLowerCase();
    while (!['rock', 'paper', 'scissors'].includes(choice)) {
        choice = prompt("Invalid choice. Please enter rock, paper, or scissors:").toLowerCase();
    }
    return choice;
}

function determineWinner(humanChoice, computerChoice){
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    }
    if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}


//ask how many rounds to play
function getNumberOfRounds(){
    let rounds = parseInt(prompt("How many rounds would you like to play?"));
    while (isNaN(rounds) || rounds <= 0) {
        rounds = parseInt(prompt("Invalid input. Please enter a positive number for rounds:"));
    }
    return rounds;
}



function playGame(){    
    const rounds = getNumberOfRounds();
    let humanScore = 0;
    let computerScore = 0;

    for (let i = 0; i < rounds; i++) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        const result = determineWinner(humanChoice, computerChoice);

        console.log(`Round ${i + 1}: You chose ${humanChoice}, Computer chose ${computerChoice}. ${result}`);

        if (result === "You win!") {
            humanScore++;
        } else if (result === "Computer wins!") {
            computerScore++;
        }
    }

    console.log(`Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    if (humanScore > computerScore) {
        console.log("Congratulations! You are the overall winner!");
    } else if (computerScore > humanScore) {
        console.log("Computer is the overall winner! Better luck next time.");
    } else {
        console.log("It's an overall tie!");
    }
}

playGame();