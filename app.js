// Values
let min = 12,
    max = 17,
    rightGuess = randomNumber(min, max),
    guessesLeft = 3;

// UI Vals
const game = document.querySelector('#game'),
        minVal = document.querySelector('.min-num');
        maxVal = document.querySelector('.max-num'),
        guessInput = document.querySelector('#guess-input'),
        submitBtn = document.querySelector('#guess-button'),
        output = document.querySelector('.output');


minVal.textContent = min;
maxVal.textContent = max;

// Play again
submitBtn.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});
// Even Listener
submitBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    // Validate numbers btw min max    
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    // Check if won
    if(guess === rightGuess){
        // Game over - won
        gameOver(true, `${rightGuess} is correct, YOU WIN`);
    }else{
        // Wrong guess
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over - lost
            gameOver(false, `Game over, lost. The correct number was ${rightGuess}`);
        }else{
            // Game continues - answer is wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';

            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : 'red';

    // Disble input
    guessInput.disabled = 'true';
    // Change border color
    guessInput.style.borderColor = color;
    // Set text color
    output.style.color = color;
    // Output the result
    setMessage(msg);

    // Play Again
    submitBtn.value = 'Play Again';
    submitBtn.className += 'play-again';
}
// Set output
function setMessage(msg, color){
    output.textContent = msg;
    output.style.color = color;
}
// Random number
function randomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}
