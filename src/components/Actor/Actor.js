import React, { useState } from 'react'
import './actor.css';

export default function Actor(props) {

    const [actorName, setactorName] = useState(props.text)

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setactorName("")
        props.updateActorAPI(actorName, props?.actor);
    }

    return (

        <div className="autor-container">
            <form onSubmit={onSubmit}>
                <input placeholder='+ Add Actor' onChange={e => setactorName(e.target.value)} type="text" value={actorName} className="actor-txt" />
                {props.children}
            </form>
        </div>
    )
}
