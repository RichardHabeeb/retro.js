define(['app/Vector', 'app/Direction'], function(Vector, Direction) {
    return function() {
        var that = {};

        var adjacentCells = [];
        adjacentCells[Direction.top] =  null;
        adjacentCells[Direction.bottom] =  null;
        adjacentCells[Direction.left] =  null;
        adjacentCells[Direction.right] =  null;

        that.getAdjacentCell = function(dir){
            return adjacentCells[dir];
        };

        that.setAdjacentCell = function(dir, cell) {
            adjacentCells[dir] = cell;
        };

        return that;
    };
});
