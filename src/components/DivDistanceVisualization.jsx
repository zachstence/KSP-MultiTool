import React, { useEffect, useState } from "react";

import "./DivDistanceVisualization.css";

const ZOOM_PERCENT = 0.1;
const VISUALIZATION_WIDTH = window.innerWidth;
const VISUALIZATION_HEIGHT = window.innerHeight * 0.4;

const DivDistanceVisualization = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        window.addEventListener("wheel", (e) => updateScale(e.deltaY));

        return () => window.removeEventListener("wheel");
    }, []);

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

    return (
        <div className="div-distance-visualization">
            <div className="visualization">
                <div className="middle-line" />
                <div className="planet-wrapper" style={{ left: 200 }}>
                    <div className="planet" style={{ width: 50, height: 50 }} />
                </div>
            </div>
        </div>
    );
};

export default DivDistanceVisualization;
