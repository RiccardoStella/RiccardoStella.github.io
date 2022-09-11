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
      question: "ALI - Statt der zuvor üblichen Übersetzungsmethode des „Wort für Wort“ wählte Luther die Methode des „Sinn für    Sinn“, um…",
      choice1: "den biblischen Text besser zu “verdeutschen”;",
      choice2: "die Leute zu überzeugen, dass die Reformation recht hatte;",
      choice3: "zu zeigen, dass die katholische Bibelübersetzung nicht getreu übersetzt worden war;",
      choice4: "den religiösen Wert des biblischen Textes besser zu erklären.",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "CENTROCAMPISTI - Zu den Autoren, die dem Sturm und Drang angehören, kann man die folgenden zählen:",
      choice1: "Johann Wolfgang Goethe und Friedrich Schiller, der u.a. ein Schauspiel für Liebende schrieb;",
      choice2: "Johann Georg Hamann (1730–1788), der u.a. die Sokratische Denkwürdigkeiten schrieb, und Christian Schubart;",
      choice3: "Johann G. Herder, der u.a Lenore schrieb, und Gottfried August Bürger;",
      choice4: "Johann G. Herder und Jakob Michael Reinhold, der u.a. Prometheus schrieb.",
      answer: 1, 
  },

     

  
        // Domanda 8 

  {
      question: "ATTACCANTI - Wenn Erasmus sagt, dass „Ich bin ganz und gar nicht der Meinung derer, die nicht wollen, dass die göttlichen Buchstaben in eine Volkssprache übersetzt werden“, will er damit sagen, dass…",
      choice1: "es keine schlechte Idee ist, die Bibel ins Deutsche zu übersetzen;",
      choice2: "es nicht zwingend erforderlich ist, die Bibel in eine Volkssprache zu übersetzen;",
      choice3: "es möglich ist, die Bibel nicht nur in Latein zu übersetzen;",
      choice4: "es möglich, aber nicht ratsam ist, die Bibel ins Deutsche zu übersetzen.",
      answer: 2,
  },

        // Domanda 9 

  {
    question: "PORTIERE - Der gesuchte Autor ist entweder Rainer M. Rilke, oder Thomas Mann, oder Franz Kafka oder Bertold Brecht. Man weiß, dass der gesuchte Autor 1955 gestorben ist, dass er ein Dramaturg, ein Regisseur war und ein engagierter Dichter war. Darüber hinaus, weiß man dass:",
    choice1: "Rilke sehr berühmte Dramatische Werke geschrieben hatte, darunter „Waisenkinder“, und dann auch nur Dichtungen und Prosa; Wer ist dieser Autor?",
    choice2: "Mann gerne „vornehm über den Dingen“ stehen wollte;Mann gerne „vornehm über den Dingen“ stehen wollte;",
    choice3: "Brecht im Jahr 1923 sein erste Regiearbeit, Leben Eduards des Zweiten von England, fertigstellte;",
    choice4: "Kafka sich in seiner Jugendzeit dem Sozialismus zuwandte, aber dass in seiner Reifezeit seine Werke von seiner persönlichen Erfahrung geprägt waren.",
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
            alert("Peccato! La risposta CORRETTA è la numero " + currentQuestion.answer + "!")
            
        
        }

    // Se TUTTE le risposte sono GIUSTE, il punteggio della squadra aumenta di un punto 
        if( questionCounter == 4 ) {
           location.href= "dfat2.html"
          
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

