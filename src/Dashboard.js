import "./App.css";
import Actor from "./components/Actor/Actor";
import Threads from "./components/Threads/Threads";
import data from "./utils/data.json";
import dataFirebase from "./utils/dataFirebase.json";
import React, { useState, useEffect } from 'react'
import { Arrow } from "./components/Arrow/Arrow";
import './components/Threads/thread.css';
import AddStep from "./components/AddStep/AddStep"
import firebase, { getAPI, updateAPI, addAPI, deleteAPI } from "./utils/firebase";
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import Header from './components/Header/Header'

function Dashboard() {
  const [actors, setactors] = useState(data.actors);
  const [steps, setsteps] = useState(data.steps);
  const [firebaseSteps, setfirebaseSteps] = useState([]);
  const [rendered, setrendered] = useState(false)
  const [firebaseActors, setfirebaseActors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addStepFrom, setaddStepFrom] = useState()
  const [addStepTo, setaddStepTo] = useState()
  const [addStepMessage, setaddStepMessage] = useState()
  const [addStepEmoji, setaddStepEmoji] = useState()
  const [addStepId, setaddStepID] = useState()
  let dragged;
  let over;
  
  const handleAddActor = (event) => {
    addAPI("actors", { name: "Testing", index: 4 })
  };

  useEffect(async () => {
    getAllActorAPI();
    getAllStepsAPI();
    console.log('in useEffect getAllActorAPI >>>')
  }, [firebase])

  useEffect(() => {
    if (firebaseSteps.length > 0)
      setrendered(true)
    else
      setrendered(false)
  }, [firebaseSteps])

  const handleEditStep = (stepDetail, e) => {
      e.stopPropagation();
      setaddStepMessage(stepDetail.message)
      setaddStepTo(stepDetail.to)
      setaddStepFrom(stepDetail.from)
      setaddStepEmoji(stepDetail.emotion)
      setaddStepID(stepDetail.id)
      setShowModal(true);
  }

  const handleDeleteStep = async (stepDetail, e) => {
    e.stopPropagation();
    deleteAPI('steps', stepDetail)
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }


  const getAllActorAPI = async () => {
    const actorsData = await getAPI("actors")
    console.log('in getAllActorAPI >>>> ', actorsData)
    setfirebaseActors(actorsData.map(doc => { return { ...doc.data(), "id": doc.id } }));
  }

  const getAllStepsAPI = async () => {
    const stepsData = await getAPI("steps")
    setfirebaseSteps(stepsData.map(doc => ({ ...doc.data(), "id": doc.id })))
  }

  const updateActorAPI = async (newName, actor) => {
    // e.stopPropagation();
    await updateAPI('actors', actor.id, { name: newName })
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
  const updateStep = async (id, from, to, message, emotion) => {
    await updateAPI('steps', id, { from, to, message, emotion })
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const openStepModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const hadleAddStepButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const id = e.currentTarget.dataset.nodeid
    console.log("in hadleAddStepButton >>>. ", e, e.target, e.currentTarget, id)
    setaddStepFrom(id)
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setaddStepFrom()
    setaddStepEmoji()
    setaddStepMessage()
    setaddStepTo()
  }

  const handleDragStart = (e) => {
    console.log("in handleDragStart >>>> ", e.currentTarget, e.dataTransfer, e);
    if(e.currentTarget.dataset && e.currentTarget.dataset.id)
      dragged = e.currentTarget?.dataset?.id;
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', dragged);
  };
  const handleDragEnd = (e) => {
    console.log("in handleDragEnd >>>> ", dragged, over);
    // var from = Number(dragged.dataset.id);
    // var to = Number(over.dataset.id);
    // if(from < to) to--;
    // data.splice(to, 0, data.splice(from, 1)[0]);
  };

  const handleDragOver = (e) => {
    console.log('in handleDragOver >>>>> ', e.target, e)
    e.preventDefault();
    e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // dragged.style.display = "none";
    // if(e.target.className === 'placeholder') return;
    if(e.target.dataset && e.target.dataset.id)
      over = e.target?.dataset?.id;
    // e.target.parentNode.insertBefore(placeholder, e.target);
  }

  const CreateArrow = () => {
    return firebaseSteps?.map((step, index) =>
      // <Draggable
      // axis="y"
      // handle=".arrow-list-itme"
      // defaultPosition={{x: 0, y: 0}}
      // position={null}
      // grid={[25, 25]}
      // scale={1}
      // onStart={handleDragStart}
      // onDrag={handleDragOver}
      // onStop={handleDragEnd}>
      <li draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={"arrow-list-itme"} key={step.id} id={step.id} data-id={step.id}> <Arrow handleDragOver={handleDragOver} deleteStep={handleDeleteStep} editStep={handleEditStep} stepDetail={step} index={index} message={step.message} emotion={step.emotion} start={index + "_" + step.from} end={index + "_" + step.to} deltaActor={1} /></li>
      // </Draggable>
    )
  }

  return firebaseActors && firebaseSteps ? (
    <div className="App">
      {showModal && <AddStep stepID={addStepId} closeModal={handleCloseModal} setfrom={setaddStepFrom} from={addStepFrom} to={addStepTo} message={addStepMessage} emotion={addStepEmoji} setShowModal={setShowModal} createStep={createStep} updateStep={updateStep} actors={firebaseActors} />
      }
      <div className={"header"}> <Header /> </div>
      <ul className="actors">
        {firebaseActors.map((actor, index) => (
          <li draggable="true"
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart} data-id={actor.id} id={actor.id} key={actor.id} className="">
            <Actor actor={actor} updateActorAPI={updateActorAPI} text={actor.name}>
              {firebaseSteps?.map((step, sIndex) => <Threads data-id={step.id} step={step} actor={actor.id} id={`${sIndex}_${actor.id}`} active={true} />)}
              <Threads hadleAddStep={hadleAddStepButton} actorId={actor.id} id={`${steps.length + 1}_${actor.id}`} />
            </Actor>
          </li>
        ))}
        <li id="new_actor" key="new_actor" className="new_actor">
          <Actor updateActorAPI={addActorAPI} text="" >
            {firebaseSteps?.map((step, index) => <Threads active={true} id={`${index}_a_n`} />)}
            <Threads active={true} actorId="_a_n" id={`${firebaseSteps.length + 1}_a_n`} />
          </Actor>
        </li>
      </ul>
      <ul onDragOver={handleDragOver}>
      {rendered && <CreateArrow />}
      </ul>
      <button className="add-step-btn" onClick={openStepModal}>+ Add Step</button>
    </div>
  )
    : <div>Fecting Data</div>
}

export default Dashboard;
