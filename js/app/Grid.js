define(['app/Vector', 'app/Cell', 'app/Direction'], function(Vector, Cell, Direction) {
    return function(setGridSize) {
        if(typeof setGridSize === "undefined") gridSize = Vector();
        else gridSize = Vector(setGridSize.x, setGridSize.y);
        var that = {};
        var gridCells = [];

        (function setupArray() {
            var x, y;
            for(y = 0; y < gridSize.y; y++) {
                for(x = 0; x < gridSize.x; x++) {
                    gridCells[y * gridSize.x + x] = Cell();

                    if(y > 0) gridCells[y * gridSize.x + x].setAdjacentCell(Direction.top, gridCells[(y - 1) * gridSize.x + x]);
                    if(x > 0) gridCells[y * gridSize.x + x].setAdjacentCell(Direction.left, gridCells[y * gridSize.x + x - 1]);

                }
            }
            for(y = 0; y < gridSize.y; y++) {
                for(x = 0; x < gridSize.x; x++) {
                    if(x < (gridSize.x - 1)) gridCells[y * gridSize.x + x].setAdjacentCell(Direction.right, gridCells[y * gridSize.x + x + 1]);
                    if(y < (gridSize.y - 1)) gridCells[y * gridSize.x + x].setAdjacentCell(Direction.bottom, gridCells[(y + 1) * gridSize.x + x]);
                }
            }
        })();

        that.getCell = function(pos) {
            if(pos.y < 0 || pos.x < 0 || pos.x >= gridSize.x || pos.y >= gridSize.y) return null;
            return gridCells[pos.y * gridSize.x + pos.x];
        };

        that.each = function(lambda) {
            for(var y = 0; y < gridSize.y; y++) {
                for(var x = 0; x < gridSize.x; x++) {
                    lambda(gridCells[y * gridSize.x + x], Vector(x, y));
                }
            }
        };


        that.getRectangleOfCells = function(rect) {
            var ret = [];
            for(var y = rect.y; y < (rect.y + rect.height); y++) {
                for(var x = rect.x; x < (rect.x + rect.width); x++) {
                    var c = that.getCell(Vector(x, y));
                    if(c !== null) ret.push(c);
                }
            }
            return ret;
        };




        return that;
    };
});
