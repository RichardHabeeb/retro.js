define(['app/Vector', 'app/AssetLoader'], function(Vector, AssetLoader) {
    return function(src, position, origin, frameWidth, framesPerSecond, onLoad, onLoop) {
        var that = {};
        var playhead = 0;
        var keyFrame = 0;
        var img = new Image();
        var numFrames = 0;
        var animationBounds = [];
        var destination = new Vector();
        var velocity = new Vector();
        var elapsedAnimationTimeSeconds = 0;
        var animationTimeSeconds = 0;
        var animationComplete = function () {};
        var previousPosition = new Vector(position.x, position.y);
        var previousKeyFrame = keyFrame;
        var previousSize = new Vector();
        var previousReverseState = false;
        var previousAnimation = "";
        if(typeof framesPerSecond === "undefined") framesPerSecond = 0;
        if(typeof position === "undefined") position = new Vector();
        if(typeof origin === "undefined") origin = new Vector();
        if(src !== "") AssetLoader.addAsset();
        var hidden = false;
        var showHidden = false;
        var notHiddenYet = false;
        var paused = false;

        that.currentAnimation = "default";
        that.position = new Vector(position.x, position.y);
        that.size = new Vector();
        that.reverse = false;

        that.addAnimationBounds = function(key, sFrame, nFrames, setFramesPerSecond) {
            animationBounds[key] = { start: sFrame, numFrames: nFrames, fps: setFramesPerSecond };
        };

        that.setAnimation = function() {

        };

        that.setLoopHandler = function(h) {
            onLoop = h;
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
            paused = true;
            //if(framesPerSecond !== 0) pausedFramesPerSecond = framesPerSecond;
            //framesPerSecond = 0;
        };

        that.reset = function() {
            playhead = 0;
            keyFrame = animationBounds[that.currentAnimation].start;
        };

        that.play = function () {
            //if(pausedFramesPerSecond !== 0) framesPerSecond = pausedFramesPerSecond;
            paused = false;
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
            if(!paused) playhead += elapsedTimeSeconds;
            keyFrame = animationBounds[that.currentAnimation].start + ~~(playhead * framesPerSecond) % animationBounds[that.currentAnimation].numFrames;

            if(!paused && typeof(onLoop) !== "undefined" && keyFrame === (animationBounds[that.currentAnimation].start + animationBounds[that.currentAnimation].numFrames - 1)) {
                onLoop(that);
            }

            var roundedPosition = new Vector(~~that.position.x, ~~that.position.y);
            var roundedSize = new Vector(~~that.size.x, ~~that.size.y);

            if(!hidden) {

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
