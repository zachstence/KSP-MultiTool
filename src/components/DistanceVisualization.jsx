import React, { useEffect, useState } from "react";

import "./DistanceVisualization.css";

const ZOOM_PERCENT = 0.1;

const DistanceVisualization = () => {
    const [scale, setScale] = useState(100);

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
        <div className="distance-visualization">
            <div
                className="visualization"
                style={{ width: scale, height: "30vh" }}
            >
                {scale}
            </div>
        </div>
    );
};

export default DistanceVisualization;
