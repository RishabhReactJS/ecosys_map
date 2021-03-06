import React, { useState } from 'react'
import './AddStep.css';
import Chip from "../Chip/Chip"
import EmojiChip from "../Chip/EmojiChips"
import data from "../../utils/data.json";
import emojis from '../../utils/emoji.json'
// import emojis from '/emoji.json';

export default function AddStep(props) {
    const [actors, setactors] = useState(data.actors);
    const [emotion, setemotion] = useState();
    const [from, setfrom] = useState();
    const [to, setto] = useState();
    const [message, setmessage] = useState();
    const [disableSubmit, setdisableSubmit] = useState(true);
    const [disableTo, setdisableTo] = useState()
    const [disableFrom, setdisableFrom] = useState()
    const handleOnChnage = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const value = e.target.value

        if (e.target.name === "from") {
            setfrom(value)
            setdisableTo(value)
        } else if (e.target.name === "to") {
            setto(value)
            setdisableFrom(value)
        } else if (e.target.name === "story") {
            setmessage(value)
        } else if (e.target.name === "emo") {
            setemotion(value)
        }

        if (from?.length > 0 && to?.length > 0 && message?.length > 0)
            setdisableSubmit(false)
        else
            setdisableSubmit(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setShowModal(false)
        props.createStep(from, to, message, emotion || "")
    }

    return (

        <form onSubmit={handleSubmit} className="modal">
            <div className="step-form">
                <button onClick={() => props.setShowModal(false)} >Close</button>
                <div className="field">
                    <div className="label">
                        From
                    </div>
                    <div className="value list">
                        {props.actors.map(actor => <Chip disabled={disableFrom} type="txt" handleOnChnage={handleOnChnage} key={"f" + "_" + actor.id} label={actor.name} name="from" id={actor.id} />)}
                    </div>
                </div>
                <div className="field">
                    <div className="label">
                        To
                    </div>
                    <div className="value list">
                        {props.actors.map(actor => <Chip disabled={disableTo} type="txt" handleOnChnage={handleOnChnage} key={"to" + "_" + actor.id} label={actor.name} name="to" id={actor.id} />)}
                    </div>
                </div>
                <div className="field">
                    <label for="story" className="label">Message</label>
                    <div className="value">
                        <textarea onChange={handleOnChnage} id="story" name="story" className="textbox" />
                    </div>
                </div>
                {/* <div className="field">
                    <label for="story" className="label">Emotion</label>
                    <div className="value list emoji-picker">
                        {emotions.map(emo => <EmojiChip key={emo.node.object.id} label={emo.node.object.id} id={emo.node.object.id} emo={emo} />)}
                    </div>
                </div> */}
                <div className="field">
                    <label for="story" className="label">Emotion</label>
                    <div className="value list emoji-picker">
                        {emojis.map(emo => <Chip type="emo" handleOnChnage={handleOnChnage} key={emo.codes} label={emo.char} id={emo.char} name={"emo"} />)}
                    </div>
                </div>
                <button disabled={disableSubmit} type="submit">Submit</button>
            </div>
        </form>
    )
}