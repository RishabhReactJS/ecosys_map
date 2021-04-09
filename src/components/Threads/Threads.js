import React from 'react'
import './thread.css';

export default function Threads(props) {
    return (
        <div data-id={props.id} className="thread-container">
            <div class="vl">
            </div>
            <button data-nodeid={props.id} id={props.id} className={props.active ? `thread-add-btn active` : `thread-add-btn`}>{props.active ? "" : <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 24 24" width="14px" style={{ marginLeft: "-5px" }} fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>}</button>
        </div>
    )
}
