define(function () {
    function Vector (setX, setY) {
        if (typeof setX === 'undefined') {
            setX = 0;
        }

        if (typeof setY === 'undefined') {
            setY = 0;
        }

        this.x = setX;
        this.y = setY;
    }

    Vector.prototype.getLength = function() {
        return Math.sqrt((this.x)*(this.x) + (this.y)*(this.y));
    };

    Vector.prototype.getAngle = function() {
        return Math.atan2(this.y, this.x);
    };

    Vector.prototype.setLength = function(len) {
        var old = this.getLength();
        if(old === 0) old = 1;
        this.x = this.x * len / old;
        this.y = this.y * len / old;
    };

    Vector.prototype.setAngle = function(theta) {
        var old = this.getLength();
        this.x = old * Math.cos(theta);
        this.y = old * Math.sin(theta);
    };

    return Vector;
});
