define(['app/Vector'], function(Vector) {
    return {
        canvasSize: new Vector(256,224),
        canvasScale: 4,
        drawableAreaSize: new Vector(512,512),
        numberOfLayers: 6,
        tileSize: new Vector(32, 32),
        numTiles: new Vector(8, 7), /* this can go over the bounds of the canvas */
    };
});
