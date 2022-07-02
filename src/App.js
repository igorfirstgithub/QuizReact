import React from "react"
import QuizPage from "./QuizPage"

export default function App() {
    
    // What for?? - Presumably useless
    //const startArray = [];
    
    //Logical flag to change pages - Invitation page (0)  or  Quizpage (1)
    const [selectPage, setSelectPage] = React.useState(false);
    
    //An array with questions and answers
    const [quizData, setQuizData] = React.useState([]);
    
    // What for?? - Presumably useless  
    /*for (let i = 0; i < 3; i++) {
        startArray.push(i+1);
    }
    */
    
    // Forming an array of questions with its answers
    // It seems I should form the complete version of state precisely here
    //const quizArray = quizData.map( (el, index) => <QuizPage key={index} value={el}  /> )
    const quizArray = quizData.map( (el, index) => <QuizPage key={index} value={el}  /> )
    
    
    // Click on the Start quiz button on the invitation page 
    // 1 - move to quiz page     
    // 2 - get the data from API
    function changePage() {
        
        setSelectPage(prevPage => !prevPage); // Toggle page bit
        
        // Get the quiz data from API
        fetch("https://opentdb.com/api.php?amount=3&category=19&difficulty=easy&type=multiple").
        then(res => res.json()).
        then(res => setQuizData(res.results));
        // res.results - an array of object, each object is a set of data concerning a question
        // there is much information, among which is info of interest: question, correct answer, incorrect answers
    }
   
   
   
   //--------------------------------- Return Block -------------------------------------- 
    
    if (!selectPage) { // Start page
        return (
            <div>
                <h1>Qizzical</h1>
                <p>Welcome to our Math Quiz</p>
                <button type="button" onClick={changePage}>Start quiz</button>
            </div>
            )
    } else {            // Quiz page
        return (
            <div>
                {quizArray}
                <button type="button">Submit answers</button>
            </div>
        )
    }
}