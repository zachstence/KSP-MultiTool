import React, { useEffect, useRef, useState } from "react";

import "./DistanceVisualization.css";

const ZOOM_PERCENT = 0.1;

const DistanceVisualization = () => {
    const canvasRef = useRef();
    const [scale, setScale] = useState(1);

    useEffect(() => {
        window.addEventListener("wheel", (e) => updateScale(e.deltaY));
        initCanvas();

        return () => window.removeEventListener("wheel");
    }, []);

    useEffect(() => {
        updateCanvas();
    }, [scale]);

    const updateScale = (deltaY) => {
        setScale((scale) => {
            let newScale;

            if (deltaY < 0) {
                newScale = scale * (1 + ZOOM_PERCENT);
            } else if (deltaY > 0) {
                newScale = scale / (1 + ZOOM_PERCENT);
            } else {
                newScale = scale;
            }

            if (newScale <= 1) newScale = 1;

            return newScale;
        });
    };

    const initCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * scale;
        canvas.height = window.innerHeight * 0.4;

        const ctx = canvas.getContext("2d");

        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
    };

    const updateCanvas = () => {
        console.log("updateCanvas");
        const canvas = canvasRef.current;
        // canvas.width = window.innerWidth * scale;
    };

    return (
        <div className="distance-visualization">
            <canvas className="visualization" ref={canvasRef} />
        </div>
    );
};

export default DistanceVisualization;
