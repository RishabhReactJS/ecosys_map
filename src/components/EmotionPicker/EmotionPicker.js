import React, { useState } from 'react'
import './EmotionPicker.css';
import data from '../../utils/emotions.json'

export default function EmotionPicker(props) {
    const [emotions, setemotion] = useState(data.edges);
    return (
        <select>
            {
                emotions.map((emo) => {
                    return (<option value={emo.node.object.id} key={emo.node.object.id} >
                        {emo.node.object.name}
                    </option>)
                })
            }
        </select >
    )
}