define(function () {
    return function (setX, setY) {
        var that = {};
        if (typeof setX === 'undefined') {
            setX = 0;
        }

        if (typeof setY === 'undefined') {
            setY = 0;
        }

        that.x = setX;
        that.y = setY;

        that.getLength = function() {
            return Math.sqrt((that.x)*(that.x) + (that.y)*(that.y));
        };

        that.getAngle = function() {
            return Math.atan2(that.y, that.x);
        };

        that.setLength = function(len) {
            var old = that.getLength();
            if(old === 0) old = 1;
            that.x = that.x * len / old;
            that.y = that.y * len / old;
        };

        that.setAngle = function(theta) {
            var old = that.getLength();
            that.x = old * Math.cos(theta);
            that.y = old * Math.sin(theta);
        };

        return that;
    };
});
