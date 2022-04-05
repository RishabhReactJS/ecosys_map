import React, {useState, useEffect} from 'react'
import './home.css';
import Header from '../Header/Header'
import useAuth from '../../context/AuthContext';
import {createFlow, getAllUserFlows, getAllUserSubFlows} from '../../utils/firebase';
import {
    useNavigate,
    useLocation,
    Navigate,
  } from "react-router-dom";

export default function Home() {
    const [flowName, setflowName] = useState("");
const [isCreateFlow, setisCreateFlow] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    
    const handleCreateFlow = (event) => {
        event.preventDefault();
        createFlow(auth.userId, flowName)
        .then(res => {
            console.log('flow Id >>', res)
            navigate("../dashboard", { replace: true })
        }).catch(err => console.log('in handleCreateFlow error', err))
    }

    useEffect(() => {
        getAllUserFlows(auth.userId)
        .then(res => {
            console.log('in getAllUserFlows >>> ', res);
        })
        .catch(err => console.log('in getAllUserFlows error >>> ', err))
    }, [])

    useEffect(() => {
        getAllUserSubFlows(auth.userId)
        .then(res => {
            console.log('in getAllUserSubFlows >>> ', res);
        })
        .catch(err => console.log('in getAllUserSubFlows error >>> ', err))
    }, [])

    return (<div>
        <div className={"header"}> <Header /> </div>
        {isCreateFlow
        ?<div className="home-container">
            <lable>Flow Name</lable>
            <input type="text" value={flowName} onChange={event => setflowName(event.target.value)} placeholder="Please insert the flow name"/>
        <button className="flow-block" onClick={handleCreateFlow}>
            Create
        </button>
    </div>
        :<div className="home-container">
            <div className="flow-block" onClick={() => setisCreateFlow(true)}>
                + Create Flow
            </div>
        </div>}
    </div>
    )
}
