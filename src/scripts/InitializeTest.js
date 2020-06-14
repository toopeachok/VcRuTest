import questions from "@/scripts/QuestionsData";
const vkLogoUrl = require('@/images/social-links-images/vk-social-logotype.svg')
const facebookLogoUrl = require('@/images/social-links-images/facebook-logo.svg')
const twitterLogoUrl = require('@/images/social-links-images/twitter-logo-silhouette.svg')

const getQuestionHTML = i => {

  const correctAnswer = questions[i].correct;

  let buttonsHTML = ``

  questions[i].answers.forEach((answer, index) => {
    index === correctAnswer - 1 ? buttonsHTML += `<button class="button answer-btn" data-btn-index="${i},${index}" data-btn-type="answer-btn" data-correct-answer="true">${answer}</button>`
      : buttonsHTML += `<button class="button answer-btn" data-btn-index="${i},${index}" data-btn-type="answer-btn">${answer}</button>`
  })

  const questionHTML = `
    <h2 class="question-title">${questions[i].title}</h2>
    ${buttonsHTML}
  `

  return questionHTML

}

const addAnswerButtonsListener = () => {
  $root.querySelectorAll('[data-btn-type]').forEach(btn => {
    if (btn.dataset.btnType === 'answer-btn') {
      btn.addEventListener('click', showAnswerResult)
    }
  })
}

const removeAnswerButtonsListener = () => {
  $root.querySelectorAll('[data-btn-type]').forEach(btn => {
    if (btn.dataset.btnType === 'answer-btn') {
      btn.removeEventListener('click', showAnswerResult)
    }
  })
}

const renderQuestion = () => {
  const questionHTML = getQuestionHTML(index)

  // $root.innerHTML = getQuestionHTML(index)

  $root.innerHTML = `
    <div class="question-page">
      <div class="question-page__content">
        <span class="question-number">${index + 1}/${questions.length}</span>
        ${questionHTML}
      </div>
    </div>
  `

  addAnswerButtonsListener()

  index++
}

const showNextQuestion = () => {

  if (index !== questions.length) {

    removeNextQuestionBtnListener()

    renderQuestion()

  } else {
    showTestResults()
  }

}

const addNextQuestionBtnListener = () => {
  $root.querySelector('#next-question-btn').addEventListener('click', showNextQuestion)
}

const removeNextQuestionBtnListener = () => {
  $root.querySelector('#next-question-btn').removeEventListener('click', showNextQuestion)
}

const showAnswerResult = event => {

  const questionIndex = (event.target.dataset.btnIndex).split(',')[0]
  const answerIndex = (event.target.dataset.btnIndex).split(',')[1]

  removeAnswerButtonsListener()

  const currentQuestion = questions[questionIndex]

  let answerBtnHTML = ``

  if (event.target.dataset.correctAnswer) {
    ++correctAnswersCount

    answerBtnHTML = `<button class="button answer-btn correct-answer-btn" disabled>${currentQuestion.answers[answerIndex]}</button>`
  } else {
    answerBtnHTML = `<button class="button answer-btn incorrect-answer-btn" disabled>${currentQuestion.answers[answerIndex]}</button>`
  }

  $root.innerHTML = `
    <div class="question-page answer-result-page">
      <div class="question-page__content">
         <span class="question-number">${index}/${questions.length}</span>
        <h2 class="question-title">${currentQuestion.title}</h2>
        ${answerBtnHTML}
        <p class="answer-text">${currentQuestion.answersText[answerIndex]}</p>
        <button class="next-question-btn" id="next-question-btn">Продолжить</button>
      </div>
    </div>
  `

  addNextQuestionBtnListener()

}

const showTestResults = () => {
  removeAnswerButtonsListener()
  removeNextQuestionBtnListener()

  index = 0

  let imgNumber = 0;

  let resultText = ''

  if (correctAnswersCount <= 0) {
    imgNumber = 1
    resultText = 'Мне больше интересен футбол'
  }
  else if (correctAnswersCount <= 3) {
    imgNumber = 2
    resultText = 'Читаю vc.ru с экрана попутчика в метро'
  }
  else if (correctAnswersCount <= 5) {
    imgNumber = 3
    resultText = 'Бизнес это интересно, но где взять столько времени?'
  }
  else if (correctAnswersCount <= 7) {
    imgNumber = 4
    resultText = 'Читаю vc.ru каждый день, но работать тоже нужно'
  }
  else if (correctAnswersCount <= 8) {
    imgNumber = 5
    resultText = 'Я работаю в редакции vc.ru'
  }

  $root.innerHTML = `
      <div class="test-results-page results-${imgNumber}">
        <div class="test-results-page__content">
          <p class="correct-answers-count">${correctAnswersCount} из ${questions.length} правильных ответов</p>
          <h2 class="results-title">${resultText}</h2>
          <a class="social-links" href="#!">
            <span class="facebook-link">
              <img src="${facebookLogoUrl.default}" alt="">
            </span>
          </a>
          <a class="social-links" href="#!">
            <span class="vk-link">
              <img src="${vkLogoUrl.default}" alt="">
            </span>
          </a>
          <a class="social-links" href="#!">
            <span class="twitter-link">
              <img src="${twitterLogoUrl.default}" alt="">
            </span>
          </a>
          <button class="start-test-again-btn" id="start-test-btn">Пройти еще раз</button>
        </div>
      </div>
    `

  addStartTestBtnListener()

  correctAnswersCount = 0

}

const addStartTestBtnListener = () => {
  $root.querySelector('#start-test-btn').addEventListener('click', renderQuestion)
}

const removeStartTestBtnListener = () => {
  $root.querySelector('#start-test-btn').removeEventListener('click', renderQuestion)
}


let index = 0

let correctAnswersCount = 0;

const $root = document.getElementById('test-root')

const initializeTest = () => {

  addStartTestBtnListener()

}

export default initializeTest