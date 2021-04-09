import React from 'react'
import './actor.css';

export default function Actor(props) {
    return (

        <div className="autor-container">
            <input type="text" value={props.text} className="actor-txt" onEnte />
            {/* <div className="actor-txt">
                {props.text}
            </div> */}
            {props.children}
        </div>
    )
}
