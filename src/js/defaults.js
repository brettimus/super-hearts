module.exports = {
    circle: {
        angleRange: [0, 359],
        fanHearts: false,
        floatingInSpace: false,
        geyser: false,
        heartsCount: [6, 10],
        heartColor: "#B91319",
        imageSrc: undefined,
        opacityRange: [0.10, 0.75],
        rotateHearts: true,
        scalarRange: [0.15, 0.45],
        transformOrigin: "center center",
        transitionDuration: 400,
        transitionFunction: "ease-out",
        translateXRange: [0, 0],
        translateYRange: [15, 45],
    },
    line: {
        rotateHearts: false,
        transitionDuration: 650,
        translateXRange: [-60, 60]
    },
    geyser: {
        angleRange: [-10, 10],
        geyser: true,
        geyserInterval: 200,
        heartsCount: [1,1],
        opacityRange: [0.3, 0.6],
        scalarRange: [0.20, 0.25],
        transitionDuration: 800,
        translateXRange: [-45, 45],
        translateYRange: [30, 60]
    }
};