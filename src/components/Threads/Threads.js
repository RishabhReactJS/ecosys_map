import React from 'react'
import './thread.css';

export default function Threads(props) {
    return (
        <div data-id={props.id} className="thread-container">
            <div class="vl">
            </div>
            <button data-nodeid={props.id} id={props.id} className={props.active ? `thread-add-btn active` : `thread-add-btn`}>{props.active ? "" : "+"}</button>
        </div>
    )
}
