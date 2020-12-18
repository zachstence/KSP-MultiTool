import React, { createRef, useEffect, useState } from "react";

import "./DivDistanceVisualization.css";

const ZOOM_PERCENT = 0.1;

const BODIES = [
    // Distances in km
    { name: "Kerbol", color: "yellow", coordinate: 0, diameter: 261600 },
    { name: "Moho", color: "brown", coordinate: 5000000, diameter: 250 },
    { name: "Eve", color: "purple", coordinate: 10000000, diameter: 700 },
    { name: "Kerbin", color: "blue", coordinate: 14000000, diameter: 600 },
    { name: "Duna", color: "red", coordinate: 21000000, diameter: 320 },
    { name: "Dres", color: "gray", coordinate: 42000000, diameter: 320 },
    { name: "Jool", color: "green", coordinate: 69000000, diameter: 6000 },
    { name: "Eeloo", color: "white", coordinate: 90000000, diameter: 210 },
];
const MAX_COORD = 115000000;

const MIN_BODY_SIZE = 10;

const DivDistanceVisualization = () => {
    const visRef = createRef();
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [translate, setTranslate] = useState(0);
    const [visWidth, setVisWidth] = useState();
    const [ratio, setRatio] = useState(1);

    useEffect(() => {
        const scrollFunc = (e) => updateScale(e.deltaY);
        window.addEventListener("wheel", scrollFunc);

        setVisWidth(visRef.current.clientWidth);

        return () => {
            window.removeEventListener("wheel", scrollFunc);
        };
    }, []);

    useEffect(() => {
        if (visWidth) {
            setRatio(MAX_COORD / visWidth);
        }
    }, [visWidth]);

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

    const renderPlanet = (body) => {
        const visSize = Math.max(MIN_BODY_SIZE, body.diameter / ratio);
        console.log(visSize);

        const pos = body.coordinate / ratio + translate;
        // console.log("pos: ", pos);

        const distanceFromVisCenter = visWidth / 2 - pos;
        // console.log("distanceFromVisCenter", distanceFromVisCenter);

        const scaledDistanceFromVisCenter = distanceFromVisCenter * scale;
        // console.log("scaledDistanceFromVisCenter", scaledDistanceFromVisCenter);

        const scaledPos = visWidth / 2 - scaledDistanceFromVisCenter;

        const leftEdgePos = scaledPos - visSize / 2;

        return (
            <div
                key={body.name}
                className="planet-wrapper"
                style={{ left: leftEdgePos }}
            >
                <div
                    className="planet"
                    style={{
                        width: visSize,
                        height: visSize,
                        backgroundColor: body.color,
                    }}
                />
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

    console.log("render");
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
                          return renderPlanet(body);
                      })
                    : null}
            </div>
        </div>
    );
};

export default DivDistanceVisualization;
