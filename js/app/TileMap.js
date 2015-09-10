define(['app/Vector', 'app/Sprite', 'app/Settings'], function(Vector, Sprite, Settings) {
    return function () {
        var that = {};
        /* contains each tile as a sprite. */
        var tiles = [];
        /* array of indecies into tiles */
        var tileLayout = [];
        /* the zero tile is always clear */
        tiles.push(undefined);

        /* push a generic tile into the pallete */
        that.addTile = function(src) {
            //TODO add type checking of src
            tiles.push(Sprite(src, Vector()));
        };

        /* add a predefined sprite into the pallete, useful for animated sprites */
        that.addSprite = function(spr) {
            tiles.push(spr);
        };

        that.addLayout = function(grid) {
            //TODO add size/type checking of grid
            /* clone grid into tile layout */
            tileLayout = grid.slice(0);
        };

        that.draw = function(context) {
            for(var y = 0; y < Settings.tilesPerColumn; y++) {
                for(var x = 0; x < Settings.tilesPerRow; x++) {
                    var tile = tiles[tileLayout[x + y * Settings.tilesPerRow]];
                    tile.position.x = x * Settings.tileSize.x;
                    tile.position.y = y * Settings.tileSize.y;
                    tile.draw(context);
                }
            }
        };

        return that;
    };
});
