define(['app/Vector', 'app/Circle', 'app/Settings'], function(Vector, Circle, Settings) {
    return function(sprite) {
        var that = {};
        var bounds = null;

        that.draw = function(context, elapsedTimeSeconds) {
            return sprite.draw(context, elapsedTimeSeconds);
        };

        /* this rectangle's coords are relative to the sprite's position */
        that.setBoundingCircle = function(c) {
            bounds = c;
        };

        that.getBoundingCircle = function(c) {
            if(bounds === null) return Circle(sprite.position, 16); //todo magic number
            return bounds;
        };

        that.spriteFacingLeft = function() {
            return sprite.reverse;
        };


        that.update = function(elapsedTimeSeconds) {

        };

        return that;
    };
});
