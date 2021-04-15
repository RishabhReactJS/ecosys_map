import React, { useState } from 'react'
import './AddStep.css';
import Chip from "../Chip/Chip"
import data from "../../utils/data.json";

export default function AddStep(props) {
    const [actors, setactors] = useState(data.actors);
    return (
        <form>
            <div className="yo">
                <div className="field">
                    <div className="label">
                        To
                    </div>
                    <div className="value list">
                        {actors.map(actor => <Chip label={actor.name} name="receiver" id={actor.id} />)}
                    </div>
                </div>
                <div className="field">
                    <label for="story" className="label">Message</label>
                    <div className="value">
                        <textarea id="story" name="story" className="textbox">
                            It was a dark and stormy night...
                        </textarea>
                    </div>
                </div>
            </div>
        </form>
    )
}