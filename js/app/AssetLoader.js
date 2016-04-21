define([], function() {
    var that = {};
    var count = 0;
    var loaded = false;
    that.onLoad = function () {}; /* override me */

    that.addAsset = function() {
        count++;
    };

    that.loadAsset = function() {
        if(--count === 0 && !loaded) {
            loaded = true;
            that.onLoad();
        }
    };

    return that;
});
