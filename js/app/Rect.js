define(['app/Vector'], function(Vector) {
    return function (setX, setY, setWidth, setHeight) {
        var that = {};
        if (typeof setX === 'undefined') {
            setX = 0;
        }

        if (typeof setY === 'undefined') {
            setY = 0;
        }

        if (typeof setWidth === 'undefined') {
            setWidth = 0;
        }

        if (typeof setHeight === 'undefined') {
            setHeight = 0;
        }


        that.buildFromVectors = function(topLeftPos, size) {
            that.x = topLeftPos.x;
            that.y = topLeftPos.y;
            that.width = size.x;
            that.height = size.y;
            return that;
        };

        that.overlappingWithRectangle = function(other) {
            // If one rectangle is on left side of other
             if (that.x >= (other.x + other.width) || other.x >= (that.x + that.width))
                 return false;

             // If one rectangle is above other
             if (that.y >= (other.y + other.height) || other.y >= (that.y + that.height))
                 return false;

             return true;
        };

        that.getOverlapOffset = function(other) {
            var ret = new Vector();
            if(that.overlappingWithRectangle(other)) {
                var distLeft = other.x - (that.x + that.width);
                var distRight = (other.x + other.width) - that.x;
                var distTop = other.y - (that.y + that.height);
                var distBottom = (other.y + other.height) - that.y;
                var smallestMag = Math.min(Math.abs(distLeft), Math.abs(distRight), Math.abs(distTop), Math.abs(distBottom));
                if(Math.abs(distLeft) === smallestMag) {
                    ret.x = distLeft;
                }
                if(Math.abs(distRight) === smallestMag) {
                    ret.x = distRight;
                }
                if(Math.abs(distTop) === smallestMag) {
                    ret.y = distTop;
                }
                if(Math.abs(distBottom) === smallestMag) {
                    ret.y = distBottom;
                }
            }
            return ret;
        };

        that.x = setX;
        that.y = setY;
        that.width = setWidth;
        that.height = setHeight;


        return that;
    };
});
