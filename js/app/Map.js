define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Grid', 'app/TileMap', 'app/Layer'], function(Vector, Sprite, Settings, Grid, TileMap, Layer) {
    return function() {
        var that = {};

        var layers = [];
        for(var i = 0; i < Settings.numberOfLayers; i++) {
            layers.push(Layer(document.body, Settings.canvasSize, Settings.canvasScale, Settings.drawableAreaSize));
            layers[i].setZ(i);
        }

        var jelly = Sprite("img/Jelly.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y));
        layers[1].attachDrawable(jelly);

        var jelly2 = Sprite("img/Jelly.png", Vector(6 * Settings.tileSize.x, 2 * Settings.tileSize.y));
        layers[2].attachDrawable(jelly2);

        var tileMap = TileMap();
        tileMap.addTile("img/Brick 1.png");
        tileMap.addTile("img/Dirt 1.png");
        tileMap.addTile("img/Dirt into Brick.png");

        tileMap.addLayout([
            1, 1, 1, 1, 1, 1, 1, 1,
            3, 3, 3, 3, 3, 3, 3, 3,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
            1, 1, 1, 1, 1, 1, 1, 1,
            3, 3, 3, 3, 3, 3, 3, 3,
            2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2,
        ], Settings.numTiles);

        layers[0].attachDrawable(tileMap);

        that.moveAll = function(offset) {
            for(var i = 0; i < layers.length; i++) {
                layers[i].position.x = Math.min(0, Math.max(Settings.canvasSize.x - Settings.drawableAreaSize.x, layers[i].position.x + offset.x));
                layers[i].position.y = Math.min(0, Math.max(Settings.canvasSize.y - Settings.drawableAreaSize.y, layers[i].position.y + offset.y));
            }
        };

        that.draw = function(elapsedTimeSeconds) {
            jelly2.position.x -= 10 * elapsedTimeSeconds;
            that.moveAll(Vector(-20 * elapsedTimeSeconds, -20 * elapsedTimeSeconds));

            for(var i = 0; i < layers.length; i++) {
                layers[i].draw(elapsedTimeSeconds);
            }
        };

        return that;
    };
});
