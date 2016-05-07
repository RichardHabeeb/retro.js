define(['app/Vector'], function(Vector) {
    function Circle(setPosition, setRadius) {

        this.position = new Vector(setPosition.x, setPosition.y);
        this.radius = setRadius;
    }

    Circle.prototype.overlappingWithCircle = function(other) {
        return(Math.sqrt((this.position.x - other.position.x)*(this.position.x - other.position.x) + (this.position.y - other.position.y)*(this.position.y - other.position.y)) <= (this.radius + other.radius));
    };


    return Circle;
});
