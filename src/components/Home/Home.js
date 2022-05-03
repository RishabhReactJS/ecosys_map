import React, {useState, useEffect} from 'react'
import './home.css';
import Header from '../Header/Header'
import useAuth from '../../context/AuthContext';
import {createFlow, getUserFlows, getUserSubFlows} from '../../utils/firebase';
import {
    useNavigate,
    useLocation,
    Navigate,
  } from "react-router-dom";
import {FlowsCard} from '../FlowsCard/FlowsCard';

export default function Home() {
    const [flowName, setflowName] = useState("");
const [isCreateFlow, setisCreateFlow] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const [userFlows, setuserFlows] = useState([]);
    
    const handleCreateFlow = (event) => {
        event.preventDefault();
        createFlow(auth.userId, flowName)
        .then(res => {
            console.log('flow Id >>', res)
            navigate("../dashboard", { replace: true })
        }).catch(err => console.log('in handleCreateFlow error', err))
    }

    useEffect(() => {
        getUserFlows(auth.userId)
        .then(res => {
            console.log('in getUserFlows >>> ', res);
            setuserFlows(res);
        })
        .catch(err => console.log('in getUserFlows error >>> ', err))
    }, [])

    // future use case for flows subCollection in users collection
    // useEffect(() => {
    //     getUserSubFlows(auth.userId)
    //     .then(res => {
    //         console.log('in getUserSubFlows >>> ', res);
    //     })
    //     .catch(err => console.log('in getUserSubFlows error >>> ', err))
    // }, [])

    return (<div>
        <div className={"header"}> <Header /> </div>
        {isCreateFlow
        ?<div className="home-container">
            <lable className="homeLable">Flow Name</lable>
            <input type="text" value={flowName} onChange={event => setflowName(event.target.value)} placeholder="Please insert the flow name"/>
        <button onClick={handleCreateFlow}>
            Create
        </button>
    </div>
        :<div className="home-container">
            <div className="flow-block" onClick={() => setisCreateFlow(true)}>
                + Create Flow
            </div>
        </div>}
        {userFlows.length > 0 ? <FlowsCard userFlows={userFlows} navigate={navigate} /> : null}
    </div>
    )
}
