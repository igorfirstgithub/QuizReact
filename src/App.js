import React from "react"
import QuizPage from "./QuizPage"


export default function App() {
    
    const initialState = [
    
    {
            "category":             "Science: Mathematics",
            "type":                 "multiple",
            "difficulty":           "easy",
            "question":             "What&#039;s the square root of 49?",
            "correct_answer":       "7",
            "incorrect_answers":    ["4","12","9"]
        },
        
        {"category":"Science: Mathematics","type":"multiple","difficulty":"easy","question":"What prime number comes next after 19?","correct_answer":"23","incorrect_answers":["25","21","27"]},
        
        {"category":"Science: Mathematics","type":"multiple","difficulty":"easy","question":"What is the correct order of operations for solving equations?","correct_answer":"Parentheses, Exponents, Multiplication, Division, Addition, Subtraction","incorrect_answers":["Addition, Multiplication, Division, Subtraction, Addition, Parentheses","Parentheses, Exponents, Addition, Substraction, Multiplication, Division","The order in which the operations are written."]}];
    
    //Logical flag to change pages - Invitation page (0)  or  Quizpage (1)
    const [selectPage, setSelectPage] = React.useState(false);
    
    //An array with questions and answers is our central element in state
    const [quizData, setQuizData] = React.useState(initialState);
    
    const [checkAnswers, setCheckAnswers] = React.useState(false);
    
    React.useEffect(() => {
        
    }, [checkAnswers])
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple").
        then(res => res.json()).
        then(res => setQuizData(res.results.
        
        map(question => {
        return {
            question: question.question,
            answers: getAnswerArray(question)
        }
        
            })))
    }, [])
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple").
        then(res => res.json()).
        then(res => setQuizData(res.results.
        
        map(question => {
        return {
            question: question.question,
            answers: getAnswerArray(question)
        }
        
            })))
    }, [selectPage])
   
   
        
    // Forming an array of questions with its answers
    // It seems I should form the complete version of state precisely here
    //const quizArray = quizData.map( (el, index) => <QuizPage key={index} value={el}  /> )
    
    //every el contains property "question", "correct_answer", "incorrect_answers"
    
    function getAnswerArray(question) {
        
        //Combining all answers together - both correct and incorrect [+ - - -]
        const answerArray = [question.correct_answer, ...question.incorrect_answers];
        
        //Convert each answer in an object with additional properties "true" and "chosen"
        const ansObjects = answerArray.map((el, index) => {
            if (index === 0) {
                return {answer: el, correct: true, chosen: false}
            } else {
                return {answer: el, correct: false, chosen: false}
            }
        });
        
        
        // Remove the correct answer from the beginning of the array to some random place
        let randomPos = Math.floor(Math.random() * ansObjects.length);
        let temp = ansObjects[randomPos];
        ansObjects[randomPos] = ansObjects[0];
        ansObjects[0] = temp;
        
        //console.log(ansObjects);
        
        return ansObjects;
    }
    
    function chooseQuest(ansIndex, questIndex) {
        //console.log("ans=", ansIndex, " quest=", questIndex);
        setQuizData(oldQuizData => oldQuizData.map((quest, indexQ) => {
            if (indexQ === questIndex) {
                return {...quest, answers: quest.answers.map((answer, indexA) => {
                    if (indexA === ansIndex) {
                        return {...answer, chosen: !answer.chosen}
                    } else {
                        return {...answer, chosen: false}
                    }
                })}
            } else {
                return quest;
            }
        }))
        
        //console.log(quizData);
    }
    //------------------------------- Creating main structure ----------------------
    
    
    const quizArray = quizData.map( (quest, index) => <QuizPage 
    
            key={index} 
            value={quest}
            questIndex={index}  
            chooseQuest={chooseQuest}
            modeCheck={checkAnswers}
    
    /> )
    
    
    
   
   
  
  // Click on the Start quiz button on the invitation page 
    // 1 - move to quiz page     
    // 2 - get the data from API
    function changePage() {
        
       setSelectPage(prevPage => !prevPage); // Toggle page bit
       
       // Get the quiz data from API
     /*   fetch("https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple").
        then(res => res.json()).
        then(res => setQuizData(res.results.
        
        map(question => {
        return {
            question: question.question,
            answers: getAnswerArray(question)
        }
        
            })))
    
        */
        
      /*  setQuizData(oldQuizData => oldQuizData.map(question => {
        return {
            question: question.question,
            answers: getAnswerArray(question)
        }
        
    }))
    
    */
       
        
        // Get the quiz data from API
       // fetch("https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple").
        //then(res => res.json()).
        //then(res => setQuizData(res.results));  
        
        //setQuizData();
    
    //console.log(quizData);
    
        
        // res.results - an array of object, each object is a set of data concerning a question
        // there is much information, among which is info of interest: question, correct answer, incorrect answers
    }
    
    
    function checkingAnswers() {
        setCheckAnswers(true);
    }
    
    function startNewGame() {
        setSelectPage(oldState => !oldState);
        setCheckAnswers(false);
    }
    
    function numCorrAnswers() {
        return quizData.filter(quest =>
         quest.answers.filter(answer => answer.chosen && answer.correct).length > 0).length;
    }
   
   //--------------------------------- Return Block -------------------------------------- 
    
    if (!selectPage) { // Start page
        return (
            <div>
                <h1>Quizzical</h1>
                <p>Welcome to our Math Quiz</p>
                <button type="button" onClick={changePage}>Start quiz</button>
            </div>
            )
    }    
    
   else {            // Quiz page
        return (
            <div>
                {quizArray}
                <button type="button" onClick={checkAnswers ? startNewGame : checkingAnswers }>
                    {checkAnswers ? "Start new quiz" : "Submit answers"}
                </button>
                {checkAnswers && <h3>You have got {numCorrAnswers()}/{quizData.length}</h3>}
            </div>
        )
    }
    
}