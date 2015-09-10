define(function (require) {
    var Vector = require('./Vector');
    var Settings = require('./Settings');
    var Layer = require('./Layer');

    var layers = [];
    for(var i = 0; i < Settings.numberOfLayers; i++)
    {
        layers.push(Layer(document.body, Settings.canvasSize, Settings.canvasScale));
    }

    var jelly = new Image();
    jelly.onload = function() {
        layers[0].context.drawImage(jelly, 0, 0);
    };
    jelly.src = "img/Jelly.png";

    console.log("Loaded.");
});
