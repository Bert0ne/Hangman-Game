class Game {
    constructor() {
        this.initBoard()
        document.querySelector(".game-start").addEventListener("click", () => game.startGame());
    }
    currentSentence = null //currently downloaded Sentence
    currentSentenceLetters = null
    attempts = 5 //attempts are left for the current game
    elemSentence = document.querySelector(".game-sentence") //item with sentence to guess
    elemAttempts = document.querySelector(".game-attempts") //item with attempts number
    elemLetters = document.querySelector(".game-letters") //a list with letters to click on
    dialogLose = document.getElementById('dialog-lose')
    dialogWin = document.getElementById('dialog-win')
    sentences = [ //slogans from which we draw
        "Fantomas",
        "Super Szamson",
        "Hasło",
        "Myszka",
        "Super bohaterowie",
        "Super pies",
        "Przyjaciel",
        "Kurs JavaScript",
        "Terminator",
        "Superman",
        "Herkules",
        "Batman",
        "Spiderman",
        "Kapitan Ameryka"
    ]

    generateLetterButtons() {
        const alphabet = ["a","ą","b","c","ć","d","e","ę","f","g","h","i","j","k","l","ł","m","n","ń","o","ó","p","q","r","s","ś","t","u","v","w","x","y","z","ź","ż"];

        alphabet.forEach(letter => {
            const button = document.createElement("button");
            button.classList.add("game-letter");
            button.type = "button";
            button.dataset.letter = letter;
            button.innerText = letter;
            this.elemLetters.appendChild(button);
        });
    }

    clearDialog() {
        this.dialogLose.close();
        this.dialogWin.close();
    }
    
    isLetterExists() {
        return this.currentSentenceLetters.length;
    }

    checkLettersInSentence(letter) {
        if (this.currentSentence.includes(letter)) { //if the letter exists in the password
            const lettersBox = this.elemSentence.querySelectorAll(".game-sentence-box");

            for (let i=0; i<this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    lettersBox[i].innerText = letter; //insert the desired letter in the appropriate box
                }
            }


            //remove the hit letter from currentSentenceLetters
            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, "g"), "");

            //if there are no more letters in the above variable the player has won
            if (!this.isLetterExists()) {
                this.gameComplete();
            }
        } else {  //there is no such letter in the sentence
            this.attempts--;
            this.showAttempts();

            if (this.attempts <= 0) { //if there are no more trials...
                this.gameOver();
            }
        }
    }

    bindEvents() {
        this.elemLetters.addEventListener("click", e => {
            if (e.target.nodeName.toUpperCase() === "BUTTON" && e.target.classList.contains("game-letter")) {
                const letter = e.target.dataset.letter;
                this.checkLettersInSentence(letter.toUpperCase());
                e.target.disabled = true;
            }
        });
    }

    enableLetters() {
        //take the letters and loop around them to include them
        const letters  = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = false);
    }

    disableLetters() {
        //take the letters and loop around them, turning them off
        const letters  = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = true);
    }

    gameOver() {
        this.dialogLose.show()
        this.disableLetters();
    }

    gameComplete() {
        this.dialogWin.show()
        this.disableLetters();
    }

    initBoard() {
        this.generateLetterButtons();
        this.bindEvents();
        this.disableLetters(); //when creating a board, we turn off the letters
        this.clearDialog(); 

    }

    showAttempts() {
        this.elemAttempts.innerText = this.attempts;
    }
    
    randomSentence() {
        const max = this.sentences.length-1;
        const min = 0;
        const rand = Math.floor(Math.random()*(max-min+1)+min);

        this.currentSentence = this.sentences[rand].toUpperCase();
        this.currentSentenceLetters = this.currentSentence.replace(/ /g, "");
        this.elemSentence.innerText = ''; //clear list

        const letters = this.currentSentence.split('');
        letters.forEach(letter => {
            const div = document.createElement("div");
            div.classList.add("game-sentence-box");
            if (letter === " ") {
                div.classList.add("game-sentence-box-space");
            }
            this.elemSentence.appendChild(div);
        }
        )}
    

    startGame() {
        this.attempts = 5; //how many attempts are left for the current game
        this.randomSentence(); //draw a password to guess
        this.showAttempts(); //show the number of attempts
        this.enableLetters(); //enable letters
        this.clearDialog();
    }
}
const game = new Game();
