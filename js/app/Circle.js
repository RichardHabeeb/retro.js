define(['app/Vector'], function(Vector) {
    return function(setPosition, setRadius) {
        var that = {};

        that.position = Vector(setPosition.x, setPosition.y);
        that.radius = setRadius;

        that.overlappingWithCircle = function(other) {
            return(Math.sqrt((that.position.x - other.position.x)*(that.position.x - other.position.x) + (that.position.y - other.position.y)*(that.position.y - other.position.y)) <= (that.radius + other.radius));
        };


        return that;
    };
});
