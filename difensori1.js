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
      question: "ALI - Die Hansa war ein Bund…",
      choice1: "…deutscher Hafenstädte, die sich zusammengeschlossen hatten, um ihre wirtschaftlichen Interessen zu fördern;",
      choice2: "dem viele Hafenstädte angehörten, wie z.B. Hamburg und Caen, und gemeinsame Geschäftsinteressen hatten;",
      choice3: "der im Frühmittelalter gegründet und erst im Spätmittelalter aufgelöst wurde;",
      choice4: "der aus geschäftlichen Gründen gegründet wurde und sich aus Kriegsgründen auflöste.",
      answer: 1,
  },

       // Domanda 6 

  {
      question: "CENTROCAMPISTI - Man kann wohl sagen, dass…",
      choice1: "mit der protestantischen Reformation die deutsche Welt vom Mittelalter definitiv Abschied nahm; ",
      choice2: "Luther während einer Übergangszeit zwischen Katholizismus und Protestantismus lebte;",
      choice3: "Luther dachte, dass gute Taten eine notwendige aber nicht ausreichende Bedingung der Seligkeit waren;",
      choice4: "gleich nach der Veröffentlichung der 95 Thesen, der Papst Luther zum Widerruf aufforderte.",
      answer: 3, 
  },

         // Domanda 7 

  {
      question: "PORTIERE - Die Berliner Mauer wurde von der DDR-Regierung bald nach dem Ungarn-Aufstand errichtet, um die Flucht nach Westen zu verhindern;",
      choice1: " Die Berliner Mauer wurde von der DDR-Regierung bald nach dem Ungarn-Aufstand errichtet, um die Flucht nach Westen zu verhindern;",
      choice2: "die Berliner Mauer wurde von der DDR-Regierung einige Jahre nach dem Ungarn-Aufstand gebaut, weil die Zahl der Flüchtlinge aus der DDR viel höher als die aus der BDR war;",
      choice3: "die Berliner Mauer wurde von der DDR-Regierung errichtet, um sich besser vor möglichen Nato-Angriffe zu schützen;",
      choice4: "ein USA Präsident stattete Berlin einen historischen Besuch ab, um die Spannung zwischen den beiden deutschen Staaten abzubauen, trotzdem beschloss die DDR-Regierung, die Berliner Mauer zu errichten.",
      answer: 2, 
  
  },

        // Domanda 8 

  {
      question: "ATTACCANTI - Die Potsdamer Konferenz fand nicht am Ende des Zweiten Weltkriegs an der Westfront, sondern nach dessen Ende nämlich in Juli 1945 statt",
      choice1: "Mussolini wollte Griechenland 1940 angreifen, d.h. ein Jahr nach Hitlers Angriff auf Polen",
      choice2: "Es ist wahr, dass Hitler durch das Ermächtigungsgesetz fast die volle Macht erhielt, weil die gesetzgebende Gewalt faktisch vollständig auf seine Person übertragen wurde",
      choice3: "1948 begannen die alleierten Westmächte Berlin mit einer Luftbrücke zu versorgen, weil die Sowjetunion den Landweg nach Berlin durch ihre Besatzungszone blockiert hatte",
      choice4: "Nach dem Krieg wurde Berlin nicht in drei, sondern in vier Einflussbereiche unterteilt, ein Sektor für jede Siegermacht, die an der Potsdamer Konferenz teilgenommen hatte, plus einen für Frankreich",
      answer: 3,
  },

        // Domanda 9 

  {
    question: "DIFENSORI - Nach dem Niederdang der Weimarer Republik, verursachte die Weltwirtschaftskrise von 1929 viele soziale Unruhen, die ihrerseits systematisch die Bildung rechter Mehrheiten begünstigte;",
    choice1: "Hitler griff einen Staat an, mit dem er zuvor einen Nichtangriffspakt unterzeichnet hatte;",
    choice2: "nur ein paar Jahre nach dem Unterzeichen des Dreimächtepakts griff Japan die USA an;",
    choice3: "im Januar 1943 wurde die deutsche Armee in der Schlacht um Leningrad besiegt.",
    
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
           location.href= "dfat1.html" 
          
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
