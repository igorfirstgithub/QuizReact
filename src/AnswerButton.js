import React from "react"

export default function AnswerButton(props) {
    
    return(
        
        <div className="rectangle" onClick={props.chooseAns}>
            {props.value.val}
        </div>          
    
    )
}