define(['app/Vector'], function(Vector) {
    return function(src, position) {
        var that = {};
        var img = new Image();

        that.position = Vector(position.x, position.y);

        that.draw = function(context) {
            context.drawImage(img, that.position.x, that.position.y);
        };
        //img.onload = function() {};
        img.src = src;

        return that;
    };
});
