import "./App.css";
import Actor from "./components/Actor/Actor";
import Threads from "./components/Threads/Threads";
import data from "./utils/data.json";
import dataFirebase from "./utils/dataFirebase.json";
import React, { useState, useEffect } from 'react'
import { Arrow } from "./components/Arrow/Arrow";
import './components/Threads/thread.css';
import AddStep from "./components/AddStep/AddStep"
import firebase, { getAPI, updateAPI, addAPI } from "./utils/firebase";

function App() {
  const [actors, setactors] = useState(data.actors);
  const [steps, setsteps] = useState(data.steps);
  const [firebaseSteps, setfirebaseSteps] = useState([]);
  const [rendered, setrendered] = useState(false)
  const [firebaseActors, setfirebaseActors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddActor = (event) => {
    addAPI("actors", { name: "Testing", index: 4 })
  };

  useEffect(async () => {
    getAllActorAPI();
    getAllStepsAPI();
  }, [firebase])

  useEffect(() => {
    if (firebaseSteps.length > 0)
      setrendered(true)
    else
      setrendered(false)
  }, [firebaseSteps])


  const CreateArrow = () => {
    return firebaseSteps?.map((step, index) =>
      <Arrow key={`${step.to}_${step.from}`} index={index} message={step.message} emotion={step.emotion} start={index + "_" + step.from} end={index + "_" + step.to} deltaActor={1} />
    )
  }

  const getAllActorAPI = async () => {
    const actorsData = await getAPI("actors")
    setfirebaseActors(actorsData.map(doc => { return { ...doc.data(), "id": doc.id } }));
  }

  const getAllStepsAPI = async () => {
    const stepsData = await getAPI("steps")
    setfirebaseSteps(stepsData.map(doc => ({ ...doc.data(), "id": doc.id })))
  }

  const updateActorAPI = async (newName, actor) => {
    // e.stopPropagation();
    const { id, ...actorData } = actor
    await updateAPI('actors', id, { ...actorData, name: newName })
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }
  const addActorAPI = async (newName, actor) => {
    // e.stopPropagation();
    await addAPI('actors', { name: newName, order: firebaseActors.length })
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const createStep = async (from, to, message, emotion) => {
    await addAPI('steps', { from, to, message, emotion, order: firebaseSteps.length })
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const openStepModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  return firebaseActors && firebaseSteps ? (
    <div className="App">
      {showModal && <AddStep setShowModal={setShowModal} createStep={createStep} actors={firebaseActors} />
      }
      <div className={"header"}></div>
      <ul className="actors">
        {firebaseActors.map((actor, index) => (
          <li id={actor.id} key={actor.id} className="">
            <Actor actor={actor} updateActorAPI={updateActorAPI} text={actor.name}>
              {firebaseSteps?.map((step, sIndex) => <Threads step={step} actor={actor.id} id={`${sIndex}_${actor.id}`} active={true} />)}
              <Threads id={`${steps.length + 1}_${actor.id}`} />
            </Actor>
          </li>
        ))}
        <li id="new_actor" key="new_actor" className="new_actor">
          <Actor updateActorAPI={addActorAPI} text="" >
            {firebaseSteps?.map((step, index) => <Threads id={`${index}_a_n`} />)}
            <Threads id={`${firebaseSteps.length + 1}_a_n`} />
          </Actor>
        </li>
      </ul>
      {rendered && <CreateArrow />}
      <button className="add-step-btn" onClick={openStepModal}>+ Add Step</button>
    </div>
  )
    : <div>Fecting Data</div>
}

export default App;
