define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Grid', 'app/TileMap', 'app/Layer'], function(Vector, Sprite, Settings, Grid, TileMap, Layer) {
    return function() {
        var i;
        var that = {};

        var layers = [];
        for(i = 0; i < Settings.numberOfLayers; i++) {
            layers.push(Layer(document.body, Settings.canvasSize, Settings.canvasScale, Settings.drawableAreaSize));
            layers[i].setZ(i);
        }

        var tileMap = TileMap();
        tileMap.addTile("img/pink.png");
        tileMap.addTile("img/blue.png");

        var layout = [];
        for(i = 0; i < Settings.numTiles.x*Settings.numTiles.y; i++)
        {
            layout.push(Math.floor(Math.random()*(tileMap.count() - 1))+1);
        }

        tileMap.addLayout(layout, Settings.numTiles);

        layers[0].attachDrawable(tileMap);

        that.attachSprite = function(sprite, layerNum) {
            if(layerNum < 0 || layerNum >= Settings.numberOfLayers)
            {
                console.log("Invalid layer number.");
                return;
            }
            layers[layerNum].attachDrawable(sprite);
        };

        that.moveAll = function(offset) {
            for(var i = 0; i < layers.length; i++) {
                layers[i].position.x = Math.min(0, Math.max(Settings.canvasSize.x - Settings.drawableAreaSize.x, layers[i].position.x + offset.x));
                layers[i].position.y = Math.min(0, Math.max(Settings.canvasSize.y - Settings.drawableAreaSize.y, layers[i].position.y + offset.y));
            }
        };

        that.draw = function(elapsedTimeSeconds) {
            for(var i = 0; i < layers.length; i++) {
                layers[i].draw(elapsedTimeSeconds);
            }
        };

        that.click = function(handler) {
            layers[layers.length - 1].setClickHandler(handler);
        };

        return that;
    };
});
