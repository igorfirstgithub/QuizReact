import React from "react"
import AnswerButton from "./AnswerButton"

export default function QuizPage(props) {
    
    //Combining all answers together - both correct and incorrect [+ - - -]
    const answerArray = [props.value.correct_answer, ...props.value.incorrect_answers];
    
    //Convert each answer in an object with additional properties "true" and "chosen"
    const ansObjects = answerArray.map((el, index) => {
        if (index === 0) {
            return {val: el, correct: true, chosen: false}
        } else {
            return {val: el, correct: false, chosen: false}
        }
    });
    
    // Remove the correct answer from the beginning of the array to some random place
    let randomPos = Math.floor(Math.random() * 4);
    let temp = ansObjects[randomPos];
    ansObjects[randomPos] = ansObjects[0];
    ansObjects[0] = temp;
    
    // Answer onClick Function - set "chosen" to true   
    function chooseAns(index) {
       console.log(index) 
    }
    
    // Form an array of answer buttons
    const arrButtons = ansObjects.map((el, index) => <AnswerButton 
    
        key={index} 
        value={el} 
        chooseAns={() => chooseAns(index)}
    
    />)
    
    
    
    return(
        <div>
            <p>{props.value.question}</p>
            {arrButtons}
            <hr />
        </div>
    )
}