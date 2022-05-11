import React, { useState, useEffect } from "react"
import { getPosition } from "../../utils/functions"
import Svg from '../SVG/Svg';

export function Arrow(props) {
  const [p1, setp1] = useState(getPosition(props.start))
  const [p2, setp2] = useState(getPosition(props.end))
  useEffect(() => {
    setp1(getPosition(props.start))
    setp2(getPosition(props.end))
    return (() => {
      setp1(undefined)
      setp2(undefined)
    })
  }, [props.start, props.end])

  const getWidth = () => p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22
  const overflowContainer = document.querySelector(".overflowthis");
  return (
    <>
      <div draggable={true} onDragOver={(event) => event.preventDefault} onDragStart={props.onDragStart} onDragEnd={props.onDragEnd} data-id={props.stepDetail.id} id={props.stepDetail.id} data-index={props.index} className="svg-container" style={{
        "position": "absolute",
        "top": `${p1.y - 106 + overflowContainer.scrollTop}px`,
        "left": `${p2.x - p1.x > 0 ? p1.x - 2 + overflowContainer.scrollLeft : p2.x - 4 + overflowContainer.scrollLeft}px`,
        "width": `${p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22}px`
      }}>
        {/* <div className="ordering">
        <button>🔼</button>
        <button>🔽</button>
      </div> */}
        <div className="arrow-edit" >
          {props.index > 0 && <span className="material-symbols-outlined" onClick={() => props.ReorderSteps(props.stepDetail, -1)}>
            arrow_upward
          </span>}
          {props.index !== props.lastStepOrder - 1 && <span className="material-symbols-outlined" onClick={() => props.ReorderSteps(props.stepDetail, 1)}>
            arrow_downward
          </span>}
          <span className="material-symbols-outlined arrow-icon" onClick={(e) => props.editStep(props.stepDetail, e)}>
            edit
          </span>
          <span className="material-symbols-outlined arrow-icon" onClick={(e) => props.deleteStep(props.stepDetail, e)}>
            delete
          </span>
        </div>
        <p className="arrow-message">{props?.stepDetail.order + 1}: {props?.message}</p>
        <Svg reverse={p2.x - p1.x < 0} length={Math.abs(p2.x - p1.x) + 18} arrowWidth={getWidth()} />
        <p className="arrow-emoji">{props?.emotion}</p>
      </div>
      <div draggable={false} onDrop={props.onDrop} data-index={props.index} onDragEnter={props.onDragOver} onDragOver={props.onDragOver} className="non-draggable-area" style={{
        "top": `${p1.y - 140 + window.scrollY}px`,
      }}>Drop here</div>
    </>
  )
}