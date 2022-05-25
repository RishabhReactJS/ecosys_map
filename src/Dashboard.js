import "./App.css";
import Actor from "./components/Actor/Actor";
import Threads from "./components/Threads/Threads";
import data from "./utils/data.json";
import dataFirebase from "./utils/dataFirebase.json";
import React, { useState, useEffect } from 'react'
import { Arrow } from "./components/Arrow/Arrow";
import AddStep from "./components/AddStep/AddStep"
import firebase, { setTest, getAPI, updateAPI, addAPI, deleteAPI, getSubCollectionAPI, moveDown, moveUp } from "./utils/firebase";
import './components/Threads/thread.css';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Header from './components/Header/Header'
import { useParams } from "react-router-dom";

function Dashboard() {
  const [actors, setactors] = useState();
  const [steps, setsteps] = useState();
  const [filename, setFilename] = useState();
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
  const params = useParams();


  useEffect(() => {
    // setTest()
    getAllActorAPI();
    getAllStepsAPI();
    getFlowDetails();
    console.log('in useEffect getAllActorAPI getAllStepsAPI>>>')
  }, [])

  useEffect(() => {
    if (firebaseSteps.length > 0)
      setrendered(true)
    else
      setrendered(false)
  }, [firebaseSteps])

  const getFlowDetails = async () => {
    const db = firebase.firestore();
    const file = await db
      .collection(`flows`).doc(`${params.flowId}`).get()
    setFilename(file.data())
    console.log(`flow name is ${file.data()}`)
  }
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
    deleteAPI('steps', params.flowId, stepDetail)
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }


  const getAllActorAPI = async () => {
    // const actorsAData = await getAPI("actors")
    // console.log('in actorsAData >>>> ', actorsAData);
    const actorsData = await getSubCollectionAPI("actors", params.flowId);
    console.log('in getAllActorAPI >>>> ', actorsData);
    setfirebaseActors(actorsData.map(doc => { return { ...doc.data(), "id": doc.id } }));
  }

  const getAllStepsAPI = async () => {
    // const stepsData = await getAPI("steps")
    const stepsData = await getSubCollectionAPI("steps", params.flowId);
    console.log('in stepsData >>>> ', stepsData)
    setfirebaseSteps(stepsData.map(doc => ({ ...doc.data(), "id": doc.id })))
    setrendered(true)
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
    await addAPI('actors', params.flowId, { name: newName, order: firebaseActors.length })
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const addStepAPI = async (from, to, message, emotion) => {
    await addAPI('steps', params.flowId, { from, to, message, emotion, order: firebaseSteps.length })
    // setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }
  const updateStep = async (id, from, to, message, emotion) => {
    await updateAPI('steps', params.flowId, id, { from, to, message, emotion })
    // setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const openStepModal = (e) => {
    console.log(`add button has been clicked`)
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
    if (e.currentTarget?.dataset?.index)
      dragged = e.currentTarget?.dataset;

    console.log('in handleDragStart >>>', dragged);
  };
  const handleDragEnd = async (e) => {
    if (dragged.index !== over) {
      console.log('need to update position from ', dragged, ' to ', over);
      // await updateAPI('steps', dragged.id, { over })
    }
  };

  const handleDragOver = (e) => {
    console.log('in handleDragOver >>>>> ', e.target?.dataset)
    e.preventDefault();
    e.stopPropagation();
    over = e.target?.dataset?.index;
    e.target.classList.add("dragged-over-this");

  }

  const handleDragLeave = (e) => {
    console.log(`left dragover for this element: ${e.target?.dataset}}`)
    e.target.classList.remove("dragged-over-this");
  }

  const handleDrop = async (e) => {
    console.log('in handleDrop >>>>> ', e, e.target?.dataset, over, dragged.index)
    e.preventDefault();
    e.stopPropagation();
    over = +e.target?.dataset?.index;
    if (over > +dragged.index) {
      await moveDown("steps", dragged, over, params.flowId, firebaseSteps);
    } else {
      await moveUp("steps", dragged, over, params.flowId, firebaseSteps);
    }
    setrendered(false)
    await getAllActorAPI();
    await getAllStepsAPI();
  }

  const ReorderSteps = async (triger, shift) => {
    for (const step of firebaseSteps) {
      {
        if ((shift < 0 && (step.order < triger.order)) && (shift < 0 && step.order >= (triger.order + shift))) {
          updateAPI('steps', params.flowId, step.id, { ...step, order: step.order + 1 });
          console.log(`updated ${step.message}`)
        }
        else if ((shift > 0 && (step.order > triger.order)) && (shift > 0 && step.order <= (triger.order + shift))) {
          updateAPI('steps', params.flowId, step.id, { ...step, order: step.order - 1 })
          console.log(`updated ${step.message}`)
        }
        else if (step.order === triger.order) {
          updateAPI('steps', params.flowId, step.id, { ...step, order: step.order + shift })
          console.log(`updated ${step.message}`)
        }
      };
      // setrendered(false)
      await getAllActorAPI();
      await getAllStepsAPI();
    }
  }

  const CreateArrow = () => {
    return firebaseSteps?.map((step, index) =>
      <Arrow ReorderSteps={ReorderSteps} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragStart={handleDragStart} onDragEnd={handleDragEnd} deleteStep={handleDeleteStep} onDrop={handleDrop} editStep={handleEditStep} stepDetail={step} index={index} message={step.message} lastStepOrder={firebaseSteps.length} emotion={step.emotion} start={index + "_" + step.from} end={index + "_" + step.to} deltaActor={1} />
    )
  }

  return firebaseActors && firebaseSteps ? (
    <div className="App">
      {showModal && <AddStep stepID={addStepId} closeModal={handleCloseModal} setfrom={setaddStepFrom} from={addStepFrom} to={addStepTo} message={addStepMessage} emotion={addStepEmoji} setShowModal={setShowModal} createStep={addStepAPI} updateStep={updateStep} actors={firebaseActors} />
      }
      <Header flowName={filename ? filename.name : null} />
      <div className="overflowthis">
        <div className="actors-container">
          <ul className="actors">
            {
              firebaseActors.map((actor, index) => (
                <>
                  {/* <li id={actor.id} className="Dropable-list">
                    <div draggable={false} data-index={index} onDragOver={handleDragOver} className="Dropable-actor">
                    </div>
                  </li> */}
                  <li data-id={actor.id} id={actor.id} key={actor.id} className="">
                    <Actor
                      onDragEnd={handleDragEnd}
                      onDragStart={handleDragStart} position={index} actor={actor} updateActorAPI={updateActorAPI} text={actor.name}>
                      {firebaseSteps?.map((step, sIndex) => <Threads onDragOver={handleDragOver} data-id={step.id} step={step} actor={actor.id} id={`${sIndex}_${actor.id}`} active={true} />)}
                      <Threads hadleAddStep={hadleAddStepButton} actorId={actor.id} id={`${firebaseSteps.length}_${actor.id}`} />
                    </Actor>
                  </li>
                </>
              ))}
            {/* <li id="dropable_new_actor" className="Dropable-list">
              <div draggable={false} data-index={firebaseActors.length} onDragOver={handleDragOver} className="Dropable-actor">
              </div>
            </li> */}
            <li id="new_actor" key="new_actor" className="new_actor">
              <Actor updateActorAPI={addActorAPI} text="" >
                {firebaseSteps?.map((step, index) => <Threads active={true} id={`${index}_a_n`} />)}
                <Threads active={true} actorId="_a_n" id={`${firebaseSteps.length + 1}_a_n`} />
              </Actor>
            </li>
          </ul>
          <div className="arrow-container">
            {rendered ? <CreateArrow /> : null}
          </div>
          <div className="actor-bg"></div>
        </div>
      </div>


      {/* <ul onDragOver={handleDragOver}> */}
      {/* </ul> */}
      <button className="add-step-btn" onClick={openStepModal}>+ Add Step</button>
    </div>
  )
    : <div>Fecting Data</div>
}

export default Dashboard;
