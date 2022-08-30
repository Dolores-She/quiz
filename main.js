
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');  // вопрос

const numberOfQuestion = document.getElementById('number-of-question'),  //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // все вопросы

let indexOfQuestion,  //индекс текущего вопроса
    indexOfPage = 0;   //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next');  // кнопка далее

let score = 0;  //результат викторины

const correctAnswer = document.getElementById('correct-answer'),  //количество праивльных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // кол-во всех вопросов
      btnTryAgain = document.getElementById('btn-try-again'); // начать заново

const questions = [ 
   {
    question: 'Какие значения можно хранить в переменных?',
    options: [
        'Только числа и строки',
        'Строки, числа с точкой, простые числа и булевые выражения',
        'Строки, числа с точкой и простые числа',
        'Числа с точкой, простые числа и булевые выражения',
       ],
    rightAnswer: 1
    },
    {
        question: 'Где верно указан вывод данных?',
        options: [
            'print(Hello);',
            'documentWrite("Hello");',
            'console.log("Hello");',
            'write("Hello");',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая переменная записана неверно?',
        options: [
            'var num = "STRING";',
            'var b = false;',
            'var isDone = 0;',
            'var number = 12,5;',
        ],
        rightAnswer: 3
    }
];

numberOfAllQuestions.innerHTML = questions.length; //выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос
 // маппим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей стр.
    indexOfPage++;
};

let completedAnswers = [] //массив для заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0) {
        completedAnswers.forEach(item => {
            if(item == randomNumber) {
                hitDuplicate = true;
            }
        });
        if(hitDuplicate) {
            randomQuestion();
        }else {
            indexOfQuestion = randomNumber;
            load();
        }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};
const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++; 
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}
for(option of optionElements) {
    option.addEventListener('click' , e => checkAnswer(e));
}
const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}
//удаление всех классов с ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const updateAnswerTracker = status => {
answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    }else {
        randomQuestion();
        enableOptions();
    }
}



const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);


btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load',() => {
    randomQuestion();
    answerTracker();
});
