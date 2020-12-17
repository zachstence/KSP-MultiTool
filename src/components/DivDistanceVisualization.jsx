import React, { createRef, useEffect, useState } from "react";

import "./DivDistanceVisualization.css";

const ZOOM_PERCENT = 0.05;

const PLANET_POS = 400;
const PLANET_SIZE = 50;

const DivDistanceVisualization = () => {
    const visRef = createRef();
    const [scale, setScale] = useState(1);
    const [visWidth, setVisWidth] = useState();

    useEffect(() => {
        console.log("componentDidMount");
        const listener = window.addEventListener("wheel", (e) =>
            updateScale(e.deltaY)
        );

        setVisWidth(visRef.current.clientWidth);

        return () => window.removeEventListener("wheel", listener);
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

    const renderPlanet = () => {
        let distanceFromCenter = visWidth / 2 - PLANET_POS;
        let newDistanceFromCenter = distanceFromCenter * scale;
        console.log(newDistanceFromCenter);
        let pos = visWidth / 2 - newDistanceFromCenter;
        console.log(pos);
        return (
            <>
                <div
                    className="temp-line"
                    style={{ border: "1px dashed red", left: pos }}
                />
                <div className="temp-line" style={{ left: visWidth / 2 }} />
            </>
        );
    };

    return (
        <div className="div-distance-visualization">
            <div className="visualization" ref={visRef}>
                <div className="middle-line" />
                {visWidth ? renderPlanet() : null}
            </div>
        </div>
    );
};

export default DivDistanceVisualization;
