import React, { createRef, useEffect, useState } from "react";

import "./DivDistanceVisualization.css";

const ZOOM_PERCENT = 0.1;

const BODIES = [
    { name: "Kerbol", loc: 0 },
    { name: "Moho", loc: 5 },
    { name: "Eve", loc: 10 },
    { name: "Kerbin", loc: 14 },
    { name: "Duna", loc: 21 },
    { name: "Dres", loc: 42 },
    { name: "Jool", loc: 69 },
    { name: "Eeloo", loc: 90 },
];
const MAX_COORD = 115;

const DivDistanceVisualization = () => {
    const visRef = createRef();
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [visWidth, setVisWidth] = useState();

    useEffect(() => {
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

    /*
        Coord = coordinate in space
        Pos = position in the HTML visualization

        ?
    */

    const renderPlanet = (coord, size) => {
        const pos = (coord / MAX_COORD) * visWidth + translate;
        // console.log("pos: ", pos);

        const distanceFromVisCenter = visWidth / 2 - pos;
        // console.log("distanceFromVisCenter", distanceFromVisCenter);

        const scaledDistanceFromVisCenter = distanceFromVisCenter * scale;
        // console.log("scaledDistanceFromVisCenter", scaledDistanceFromVisCenter);

        const scaledPos = visWidth / 2 - scaledDistanceFromVisCenter;

        const leftEdgePos = scaledPos - size / 2;

        return (
            <div className="planet-wrapper" style={{ left: leftEdgePos }}>
                <div className="planet" style={{ width: size, height: size }} />
            </div>
        );
    };

    let lastDragEvent;
    const whileDragging = (e) => {
        if (isDragging) {
            if (lastDragEvent) {
                const delta = e.clientX - lastDragEvent.clientX;
                setTranslate((t) => t + delta);
            }
            lastDragEvent = e;
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
                    ? BODIES.map((body) => {
                          return renderPlanet(body.loc, 50);
                      })
                    : null}
            </div>
        </div>
    );
};

export default DivDistanceVisualization;
