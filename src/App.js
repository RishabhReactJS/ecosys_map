import "./App.css";
import Actor from "./components/Actor/Actor";
import Threads from "./components/Threads/Threads";
import data from "./utils/data.json";
import React, { useState, useEffect } from 'react'
import { Arrow } from "./components/Arrow/Arrow";
import './components/Threads/thread.css';

function App() {
  const [actors, setactors] = useState(data.actors);
  const [steps, setsteps] = useState(data.steps);
  const [rendered, setrendered] = useState(false)
  // const handleAddActor = (event) => {
  // };

  useEffect(() => {
    setrendered(true)
  }, [steps, actors])

  const CreateArrow = () => {
    return steps?.map(step =>
      <Arrow index={step.index} message={step.message} emotion={step.emotion} start={step.index + "_" + step.from} end={step.index + "_" + step.to} deltaActor={1} />
    )
  }
  return (
    <div className="App">
      <div className={"header"}></div>
      <ul className="actors">
        {actors.map((actor) => (
          <li id={actor.id} key={actor.id} className="">
            <Actor text={actor.name}>
              {steps?.map(step => <Threads step={step} actor={actor.id} id={`${step.index}_${actor.id}`} active={actor.id === step.from || actor.id === step.to} />)}
              {/* <Threads id={`${steps.length + 1}_${actor.id}`}/> */}
            </Actor>
          </li>
        ))}
        {/* <li onClick={handleAddActor} id="new_actor" key="new_actor" className="new_actor">
          <Actor text="+ Add Actor">
          {steps?.map(step => <Threads id={`${step.index}_a_n`} />)}
          <Threads id={`${steps.length + 1}_a_n`}/>
          </Actor>
        </li> */}
      </ul>
      {rendered && <CreateArrow />}
    </div>
  );
}

export default App;
