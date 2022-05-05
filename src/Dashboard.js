import "./App.css";
import Actor from "./components/Actor/Actor";
import Threads from "./components/Threads/Threads";
import data from "./utils/data.json";
import dataFirebase from "./utils/dataFirebase.json";
import React, { useState, useEffect } from 'react'
import { Arrow } from "./components/Arrow/Arrow";
import AddStep from "./components/AddStep/AddStep"
import firebase, { setTest, getAPI, updateAPI, addAPI, deleteAPI, getSubCollectionAPI } from "./utils/firebase";
import './components/Threads/thread.css';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Header from './components/Header/Header'
import { useParams } from "react-router-dom";

function Dashboard() {
  const [actors, setactors] = useState();
  const [steps, setsteps] = useState();
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
    console.log('in useEffect getAllActorAPI getAllStepsAPI>>>')
  }, [])

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

  const createStep = async (from, to, message, emotion) => {
    await addAPI('steps', params.flowId, { from, to, message, emotion, order: firebaseSteps.length })
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
    if (e.currentTarget?.dataset?.index)
      dragged = e.currentTarget?.dataset;
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
      // <div onDragOver={handleDragOver} draggable={true} onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={"arrow-list-itme"} key={step.id} id={step.id} data-id={step.id}> 
      <Arrow onDragOver={handleDragOver} onDragStart={handleDragStart} onDragEnd={handleDragEnd} deleteStep={handleDeleteStep} editStep={handleEditStep} stepDetail={step} index={index} message={step.message} emotion={step.emotion} start={index + "_" + step.from} end={index + "_" + step.to} deltaActor={1} />
      // </div>
      // </Draggable>
    )
  }

  return firebaseActors && firebaseSteps ? (
    <div className="App">
      {showModal && <AddStep stepID={addStepId} closeModal={handleCloseModal} setfrom={setaddStepFrom} from={addStepFrom} to={addStepTo} message={addStepMessage} emotion={addStepEmoji} setShowModal={setShowModal} createStep={createStep} updateStep={updateStep} actors={firebaseActors} />
      }
      <div className={"header"}> <Header /> </div>
      <ul className="actors">
        {
          firebaseActors.map((actor, index) => (
            <>
              <li className="Dropable-list">
                <div draggable={false} data-index={index} onDragOver={handleDragOver} className="Dropable-actor">
                </div>
              </li>
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
        <li id="new_actor" key="new_actor" className="new_actor">
          <Actor updateActorAPI={addActorAPI} text="" >
            {firebaseSteps?.map((step, index) => <Threads active={true} id={`${index}_a_n`} />)}
            <Threads active={true} actorId="_a_n" id={`${firebaseSteps.length + 1}_a_n`} />
          </Actor>
        </li>
      </ul>
      {/* <ul onDragOver={handleDragOver}> */}
      {rendered && <CreateArrow />}
      {/* </ul> */}
      <button className="add-step-btn" onClick={openStepModal}>+ Add Step</button>
    </div>
  )
    : <div>Fecting Data</div>
}

export default Dashboard;
