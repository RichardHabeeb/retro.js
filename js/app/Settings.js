define(['app/Vector'], function(Vector) {
    return {
        canvasSize: Vector(128,128),
        canvasScale: 4,
        drawableAreaSize: Vector(256,256),
        numberOfLayers: 3,
        tileSize: Vector(32, 32),
        numTiles: Vector(8, 8), /* this can go over the bounds of the canvas */
    };
});
