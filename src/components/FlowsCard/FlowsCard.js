import React from 'react'
import './FlowCard.css';

export const FlowsCard = ({ userFlows, navigate }) => {
    console.log('in Card >> ', userFlows);

    const handleClick = (e) => {
        console.log('in handleClick >>> ', e.currentTarget.id);
        navigate(`../dashboard/${e.currentTarget.id}`, { replace: true })

    }
    return (
        <div className="card-container">
            <div className="flows-heading card">
                <p>Flow name</p>
                <p>Created At</p>
                <p>Last Modified</p>
            </div>
            {userFlows.map(flow => (
                <div id={flow.id} onClick={handleClick} className="card">
                    {console.log('in map id >>', flow.id)}
                    <p className="flow-name">{flow.name}</p>
                    <p className="created-at">{flow.created_at.toDate().toLocaleString('en-in', { timeZone: 'IST' })}</p>
                    <p className="updated-at">{flow.updated_at.toDate().toLocaleString('en-in', { timeZone: 'IST' })}</p>
                </div>
            ))}
        </div>
    )
}
