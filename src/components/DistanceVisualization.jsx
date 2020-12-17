import React, { useEffect, useState } from "react";

const ZOOM_PERCENT = 0.1;

const DistanceVisualization = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        window.addEventListener("wheel", (e) => updateScale(e.deltaY));

        return () => window.removeEventListener("wheel");
    }, []);

    const updateScale = (deltaY) => {
        const inc = deltaY * ZOOM_PERCENT;
        setScale((scale) => {
            let newScale;

            if (deltaY > 0) {
                newScale = scale * (1 + ZOOM_PERCENT);
            } else if (deltaY < 0) {
                newScale = scale / (1 + ZOOM_PERCENT);
            } else {
                newScale = scale;
            }

            if (newScale <= 1) newScale = 1;

            return newScale;
        });
    };

    return <div style={{ width: scale, height: scale }}>{scale}</div>;
};

export default DistanceVisualization;
