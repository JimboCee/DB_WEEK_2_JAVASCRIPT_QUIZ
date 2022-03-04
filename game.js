const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

let questions = [
    
    {
        question: 'The Developer Academy is based in which UK City?',
        choice1: 'Salisbury',
        choice2: 'London',
        choice3: 'Birmingham',
        choice4: 'Sheffield',
        answer: 'Sheffield'
    },
    {
        question: 'Which singer released their signature song: Dreams, in 1993?',
        choice1: 'Gabrielle',
        choice2: 'Whitney Houston',
        choice3: 'Pantera',
        choice4: 'Yo-Yo Ma',
        answer: 'Gabrielle'
    },
    {
        question: 'I live with my partner and our two Cats, Luna and Goose. How many legs are in my house?',
        choice1: '12',
        choice2: '42',
        choice3: '16',
        choice4: '260348e+',
        answer: '12'
    },
    {
        question: 'Brendan Eich developed Javascript in 1995, what company was he working for at the time?',
        choice1: 'Netscape',
        choice2: 'Mozilla',
        choice3: 'Sun Microsystems',
        choice4: 'Microsoft',
        answer: 'Netscape',
    },
    {
        question: 'What was the first video uploaded to YouTube called?',
        choice1: 'Evolution of Dance',
        choice2: 'Me at the Zoo',
        choice3: 'How to construct additional pylons',
        choice4: 'Linkin_Park_Numb.mp4',
        answer: 'Me at the Zoo',
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion ()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }//keep track of the questions

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


const questionsIndex = Math.floor(Math.random() * availableQuestions.length) //calculate value of question index
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question  //question choice


    choices.forEach(choice => {
        const number = choice.dataset['number']  //understanding which choice is selected
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
        const selectedAnswer = selectedChoice.dataset['number'] //choice 1,2,3,4

        let classToApply = (selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect') 
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            
            
        }

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

console.log(SCORE_POINTS);