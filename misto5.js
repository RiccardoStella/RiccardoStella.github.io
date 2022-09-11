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
      question: "CENTROCAMPISTI - Finden Sie die richtige Antwort",
      choice1: "Nietzsche kritisiert die Religion, weil sie die weltliche Werte zugunsten der geistlichen Werte beiseite lässt;",
      choice2: "Nietzsche kritisiert die Religion, weil sie lässt die weltlichen Werte zugunsten der geistlichen Werte beiseite;",
      choice3: "Nietzsche kritisiert die Religion, weil sie die weltlichen Werte zugunsten der geistlichen Werte beiseite lässt;",
      choice4: "Nietzsche kritisiert die Religion, weil sie die weltlichen Werte zugunsten der geistlichen Werte   lässt beiseite.",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "DIFENSORI - Gemäß Hegel ist die ganze Realität irrational, wenn auch nur ein Teil der Realität irrational wäre; R",
      choice1: "laut Hegel, wenn nur ein Teil der Realität wäre irrational, die ganze Realität würde irrational sein; ",
      choice2: "laut Hegel, wenn nur ein Teil der Realität irrational wäre, die ganze Realität irrational wäre;",
      choice3: "laut Hegel, wenn nur ein Teil der Realität irrational wäre, würde die ganze Realität irrational sein.",
      choice4: "Keine der vorherigen Antworten ist richtig",
      answer: 3, 
  },

         // Domanda 7 

  {
      question: "ATTACCANTI - Gorgias von Leontinoi gehörte zu einer philosophischen Strömung, d.h. die Sophistische Bewegung, die nach Ansicht vieler Autoren die Philosophie abgeschworen hatte, weil sie nicht mehr nach der Wahrheit suchte; R",
      choice1: "Gorgias von Leontinoi gehörte an eine philosophische Strömung, d.h. die Sophistische  Bewegung, deren Mitglieder für ihre Dienste gut bezahlt wurden;",
      choice2: "Gorgias von Leontinoi gehörte an einer philosophischen Bewegung, d.h. der Sophismus, die sich mit der Erziehung der Jünglinge beschäftigte;",
      choice3: "Gorgias von Leontinoi gehörte an einer philosophischen Bewegung, d.h. der Sophismus, die nicht mehr an den überlieferten Werten glaubte.",
      choice4: "Keine der vorherigen Antworten ist richtig",
      answer: 2, 
  
  },

        // Domanda 8 

  {
      question: "PORTIERE - Finden Sie die richtige Antwort",
      choice1: "Heidegger verglich die Rede, die sich nicht um den Sinn des Lebens kümmert, zu dem Gerede;",
      choice2: "Heidegger verglich die Rede, die sich nicht um den Sinn des Lebens kümmert, mit dem Gerede;",
      choice3: "Heidegger verglich die Rede, die sich nicht um dem Sinn des Lebens kümmert, mit dem Gerede;",
      choice4: "Heidegger verglich die Rede, die sich nicht um dem Sinn des Lebens kümmert, zu dem Gerede.",
      answer: 4,
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
            location.href="schermataerrore5.html"
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4 ) {
           location.href= "cambiosquadra5.html"
          
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

