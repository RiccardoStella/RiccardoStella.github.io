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
      question: "Finden Sie die richtige Antwort",
      choice1: "Am Ende seines Lebens Sokrates wusste, dass er die Wahrheit nicht mehr hätte erreichen können;",
      choice2: "am Ende seines Lebens wusste Sokrates, dass er die Wahrheit nicht mehr hätte erreichen können;",
      choice3: "Sokrates wusste am Ende seines Lebens, dass er die Wahrheit nicht mehr erreichen können hatte;",
      choice4: "am Ende seines Lebens wusste Sokrates, dass er die Wahrheit hatte nicht mehr erreichet gekonnt.",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "Finden Sie die richtige Antwort",
      choice1: "Plato hat in seinen „Dialogen“ gesagt, dass Sokrates seinen Anhängern helfen habe, über den  Sinn des Lebens nachzudenken; ",
      choice2: "in seinen „Dialogen“ hat Plato gesagt; dass Sokrates seinen Anhängern über den Sinn des Lebens hat nachzudenken helfen;",
      choice3: "in seinen „Dialogen“ hat Plato gesagt, dass Sokrates seinen Anhängern geholfen hat, über den Sinn des Lebens nachzudenken;",
      choice4: "In seinen „Dialogen“ Plato hat gesagt, dass Sokrates seinen Anhängern über den Sinn des Lebens hat nachdenken helfen.",
      answer: 3, 
  },

         // Domanda 7 

  {
      question: "Finden Sie die richtige Antwort",
      choice1: "Ein wichtiges schweizerisches UNESCO-Weltkulturerbe ist das Benediktinerkloster Müstair, das an der Grenze von Südtirol liegt und von Kaiser Karl Habsburg gebaut wurde;",
      choice2: "ein wichtiges schweizerisches UNESCO-Weltkulturerbe ist das Benediktinerkloster Müstair, das im Spätmittelalter gebaut wurde und den größten religiösen Freskenzyklus enthält;",
      choice3: "ein anderes wichtiges schweizerisches UNESCO-Weltkulturerbe ist die Jungfrau-Aletsch-Bietschhorn, dem die berühmtesten Berge der Schweiz, darunter das Zinalrothorn und das Weisshorn, angehören;",
      choice4: "es gibt zumindest einen schweizerischen Gletscher, der vom UNESCO-Weltkulturerbe geschützt wird.",
      answer: 2, 
  
  },

        // Domanda 8 

  {
      question: "Finden Sie die richtige Antwort",
      choice1: "Wilhelm Tell ist der Nationalheld der Schweiz, und symbolisiert den Willen, sich jeder fremden Unterdrückung zu widersetzen;",
      choice2: "Wilhelm Tell ist der Nationalheld der Schweiz, und symbolisiert den Willen, sich jeder fremden Unterdrückung zu widersetzen;",
      choice3: "Wilhelm Tell ist der Nationalheld der Schweiz, und symbolisiert u.a. eine Nation, die eine vernünftige Herrschaft anerkennt;",
      choice4: "vor etwas mehr als 200 Jahren erschien der Roman „William Tell“ von Schiller.",
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
            location.href="fine.html"
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4 ) {
           location.href= "fine.html"
          
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

