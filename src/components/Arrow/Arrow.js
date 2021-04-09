import React, { useState, useEffect } from "react"
// import { getArrow } from "perfect-arrows"
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

  // const arrow = getArrow(p1.x + p1.width / 2, p1.y + p1.height / 2, p1.x < p2.x ? p2.x : p2.x + p2.width, p2.y + p2.height / 2, {
  //   padEnd: 0,
  // })

  // const [sx, sy, cx, cy, ex, ey, ae, as, ec] = arrow

  const getWidth = () => p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22

  return (
    <div className="svg-container" style={{
      "position": "absolute",
      "top": `${p1.y + 1}px`,
      "left": `${p2.x - p1.x > 0 ? p1.x + 1 : p2.x - 2}px`,
      "width": `${p2.x - p1.x > 0 ? Math.abs(p2.x - p1.x) + 22 : Math.abs(p2.x - p1.x) + 22}px`
    }}>
      <Svg origin={{
        x: 200,
        y: 200
      }} deltaActor={2} reverse={p2.x - p1.x < 0} length={Math.abs(p2.x - p1.x) + 15} arrowWidth={getWidth()} />
    </div>
  )
}