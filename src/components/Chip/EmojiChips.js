import React, { useState } from 'react'
import './Chip.css';

export default function EmojiChip(props) {
    return (<div>
        <input type="radio" id={props.emo.node.object.id}
            name="emo" value={props.emo.node.object.id} />
        <label for={props.emo.node.object.id} className="emoji-chip"><img alt={props.emo.node.object.name} src={props.emo.node.icon.image.uri} /></label>
    </div>)
}