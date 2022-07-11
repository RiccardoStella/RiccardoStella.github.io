
// Import delle risorse 

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

     // Domanda 1 

    {
        question: 'Europa verdankt seinen Namen',
        choice1: 'einem griechischen Mädchen, dessen Geschichte in der kleinasiatischen Mythologie erzählt wird',
        choice2: 'einem griechischen Mädchen, das so schön war, dass es von Zeus entführt wurde',
        choice3: 'einem kleinasiatischen Mädchen, welches einige Söhne mit einem angeblichen "Jüngling" zeugte',
        choice4: 'einem schönen kleinasiatischen Mädchen, welches Zeus in der Form eines attraktiven Schwans bereitwillig folgte',
        answer: 4,
    },

    // Domanda 2 

    {
        question: "Die Werte, die zum Selbstverständnis der Europäer gehören, wurden unter anderem entwickelt:",
        choice1: "In der Zeit des römischen Reiches, der protestantischen Reformation und der Erleuchtung;",
        choice2: "von Völkern, die vor Christus lebten;",
        choice3: "von Literaten (wie z.B. Mark Twain, Thomas Eliot) sowie Theologen (wie z.B. Thomas von Aquin und Luther) und Philosophen;",
        choice4: "vor allem während der Aufklärung, die die Grundlagen zu den Ideen von Demokratie, Justiz und Toleranz legte.",
        answer: 2,
    },

    // Domanda 3 

    {
        question: "Auf dem langen Weg zu Europa",
        choice1: "legten die Römischen Verträgen, die 1951 unterzeichnet wurden, die Grundlage für die Europäische Gemeinschaft für Kohle und Stahl (EGKS) und die heutige EU;",
        choice2: "geht der Maastricht-Vertrag, der in 1993 in Kraft trat, der Einführung des Euro voraus und folgt der Abschaffung von Personen- und Warenkontrolle an Binnengrenzen;",
        choice3: "bot die Verabschiedung einer europäischen Verfassung die Bedingungen für spätere Reformen, die den freien Personen- und Warenverkehr in Europa betrafen;",
        choice4: "hat es weniger als 10 Jahren gebraucht, um die Entscheidung zu verwirklichen, die nationale Währung mit Euro- Banknoten und Münzen in 12 Staaten zu ersetzen.",
        answer: 3,
    },

       // Domanda 4 

    {
        question: "Die Völkerwanderung ist ein historischer Prozess,",
        choice1: "der nach dem Sieg von Arminius gegen Varus in der Varusschlacht begann;",
        choice2: "der nach einigen Jahrzehnten durch den Tod Kaiser Hadrians (138 n. Chr.) ausgelòst wurde.",
        choice3: "der den germanischen Völksstämmen ermöglichte, dauerhaft den Hafen von Aquileia in der Adria zu besetzen;",
        choice4: "dessen Hauptereignis die Besetzung des Hafens von Aquileia an der Adria war.",
        answer: 3,
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
            alert("Peccato! La risposta CORRETTA è la numero " + currentQuestion.answer + "!")
            location.href="schermataerrore.html"
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4) {
           location.href= "schermataerrore.html"
          
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

