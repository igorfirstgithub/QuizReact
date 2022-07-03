import React from "react"
import AnswerButton from "./AnswerButton"

export default function QuizPage(props) {
    //props now is an object with key and value properties
    // value is an object:
    //                        {question: string,
    //                        answers: [{answer: string,
    //                                   correct: boolean,
    //                                   chosen: boolean                                  
    //                                  }, {}, {}, {}]
    
      
    //console.log(props.value)  ;
      
    // Answer onClick Function - set "chosen" to true   
    function chooseAns(index) {
       console.log(index) 
    }
    
    // Form an array of answer buttons
    const arrButtons = props.value.answers.map((el, index) => <AnswerButton 
    //Here every el is an object with answer {ans, corr, chosen}
        key={index} 
        value={el.answer} 
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