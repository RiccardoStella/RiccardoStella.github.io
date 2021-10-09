const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Quale di queste nazioni non esiste più oggi?',
        choice1: 'Isole Kayman',
        choice2: 'Kiribati',
        choice3: 'Saint Lucia',
        choice4: 'Prussia',
        answer: 4,
    },
    {
        question:
            "Nella bandiera di quale nazione è raffigurato il tempio di Angkor Wath?",
        choice1: "Laos",
        choice2: "Cambogia",
        choice3: "Singapore",
        choice4: "Nepal",
        answer: 2,
    },
    {
        question: "Quanti Americani credono che il latte al cioccolato venga prodotto da mucche marroni?",
        choice1: "20%",
        choice2: "18%",
        choice3: "7%",
        choice4: "33%",
        answer: 3,
    },
    {
        question: "Chi tra questi sovrani appartiene alla dinastia Tudor?",
        choice1: "Giacomo I",
        choice2: "Cristiano IV",
        choice3: "Elisabetta I",
        choice4: "Filippo II",
        answer: 1,
    },

    {
        question: "Chi scrisse 'Phänomenologie des Geistes'?",
        choice1: "Hegel",
        choice2: "Kant",
        choice3: "Schopenhaurer",
        choice4: "Cartesio",
        answer: 1,
    },

    {
        question: "Quali nazioni sono separate dal 38° Parallelo?",
        choice1: "Tagikistan e Kazakhistan ",
        choice2: "Mongolia e Cina",
        choice3: "Corea del Nord e Corea del Sud",
        choice4: "Austira e Svizzera",
        answer: 3, 
    },

    {
        question: "Chi formulò le nuove regole per la stesura di poesia e prosa della letteratura italiana nel 1516?",
        choice1: "Giuseppe Parini",
        choice2: "Pietro Bembo",
        choice3: "Teofilo Folengo",
        choice4: "Gaspara Stampa",
        answer: 2, 
    
    },

    {
        question: "Quale di questi primi ministri italiani fece cambiare in segreto lo schieramento italiano durante la I Guerra Mondiale?",
        choice1: "Giovanni Giolitti",
        choice2: "Francesco Crispi",
        choice3: "Giulio Andreotti",
        choice4: "Sidney Sonnino",
        answer: 4,
    },

    {
      question: "Quale di questi magistrati non faceva parte della Task Force creata per Tangentopoli?",
      choice1: "Antonio Ingroia",
      choice2: "Antonio Di Pietro",
      choice3: "Ilda Boccassini",
      choice4: "Francesco Greco",
      answer: 1,
    }, 

    {
        question: "Chi è l'autore del romanzo 'I Miserabili'?",
        choice1: "Giovanni Verga",
        choice2: "Elsa Morante",
        choice3: "Victor Hugo",
        choice4: "Leonardo Sciascia",
        answer: 3, 
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

