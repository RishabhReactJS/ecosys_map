import React from 'react'
import firebase from '../../utils/firebase'
import './FlowCard.css';

export const FlowsCard = ({ userFlows, navigate, getFlows }) => {
    const [deleting, setDeleting] = React.useState()

    console.log('in Card >> ', userFlows);

    const openFlow = (id) => {
        console.log('in handleClick >>> ', id);
        navigate(`../dashboard/${id}`, { replace: true })
    }

    const deleteFlow = async (id) => {
        setDeleting(true)
        const db = firebase.firestore();
        await db.collection(`flows`).doc(`${id}`).delete()
        setDeleting(id)
        getFlows();
    }

    return (
        <div className="card-container">
            <div className="flows-heading card">
                <p>Flow name</p>
                <p>Created At</p>
                <p>Last Modified</p>
            </div>
            {userFlows.map(flow => (
                <div id={flow.id} className="card">
                    {console.log('in map id >>', flow.id)}
                    <p className="flow-name" onClick={() => openFlow(flow.id)}>{flow.name}</p>
                    <p className="created-at">{flow.created_at.toDate().toLocaleString('en-in', { timeZone: 'IST' })}</p>
                    <p className="updated-at">{flow.updated_at.toDate().toLocaleString('en-in', { timeZone: 'IST' })}</p>
                    {deleting == flow.id ? <span className="material-symbols-outlined">
                        hourglass_empty
                    </span> : <span className="material-symbols-outlined arrow-icon" onClick={() => deleteFlow(flow.id)}>
                        delete
                    </span>}
                </div>
            ))}
        </div>
    )
}
