class Game {
    constructor() {
        this.initBoard()
        document.querySelector(".game-start").addEventListener("click", () => game.startGame());
    }
    currentSentence = null //aktualnie pobrane hasło
    currentSentenceLetters = null
    attempts = 5 //ile prób zostało dla aktualnej gry
    elemSentence = document.querySelector(".game-sentence") //element z hasłem do zgadnięcia
    elemAttempts = document.querySelector(".game-attempts") //element z liczba prob
    elemLetters = document.querySelector(".game-letters") //lista z literkami do klikania
    dialogLose = document.getElementById('dialog-lose')
    dialogWin = document.getElementById('dialog-win')
    sentences = [ //hasła z których losujemy
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
        if (this.currentSentence.includes(letter)) { //jeżeli litera istnieje w haśle
            const lettersBox = this.elemSentence.querySelectorAll(".game-sentence-box");

            for (let i=0; i<this.currentSentence.length; i++) {
                if (this.currentSentence[i] === letter) {
                    lettersBox[i].innerText = letter; //wstawiamy w odpowiedni box wybraną literę
                }
            }


            //usuwamy trafioną literę z currentSentenceLetters
            this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, "g"), "");

            //jeżeli już nie ma liter w powyższej zmiennej gracz wygrał
            if (!this.isLetterExists()) {
                this.gameComplete();
            }
        } else {  //nie ma takiej litery w haśle
            this.attempts--;
            this.showAttempts();

            if (this.attempts <= 0) { //jeżeli nie ma już prób...
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
        //pobieramy litery i robimy po nich pętlę włączając je
        const letters  = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = false);
    }

    disableLetters() {
        //pobieramy litery i robimy po nich pętlę wyłączając je
        const letters  = this.elemLetters.querySelectorAll(".game-letter");
        letters.forEach(letter => letter.disabled = true);
    }

    gameOver() {
        // alert("Niestety nie udało ci się odgadnąć hasła. Ps: brzmi ono: \n\n" + this.currentSentence);
        this.dialogLose.show()
        this.disableLetters();
    }

    gameComplete() {
        // alert("Udało ci się zgadnąć hasło :)");\
        this.dialogWin.show()
        this.disableLetters();
    }

    initBoard() {
        this.generateLetterButtons();
        this.bindEvents();
        this.disableLetters(); //przy stworzeniu planszy wyłączamy litery
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
        this.elemSentence.innerText = ''; //czyścimy listę

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
        this.attempts = 5; //ile prób zostało dla aktualnej gry
        this.randomSentence(); //losujemy hasło do zgadnięcia
        this.showAttempts(); //pokazuje liczbę prób
        this.enableLetters(); //włączamy litery
        this.clearDialog();
    }


}


const game = new Game();
