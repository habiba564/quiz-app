const questions = [
    { question: '<i class="fa-sharp fa-solid fa-mango" style="color: #e6b560;"></i> mango ', options: ['fruits', 'vegetables'], correctAnswer: 'fruits' },
    { question: 'carrot', options: ['fruits', 'vegetables'], correctAnswer: 'vegetables' },
    { question: 'watermelon', options: ['fruits', 'vegetables'], correctAnswer: 'fruits' },
    { question: 'apple', options: ['fruits', 'vegetables'], correctAnswer: 'fruits' },
    { question: 'cucumber', options: ['fruits', 'vegetables'], correctAnswer: 'vegetables' },
    { question: 'corn', options: ['fruits', 'vegetables'], correctAnswer: 'vegetables' }
    ];

    let currentQuestionIndex = 0;
    let userScore = 0;
    let userName = '';

    function shuffle(array) {
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    

    function startQuiz() {
        userName = document.getElementById('name').value;
        document.getElementById('start-container').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
    
        // Shuffle the questions before starting the quiz
        shuffle(questions);    
    
        showQuestion();
       
    }



    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').innerText = currentQuestion.question;
    
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = ''; // Reset the options before updating for the current question
    
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(option, currentQuestion.correctAnswer);
            optionsContainer.appendChild(button);
        });

    }

    function checkAnswer(userAnswer, correctAnswer) {
        const isCorrect = userAnswer === correctAnswer;

        if (isCorrect) {
            userScore++;
        }

        // Display correct or wrong sign in the feedback bar
        const feedbackContainer = document.getElementById('feedback');
        feedbackContainer.innerHTML = isCorrect ?
        '<i class="fa-sharp fa-solid fa-circle-check" style="color: #45cb2a;"></i> Correct!' : '<i class="fa-solid fa-square-xmark" style="color: #e73023;"></i>  Wrong!';
        // Disable all buttons to prevent changing the answer
        const optionsContainer = document.getElementById('options');
        const optionButtons = Array.from(optionsContainer.children);
        optionButtons.forEach(optionButton => {
            optionButton.disabled = true;
        });

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                resetOptions(); // Reset options before showing the next question
                showQuestion();
                // Clear the feedback bar for the next question
                feedbackContainer.innerHTML = '';
            }, 1000); // Delay to show feedback before moving to the next question
        } else {
            setTimeout(() => {
                showResult();
            }, 1000); // Delay before showing the result
        }
    }
    
    
    function resetOptions() {
        const optionsContainer = document.getElementById('options');
        const optionButtons = Array.from(optionsContainer.children);
    
        optionButtons.forEach(optionButton => {
            optionButton.disabled = false;
            optionButton.innerHTML = optionButton.innerText;
        });
    }
    
    
    function showResult() {
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('user-name').innerText = `Name: ${userName}`;
        document.getElementById('user-score').innerText = `Score: ${userScore} out of ${questions.length}`;
        // Save username and score in local storage
        const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
        userHistory.push({ name: userName, score: userScore });
        localStorage.setItem('userHistory', JSON.stringify(userHistory));
    }
    
    function showHistory() {
        document.getElementById('result-container').style.display = 'none';
        document.getElementById('history-container').style.display = 'block';
    
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
    
        // Retrieve and display user history from local storage
        const userHistory = JSON.parse(localStorage.getItem('userHistory')) || [];
    
        userHistory.sort((a, b) => b.score - a.score);
    
        userHistory.forEach(player => {
            if (player.name && player.score !== undefined) {
                const listItem = document.createElement('li');
                listItem.innerText =`${player.name}: ${player.score} points`;
                historyList.appendChild(listItem);
            }
        });
    }

    function playAgain(){
        currentQuestionIndex=0;
        userScore=0;
        document.getElementById('result-container').style.display = 'none';
                startQuiz();
    }
