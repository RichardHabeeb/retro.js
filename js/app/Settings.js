define(['app/Vector'], function(Vector) {
    return {
        canvasSize: Vector(256,128),
        canvasScale: 4,
        numberOfLayers: 3,
        tileSize: Vector(32, 32),
        tilesPerRow: 8, /* default  is 8x4 (256/32) */
        tilesPerColumn: 4,
    };
});
