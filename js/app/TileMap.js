define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Grid'], function(Vector, Sprite, Settings, Grid) {
    return function () {
        var that = {};
        /* contains each tile as a sprite. */
        var tiles = [];
        /* array of indecies into tiles */
        var tileGrid = null;
        /* the zero tile is always clear */
        tiles.push("");
        that.position = Vector();
        var gridSize = Vector();

        /* push a generic tile into the pallete */
        that.addTile = function(src) {
            //TODO add type checking of src
            tiles.push(src);
        };

        that.count = function() {
            return tiles.length;
        };

        /* add a predefined sprite into the pallete, useful for animated sprites */
        that.addSprite = function(spr) {
            tiles.push(spr);
        };

        that.addLayout = function(tileLayout, size) {
            gridSize = Vector(size.x, size.y);
            tileGrid = Grid(gridSize);
            tileGrid.each(function(cell, pos) {
                cell.tile = Sprite(tiles[tileLayout[pos.y * size.x + pos.x]], Vector(pos.x * Settings.tileSize.x, pos.y * Settings.tileSize.y));
            });
            firstFrameDrawn = false;
        };

        that.draw = function(context, elapsedTimeSeconds) {
            var ret = 0;
            tileGrid.each(function(cell, pos) {
                ret += cell.tile.draw(context, elapsedTimeSeconds) ? 1 : 0;
            });
            return ret > 0;
        };

        return that;
    };
});
