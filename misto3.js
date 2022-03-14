const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

// Variabili di Base 

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let punteggio = 0
let availableQuestions = []

// Domande Quiz 

let questions = [

    // Domanda 5 

  {
      question: "Chi scrisse 'Phänomenologie des Geistes'?",
      choice1: "Hegel",
      choice2: "Kant",
      choice3: "Schopenhaurer",
      choice4: "Cartesio",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "Quali nazioni sono separate dal 38° Parallelo?",
      choice1: "Tagikistan e Kazakhistan ",
      choice2: "Mongolia e Cina",
      choice3: "Corea del Nord e Corea del Sud",
      choice4: "Austira e Svizzera",
      answer: 3, 
  },

         // Domanda 7 

  {
      question: "Chi formulò le nuove regole per la stesura di poesia e prosa della letteratura italiana nel 1516?",
      choice1: "Giuseppe Parini",
      choice2: "Pietro Bembo",
      choice3: "Teofilo Folengo",
      choice4: "Gaspara Stampa",
      answer: 2, 
  
  },

        // Domanda 8 

  {
      question: "Quale di questi primi ministri italiani fece cambiare in segreto lo schieramento italiano durante la I Guerra Mondiale?",
      choice1: "Giovanni Giolitti",
      choice2: "Francesco Crispi",
      choice3: "Giulio Andreotti",
      choice4: "Sidney Sonnino",
      answer: 4,
  },

        // Domanda 9 

  {
    question: "Quale di questi magistrati non faceva parte della Task Force creata per Tangentopoli?",
    choice1: "Antonio Ingroia",
    choice2: "Antonio Di Pietro",
    choice3: "Ilda Boccassini",
    choice4: "Francesco Greco",
    answer: 1,
  }



]

//  Funzioni di Gioco

//  Variabili della Progess Bar 

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// Funzione di Gioco Principale 

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

  // Nuova Domanda dopo aver dato la risposta alla precedente

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Domanda ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
// Domande in oridne casuale

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    // Rileva risposta scelta

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

// Selezionare una Domanda Random 

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

    // Determina la risposta data dal player 
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        // Redirecting del Player ==>  Se la risposta è sbagliata porti il player sulla pagina del video di errore 

        if(currentQuestion.answer != selectedAnswer) {
            location.href="schermataerrore3.html"
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4 ) {
           location.href= "misto4.html"
          
        }

        // Se la risposta è giusta ikl player passa alla domanda successiva 

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

//  Aumentare il punteggio se la risposta è corretta

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}



// Avvio del gioco

startGame()

