define(function (require) {
    var Vector = require('./Vector');
    var Settings = require('./Settings');
    var Sprite = require('./Sprite');
    var Layer = require('./Layer');
    var previousTimeStamp = null;

    var layers = [];
    for(var i = 0; i < Settings.numberOfLayers; i++) {
        layers.push(Layer(document.body, Settings.canvasSize, Settings.canvasScale));
    }


    /*
    initialize and attach stuff here
    */

    var jelly = Sprite("img/Jelly.png", Vector(200, 0));
    layers[0].attachSprite(jelly);

    var jelly2 = Sprite("img/Jelly.png", Vector(210, 10));
    layers[1].attachSprite(jelly2);


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
