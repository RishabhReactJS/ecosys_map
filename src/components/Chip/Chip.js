import React, { useState } from 'react'
import './Chip.css';

export default function Chip(props) {
    return (<div className="chip">
        <input disabled={props?.disabled === props.id} onChange={props.handleOnChnage} type="radio" id={`${props.name}_${props.id}`}
            name={props.name} value={props.id} />
        <label for={`${props.name}_${props.id}`} className={`${props.type === "txt" ? "radio-chip" : "radio-emo-chip"} ${props?.disabled === props.id ? 'disabled' : 'visible'}`}>{props.label}</label>
    </div>)
}