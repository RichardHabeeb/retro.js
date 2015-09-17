define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Grid'], function(Vector, Sprite, Settings, Grid) {
    return function () {
        var that = {};
        /* contains each tile as a sprite. */
        var tiles = [];
        /* array of indecies into tiles */
        var tileGrid = null;
        /* the zero tile is always clear */
        tiles.push(undefined);
        var firstFrameDrawn = false;
        that.redrawEachFrame = false;
        that.position = Vector();
        var gridSize = Vector();

        function allTilesLoaded () {
            var ret = true;
            for(var i = 1; i < tiles.length; i++) {
                ret = ret && tiles[i].size.x > 0;
            }
            return ret;
        }

        /* push a generic tile into the pallete */
        that.addTile = function(src) {
            //TODO add type checking of src
            tiles.push(Sprite(src, Vector()));
        };

        /* add a predefined sprite into the pallete, useful for animated sprites */
        that.addSprite = function(spr) {
            tiles.push(spr);
        };

        that.addLayout = function(tileLayout, size) {
            gridSize = Vector(size.x, size.y);
            tileGrid = Grid(gridSize);
            tileGrid.each(function(cell, pos) {
                cell.tile = tileLayout[pos.y * size.x + pos.x];
            });
            firstFrameDrawn = false;
        };

        that.draw = function(context) {
            if(tileGrid === null || !that.redrawEachFrame && firstFrameDrawn) return;
            if(!firstFrameDrawn) firstFrameDrawn = allTilesLoaded();

            context.clearRect(that.position.x, that.position.y, gridSize.x * Settings.tileSize.x, gridSize.y * Settings.tileSize.x);
            tileGrid.each(function(cell, pos) {
                var tile = tiles[cell.tile];
                if(typeof tile !== 'undefined') {
                    tile.position.x = pos.x * Settings.tileSize.x;
                    tile.position.y = pos.y * Settings.tileSize.y;
                    if(tile.visible)
                    tile.draw(context);
                }
            });
        };

        return that;
    };
});
