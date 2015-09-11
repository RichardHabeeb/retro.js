define(['app/Vector'], function(Vector) {
    return function(src, position) {
        var that = {};
        var img = new Image();

        that.position = Vector(position.x, position.y);
        that.size = Vector();

        that.visible = function(sizeVector) {
            return (
                (that.position.x + that.size.x) >= 0 && that.position.x <= sizeVector.x &&
                (that.position.y + that.size.y) >= 0 && that.position.y <= sizeVector.y);
        };

        that.draw = function(context) {
            /* Using Math.floor here gets a pretty significant performance increase. I am using a round hack that gets even better performance. */
            context.drawImage(img, ~~ (0.5 + that.position.x), ~~ (0.5 + that.position.y));
        };

        img.onload = function() {
            that.size.x = img.width;
            that.size.y = img.height;
        };
        img.src = src;

        return that;
    };
});
