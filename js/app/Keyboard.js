define([], function() {
    return function(keyCodes) {
        var that = {};

        that.keyPressed = [];
        for(var i = 0; i < 250; i++) that.keyPressed[i] = false;

        var defaultPreventers = [];
        that.preventDefault = function(key, state) {
            if(typeof(state) === "undefined") state = true;
            defaultPreventers[key] = state;
        };

        var keyDownEvents = [];
        that.addDownEvent = function(key, event) {
            keyDownEvents[key] = event;
        };

        that.removeDownEvent = function(key) {
            keyDownEvents[key] = undefined;
        };

        var keyUpEvents = [];
        that.addUpEvent = function(key, event) {
            keyUpEvents[key] = event;
        };

        that.removeUpEvent = function(key) {
            keyUpEvents[key] = undefined;
        };


        function keyDownListener(e) {
            var key = e.which || e.keyCode;
            if(typeof(keyDownEvents[key]) !== "undefined") keyDownEvents[key]();
            if(typeof(defaultPreventers[key]) !== "undefined" && defaultPreventers[key]) e.preventDefault();
            that.keyPressed[key] = true;
        }

        function keyUpListener(e) {
            var key = e.which || e.keyCode;
            if(typeof(keyUpEvents[key]) !== "undefined") keyUpEvents[key]();
            if(typeof(defaultPreventers[key]) !== "undefined" && defaultPreventers[key]) e.preventDefault();
            that.keyPressed[key] = false;
        }

        that.startListener = function() {
            window.onkeydown = keyDownListener;
            window.onkeyup = keyUpListener;
        };

        that.stopListener = function() {
            window.onkeydown = function() {};
            window.onkeyup = function() {};
        };

        return that;
    };
});
