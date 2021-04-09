import React, {useEffect, useState} from 'react'
import './thread.css';
import { getPosition } from "../../utils/functions";
import Actor from '../Actor/Actor';
import { Arrow } from '../Arrow/Arrow';

export default function Threads(props) {

    const [p1, setp1] = useState()
    const [p2, setp2] = useState()
    useEffect(() => {
        // getPosition(props.id);
        const start = getPosition(props.id)
        setp1(start)
        const end = getPosition(props?.step?.index +"_" + props?.step?.to)
        setp2(end)
    }, [props.id, props?.step])

    return (
        <div data-id={props.id} className="thread-container">
        <div class="vl">
        </div>
        <button data-nodeid={props.id} id={props.id} className={ props.active? `thread-add-btn active` : `thread-add-btn`}>{ props.active? "" : "+"}</button>
        </div>
    )
}
