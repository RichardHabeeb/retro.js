define(['app/Vector'], function() {
    var that = {
        top: 0,
        bottom: 1,
        left: 2,
        right: 3,
    };

    that.numberOfDirections = 4;

    that.each = function(lambda) {
        for(var i = that.top; i < that.numberOfDirections; i++) {
            lambda(i);
        }
    };

    that.opposite = function(dir) {
        return (dir + 2) % that.numberOfDirections;
    };

    return that;
});
