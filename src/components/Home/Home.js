import React, { useState, useEffect } from 'react'
import './home.css';
import Header from '../Header/Header'
import useAuth from '../../context/AuthContext';
import { createFlow, getUserFlows, getUserSubFlows } from '../../utils/firebase';
import {
    useNavigate,
    useLocation,
    Navigate,
} from "react-router-dom";
import { FlowsCard } from '../FlowsCard/FlowsCard';

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
                navigate(`../dashboard/${res}`, { replace: true })
            }).catch(err => console.log('in handleCreateFlow error', err))
    }

    const getFlows = () => {
        getUserFlows(auth.userId)
            .then(res => {
                console.log('in getUserFlows >>> ', res);
                setuserFlows(res);
            })
            .catch(err => console.log('in getUserFlows error >>> ', err))
    }

    useEffect(() => {
        getFlows()
    }, [])

    // future use case for flows subCollection in users collection
    // useEffect(() => {
    //     getUserSubFlows(auth.userId)
    //     .then(res => {
    //         console.log('in getUserSubFlows >>> ', res);
    //     })
    //     .catch(err => console.log('in getUserSubFlows error >>> ', err))
    // }, [])

    return (
        <div className="homepage">
            <Header />
            <div className="flows-content">
                <div className="toolbar">
                    <h1 className="title text-white">Dashboard</h1>
                    {isCreateFlow ?
                        <div className="create-flow-form">
                            <label className="create-label subtitle text-white" for="create-flow">Flow Name</label>
                            <input id="create-flow" className="text-input input" type="text" value={flowName} onChange={event => setflowName(event.target.value)} placeholder="Please insert the flow name" />
                            <button className="button create-flow" onClick={handleCreateFlow}>
                                Create Flow
                            </button>
                        </div>
                        : <button className="button create-flow" onClick={() => setisCreateFlow(true)}>Create flow</button>
                    }
                </div>
                {userFlows.length > 0 ? <FlowsCard getFlows={getFlows} userFlows={userFlows} navigate={navigate} /> : null}
            </div>
        </div>
    )
}
