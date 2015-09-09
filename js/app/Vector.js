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

        return that;
    };
});
