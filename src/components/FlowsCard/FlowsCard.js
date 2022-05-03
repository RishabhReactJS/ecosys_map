import React from 'react'
import './FlowCard.css';

export const FlowsCard = ({ userFlows, navigate }) => {
    console.log('in Card >> ', userFlows);

    const handleClick = (e) => {
        console.log('in handleClick >>> ', e.currentTarget.id);
        navigate(  `../dashboard/${e.currentTarget.id}`, { replace: true })

    }
    return (
        <div>
            <div className="card-container">
            {userFlows.map(flow => (
                <div id={flow.id} onClick={handleClick} className="card">
                    {console.log('in map id >>', flow.id)}
                    <div>Name</div>
                    <div>{flow.name}</div>
                    <div>Created on</div>
                    <div>{flow.created_at.toDate().toDateString() +" "+ flow.created_at.toDate().toLocaleTimeString()}</div>
                    <div>Last Updated on</div>
                    <div>{flow.updated_at.toDate().toDateString() +" "+ flow.updated_at.toDate().toLocaleTimeString()}</div>
                </div>    
            ))}
            </div>
        </div>
    )
}
