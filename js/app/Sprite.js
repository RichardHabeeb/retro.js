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
            /* This seems ok here. I am unsure if it will be faster/less confusing we we just clear whole Layer */
            context.clearRect(that.position.x, that.position.y, that.size.x, that.size.y);
            /* Using Math.floor here gets a pretty significant performance increase */
            context.drawImage(img, Math.floor(that.position.x), Math.floor(that.position.y));
        };

        img.onload = function() {
            that.size.x = img.width;
            that.size.y = img.height;
        };
        img.src = src;

        return that;
    };
});
