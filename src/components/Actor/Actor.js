import React, { useState } from "react";
import "./actor.css";
import '../Threads/thread.css';

export default function Actor(props) {
  const [actorName, setactorName] = useState(props.text);

  const onSubmit = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (actorName.length > 0 && actorName != props.text) {
      setactorName("");
      props.updateActorAPI(actorName, props?.actor);
    }
  };

  const handleOnBlur = (e) => {
    e.preventDefault();
    if (actorName.length > 0 && actorName != props.text) onSubmit(e);
  };

  return (
    <div className="autor-container">
      <form onSubmit={onSubmit}>
        <input
          draggable={true}
          data-id={props?.actor?.id}
          data-index={props.position}
          onDragOver={props.onDragOver}
          onDragStart={props.onDragStart}
          onDragEnd={props.onDragEnd}
          onBlur={handleOnBlur}
          placeholder="+ Add Actor"
          onChange={(e) => setactorName(e.target.value)}
          type="text"
          value={actorName}
          className="actor-txt"
        />
        {props.children}
      </form>
    </div>
  );
}
