define(['app/Vector'], function(Vector) {
    return {
        canvasSize: Vector(256,224),
        canvasScale: 4,
        drawableAreaSize: Vector(512,512),
        numberOfLayers: 6,
        tileSize: Vector(32, 32),
        numTiles: Vector(8, 7), /* this can go over the bounds of the canvas */
    };
});
