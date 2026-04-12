const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let words = ['appel', 'office', 'water', 'javascript', 'html'];
let chosenWord = '';
let guestWord = '';
let attemptsLeft = 0;

function selectRandomWord() {
    const randomIndex = Math.floor(Math.random()*words.length);
    return words[randomIndex];
}

function initializeGame(attempts) {
    chosenWord = selectRandomWord();
    guestWord = '-'.repeat(chosenWord.length);
    attemptsLeft = attempts;
    console.log('Welcome to Hangman');
    console.log('Guess the Word:' + guestWord);
    // run the game
    turn();
}

function checkLetter(letter){
    let found = false;
    for (let i=0; i<chosenWord.length; i++){
        if(chosenWord[i] === letter){
            guestWord = guestWord.substring(0, i) + letter + guestWord.substring(i+1);
            found = true;
        }
    }
    return found;
}
function turn(){
    rl.question('Guess the word: ', (input) => {
        
        let letter = input.toLowerCase();
        let letterIsCorrect = checkLetter(letter);
        if (letterIsCorrect) {
            console.log('Good Guess!: ' +guestWord)
        }else {
            attemptsLeft--;
            console.log('Worng! You have ' + attemptsLeft + ' attempts left.');
            if (attemptsLeft === 0){
                console.log('You lost!');
                rl.close();
                return;
            }
        }
        if (guestWord === chosenWord) {
            console.log('Congratulations! You guessed the word, it was ' +chosenWord);
            rl.close();
        }else{
            turn();
        }
    });
}
initializeGame(2);