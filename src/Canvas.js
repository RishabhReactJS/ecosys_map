import React, {useEffect} from 'react'
import './canvas.css'

export default function Canvas() {
    let canvas;
    let ctx;
    const handleAddElement = (event) =>{
        console.info(canvas)
        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.beginPath()
        ctx.moveTo(35, 55)
        ctx.lineTo(35, 125);
        ctx.stroke()

    }

    useEffect(() => {
        canvas = document.getElementById('canvas');
            if (canvas.getContext) {
                ctx = canvas.getContext('2d');
              ctx.fillStyle = 'rgb(200, 0, 0)';
              ctx.fillRect(10, 10, 50, 50);
            }
    }, [])
    return (
        <div>Heelo out of canvas
               <canvas id="canvas"></canvas>
               <button className={"action-btn"} onClick={handleAddElement}>+</button>
                <button>-</button>
        </div>
    )
}
