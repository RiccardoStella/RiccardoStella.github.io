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
      question: "DIFENSORI - Wer schrieb „Phänomenologie des Geistes“?",
      choice1: "Hegel",
      choice2: "Kant",
      choice3: "Schopenhaurer",
      choice4: "Jonas",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "PORTIERE - „Vergessen die Herren denn ganz, dass X ein Liederdichter ist, neben dem nur noch Goethe genannt werden darf?“ – Otto von Bismarck: um 1890. Wer ist X?",
      choice1: "X ist Hermann Hesse, der Meisterwerke wie z.B. Narziß und Goldmund geschrieben hat;",
      choice2: "X ist Gertrud von le Fort; die auch die Dichterin der Transzendenz genannt wurde;",
      choice3: "X ist Heinrich Heine, der Dichter, Schriftsteller und auch Journalisten war;",
      choice4: "X ist Ernst Jünger, Autor eines Kriegstagebuches das zu einem Welterfolg wurde.",
      answer: 4, 
  },

         // Domanda 7 

  {
      question: "ATTACCANTI - In dem von Bertold Brecht verfassten Drama „Leben des Galilei“,",
      choice1: "wird der berühmte italienische Mathematiker von seinen Schülern und Zöglingen beschimpft;",
      choice2: "behauptet Galilei, dass sein Widerruf vor der Inquisition eine schmerzhafte Entscheidung war, die es ihm jedoch ermöglichte, seine Forschungen fortzusetzen;",
      choice3: "beschuldigt in einer der letzten Szenen Galileis Schüler Andrea Sarti den Lehrer der Feigheit, weil er die Wissenschaft verraten hätte;",
      choice4: "bleibt Galilei von der Richtigkeit seiner Entscheidung seine Lehre zu wiederrufen überzeugt, obwohl er auch von all seinen Schülern verlassen wird.",
      answer: 2, 
  
  },

        // Domanda 8 

  {
      question: "CENTROCAMPISTI - „Wahr ist’s. Diese Buchstaben stehen nicht drinnen. Aber wo man’s will klar verdeutschen, so gehöret es hinein.“ Diese Worte wurden gesprochen von…",
      choice1: "Luther, um seine Übersetzung der Bibel zu rechtfertigen, die das Wort “allein” mit Bezug auf den Glauben einführt, welches nicht im Text steht;",
      choice2: "Luther, um seine Übersetzung der Bibel zu rechtfertigen, die das Wort „Pastor“ anstelle des Wortes “Papst” benutzt;",
      choice3: "der katholischen Kirche, die das Wort „Papst“ in ihrer Erklärung der Bibel einführt;",
      choice4: "der katholischen Kirche, die das Wort „Papst“ in ihrer lateinischen Übersetzung der Bibel einführt.",
      answer: 3,
  },

  

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
            alert("Peccato! La risposta CORRETTA è la numero " + currentQuestion.answer + "!")
            location.href="schermataerrore4.html"
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4 ) {
           location.href= "cambiosquadra3.html"
          
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

