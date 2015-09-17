define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Grid'], function(Vector, Sprite, Settings, Grid) {
    return function () {
        var that = {};
        /* contains each tile as a sprite. */
        var tiles = [];
        /* array of indecies into tiles */
        var tileGrid = null;
        /* the zero tile is always clear */
        tiles.push("");
        var firstFrameDrawn = false;
        that.redrawEachFrame = false;
        that.position = Vector();
        var gridSize = Vector();

        /* push a generic tile into the pallete */
        that.addTile = function(src) {
            //TODO add type checking of src
            tiles.push(src);
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

        that.draw = function(context) {
            tileGrid.each(function(cell, pos) {
                if(cell.tile.visible) cell.tile.draw(context);
            });
        };

        return that;
    };
});
