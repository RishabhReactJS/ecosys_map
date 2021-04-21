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
  useEffect(() => {
    console.log('in component mount >>>>>>>>>>> ', p1, p2)
    return () => {
      console.log('in component UNmount >>>>>>>>>>> ', p1, p2)
    }
  }, [])
  const getWidth = () => p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22
  return (
    <div className="svg-container" style={{
      "position": "absolute",
      "top": `${p1.y - 18 + window.scrollY}px`,
      "left": `${p2.x - p1.x > 0 ? p1.x - 2 + window.scrollX : p2.x - 4 + window.scrollX}px`,
      "width": `${p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22}px`
    }}>
      <div className="ordering">
        <button>🔼</button>
        <button>🔽</button>
      </div>
      <p className="arrow-message">{props?.message}</p>
      <Svg reverse={p2.x - p1.x < 0} length={Math.abs(p2.x - p1.x) + 18} arrowWidth={getWidth()} />
      <p className="arrow-emoji">{props?.emotion}</p>
    </div>
  )
}