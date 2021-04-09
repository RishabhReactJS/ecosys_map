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

  return (
    <div className="svg-container" style={{
      "position": "absolute",
      "top": `${p1.y + 1}px`,
      "left": `${p2.x - p1.x > 0 ? p1.x - 2 : p2.x - 4}px`,
      "width": `${p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22}px`
    }}>
      <span className="arrow-message">{props.message}</span>
      <Svg reverse={p2.x - p1.x < 0} length={Math.abs(p2.x - p1.x) + 18} arrowWidth={getWidth()} />
      <span className="arrow-emoji">{props.emotion}</span>
    </div>
  )
}