import React from "react"

export default function AnswerButton(props) {
    
    //props.value.chosen ? "chosen-rectangle" : "rectangle"
    
    function determineColor() {
        if (props.modeCheck) {
            if (props.value.correct) return "correct-rectangle";
            if (props.value.chosen && !props.value.correct) return "incorrect-rectangle";
            return "rectangle";
        } else {
           return props.value.chosen ? "chosen-rectangle" : "rectangle"
        }
    }
    
    return(
        
        <div className={determineColor()} onClick={props.chooseAns}>
            
                     {props.value.answer}
            
        </div>          
    
    )
}