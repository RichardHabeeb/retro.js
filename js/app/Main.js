define(function (require) {
    var Vector = require('./Vector');
    var Settings = require('./Settings');
    var Sprite = require('./Sprite');
    var Layer = require('./Layer');
    var TileMap = require('./TileMap');
    var previousTimeStamp = null;

    var layers = [];
    for(var i = 0; i < Settings.numberOfLayers; i++) {
        layers.push(Layer(document.body, Settings.canvasSize, Settings.canvasScale));
    }

    /*
    initialize and attach stuff here
    */

    var jelly = Sprite("img/Jelly.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y));
    layers[1].attachSprite(jelly);

    var jelly2 = Sprite("img/Jelly.png", Vector(6 * Settings.tileSize.x, 2 * Settings.tileSize.y));
    layers[2].attachSprite(jelly2);

    var tileMap = TileMap();
    tileMap.addTile("img/Brick 1.png");
    tileMap.addTile("img/Dirt 1.png");
    tileMap.addTile("img/Dirt into Brick.png");

    tileMap.addLayout([
        1, 1, 1, 1, 1, 1, 1, 1,
        3, 3, 3, 3, 3, 3, 3, 3,
        2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2,
    ], Settings.numTiles);
    
    layers[0].tileMap = tileMap;

    /* Animation loop */
    var loop = function (timeStamp) {
        if(!previousTimeStamp) previousTimeStamp = timeStamp;
        var elapsedTimeSeconds = (timeStamp - previousTimeStamp) / 1000.0;

        /*
        update position code here, every frame
        */
        jelly2.position.x -= 10 * elapsedTimeSeconds;

        for(var i = 0; i < layers.length; i++) {
            layers[i].draw(elapsedTimeSeconds);
        }
        previousTimeStamp = timeStamp;
        window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);

    console.log("Loaded.");
});
