import React, { useEffect } from "react";

const DistanceVisualization = () => {
    const canvasRef = React.createRef();

    useEffect(() => {
        initCanvas();
    });

    const initCanvas = () => {
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 2;
    };

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.font = "30px Arial";
        ctx.fillText("This is a canvas", 100, 100);
    };

    return <canvas onClick={updateCanvas} ref={canvasRef}></canvas>;
};

export default DistanceVisualization;
