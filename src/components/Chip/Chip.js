import React, { useState } from 'react'
import './Chip.css';

export default function Chip(props) {
    return (<div className="chip">
        <input type="radio" id={props.id}
            name={props.name} value={props.id} />
        <label for={props.id} className="radio-chip">{props.label}</label>
    </div>)
}