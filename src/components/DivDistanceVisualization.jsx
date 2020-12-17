import React, { createRef, useEffect, useState } from "react";

import "./DivDistanceVisualization.css";

const ZOOM_PERCENT = 0.1;

const PLANET_POS = 400;
const PLANET_SIZE = 50;

const DivDistanceVisualization = () => {
    const visRef = createRef();
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [visWidth, setVisWidth] = useState(0);

    useEffect(() => {
        console.log("componentDidMount");

        const scrollFunc = (e) => updateScale(e.deltaY);
        window.addEventListener("wheel", scrollFunc);

        setVisWidth(visRef.current.clientWidth);

        return () => {
            window.removeEventListener("wheel", scrollFunc);
        };
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

    const renderPlanet = (centerPos, size) => {
        let leftPos = centerPos - size / 2;

        let distanceFromCenter = visWidth / 2 - leftPos;
        let newDistanceFromCenter = distanceFromCenter * scale;
        let distanceFromLeft = visWidth / 2 - newDistanceFromCenter;

        let newSize = size * scale;

        return (
            <div className="planet-wrapper" style={{ left: distanceFromLeft }}>
                <div
                    className="planet"
                    style={{ width: newSize, height: newSize }}
                />
            </div>
        );
    };

    const whileDragging = (e) => {
        if (isDragging) {
            setTranslate((t) => t + 1);
            console.log(e);
        }
    };

    return (
        <div className="div-distance-visualization">
            <div
                className={`visualization dragging-${isDragging}`}
                ref={visRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseMove={whileDragging}
                onMouseUp={() => setIsDragging(false)}
            >
                <div className="middle-line" />
                <div className="normal-line" style={{ left: visWidth / 2 }} />

                {visWidth
                    ? [renderPlanet(0, 200), renderPlanet(visWidth / 2, 10)]
                    : null}
            </div>
        </div>
    );
};

export default DivDistanceVisualization;
