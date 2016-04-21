define(['app/Vector', 'app/AssetLoader'], function(Vector, AssetLoader) {
    return function(src, position, origin, frameWidth, framesPerSecond, onLoad) {
        var that = {};
        var playhead = 0;
        var keyFrame = 0;
        var img = new Image();
        var numFrames = 0;
        var animationBounds = [];
        var pausedFramesPerSecond = 0;
        var destination = Vector();
        var velocity = Vector();
        var elapsedAnimationTimeSeconds = 0;
        var animationTimeSeconds = 0;
        var animationComplete = function () {};
        var previousPosition = Vector(position.x, position.y);
        var previousKeyFrame = keyFrame;
        var previousSize = Vector();
        var previousReverseState = false;
        var previousAnimation = "";
        if(typeof framesPerSecond === "undefined") framesPerSecond = 0;
        if(typeof position === "undefined") position = Vector();
        if(typeof origin === "undefined") origin = Vector();
        if(src !== "") AssetLoader.addAsset();
        var hidden = false;
        var showHidden = false;
        var notHiddenYet = false;

        that.currentAnimation = "default";
        that.position = Vector(position.x, position.y);
        that.size = Vector();
        that.reverse = false;

        that.addAnimationBounds = function(key, sFrame, nFrames, setFramesPerSecond) {
            animationBounds[key] = { start: sFrame, numFrames: nFrames, fps: setFramesPerSecond };
        };

        that.setAnimation = function() {

        };

        that.getFrameWidth = function() {
            return frameWidth;
        };

        that.visible = function(sizeVector) {
            return (
                (that.position.x + that.size.x) >= 0 && that.position.x <= sizeVector.x &&
                (that.position.y + that.size.y) >= 0 && that.position.y <= sizeVector.y);
        };

        that.pause = function() {
            if(framesPerSecond !== 0) pausedFramesPerSecond = framesPerSecond;
            playhead = 0;
            framesPerSecond = 0;
        };

        that.play = function () {
            if(pausedFramesPerSecond !== 0) framesPerSecond = pausedFramesPerSecond;
        };

        that.hide = function() {
            notHiddenYet = true;
            hidden = true;
        };

        that.show = function() {
            if(hidden) showHidden = true;
            hidden = false;
        };

        that.draw = function(context, elapsedTimeSeconds) {
            if(that.size.x === 0) return false;
            if(animationTimeSeconds > 0) {
                that.position.x += velocity.x * elapsedTimeSeconds;
                that.position.y += velocity.y * elapsedTimeSeconds;
                elapsedAnimationTimeSeconds += elapsedTimeSeconds;
                if(elapsedAnimationTimeSeconds >= animationTimeSeconds) {
                    that.position.x = destination.x;
                    that.position.y = destination.y;
                    animationTimeSeconds = 0;
                    animationComplete();
                }
            }
            playhead += elapsedTimeSeconds;
            keyFrame = animationBounds[that.currentAnimation].start + ~~(playhead * framesPerSecond) % animationBounds[that.currentAnimation].numFrames;

            var roundedPosition = Vector(~~that.position.x, ~~that.position.y);
            var roundedSize = Vector(~~that.size.x, ~~that.size.y);

            if(hidden) {
                if(notHiddenYet) {
                    context.clearRect(previousPosition.x, previousPosition.y, that.size.x, that.size.y);
                    notHiddenYet = false;
                    return true;
                }
                return false;
            }
            if(previousPosition.x != roundedPosition.x || previousPosition.y != roundedPosition.y ||
                previousSize.x != roundedSize.x || previousSize.y != roundedSize.y ||
                previousKeyFrame != keyFrame ||
                previousReverseState != that.reverse ||
                showHidden ||
                previousAnimation !== that.currentAnimation) {

                //TODO rework this into a separate function (clear sprites before redrawing, this may add some gross collision stuff, alternative is time dimensional data structure).
                if(!showHidden) context.clearRect(previousPosition.x, previousPosition.y, that.size.x, that.size.y);
                previousPosition = roundedPosition;
                previousKeyFrame = keyFrame;
                previousReverseState = that.reverse;
                previousSize = roundedSize;
                previousAnimation = that.currentAnimation;
                showHidden = false;

                context.save();
                var drawX = roundedPosition.x - origin.x;
                if(that.reverse)
                {
                    context.scale(-1, 1);
                    drawX = -drawX - frameWidth;
                }
                context.drawImage(img,
                    frameWidth * keyFrame,
                    0,
                    frameWidth,
                    roundedSize.y,
                    drawX,
                    roundedPosition.y - origin.y,
                    frameWidth,
                    roundedSize.y);
                context.restore();
                return true;
            }

            return false;
        };

        img.onload = function() {
            that.size.x = img.width;
            that.size.y = img.height;
            if(typeof frameWidth === "undefined") frameWidth = that.size.x;
            numFrames = Math.round(that.size.x / frameWidth);
            that.addAnimationBounds("default", 0, numFrames, framesPerSecond);
            if(typeof onLoad !== "undefined") onLoad();
            AssetLoader.loadAsset();
        };


        that.tweenPosition = function(distance, timeSeconds, onComplete) {
            destination.x = that.position.x + distance.x;
            destination.y = that.position.y + distance.y;
            velocity.x = distance.x / timeSeconds;
            velocity.y = distance.y / timeSeconds;
            animationComplete = onComplete;
            animationTimeSeconds = timeSeconds;
            elapsedAnimationTimeSeconds = 0;
        };


        img.src = src;

        return that;
    };
});
