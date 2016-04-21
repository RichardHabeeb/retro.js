define(['app/Vector', 'app/Rect', 'app/Settings'], function(Vector, Rect, Settings) {
    return function(sprite, animations) { /* running: {start: , duration: }, diggingSide: {start: , duration: }, diggingDown: {start: , duration: } */
        var that = {};
        var velocity = Vector(75, 0);
        var gravity = Vector(0, 9.8);
        var onFloor = true;
        var frictionCoef = 0.99;
        var stoppedSpeed = 5.0;
        var digging = false;
        var hitbox = null;
        var timeoutId = 0;
        var stopDiggingEvent = function() {};
        that.mass = 50;
        that.topSpeed = 150;
        that.jumpSpeed = -300;
        that.appliedForce = Vector();
        sprite.addAnimationBounds("idle", animations.idle.start, animations.idle.duration);
        sprite.addAnimationBounds("running", animations.running.start, animations.running.duration);
        sprite.addAnimationBounds("diggingSide", animations.diggingSide.start, animations.diggingSide.duration);
        sprite.addAnimationBounds("diggingDown", animations.diggingDown.start, animations.diggingDown.duration);
        sprite.currentAnimation = "idle";


        that.draw = function(context, elapsedTimeSeconds) {
            return sprite.draw(context, elapsedTimeSeconds);
        };

        that.jump = function() {
            if(onFloor) {
                onFloor = false;
                velocity.y = that.jumpSpeed;
            }
        };

        that.collide = function(offset) {
            if(offset.y < 0 && velocity.y > 0) {
                onFloor = true;
                velocity.y = 0;
            }
            if(offset.y > 0 && velocity.y < 0) {
                velocity.y = 0;
            }
            sprite.position.x += offset.x;
            sprite.position.y += offset.y;
        };

        that.startFalling = function() {
            if(onFloor) onFloor = false;
        };

        /* this rectangle's coords are relative to the sprite's position */
        that.setHitbox = function(rect) {
            hitbox = Rect(rect.x, rect.y, rect.width, rect.height);
        };

        that.getHitbox = function() {
            if(hitbox === null) {
                return Rect().buildFromVectors(sprite.position, Vector(sprite.getFrameWidth(), sprite.size.y));
            } else {
                return Rect(
                    hitbox.x + sprite.position.x,
                    hitbox.y + sprite.position.y,
                    hitbox.width,
                    hitbox.height);
            }
        };

        that.spriteFacingLeft = function() {
            return sprite.reverse;
        };

        that.getShovelPosition = function() {
            var hit = that.getHitbox();
            return Vector(hit.x + hit.width / 2, hit.y + hit.height / 2);
        };

        that.startDigTimer = function(events) {
            stopDiggingEvent = events.abort;
            timeoutId = setTimeout(function() {
                events.complete();
                stopDiggingEvent = function() {};
            }, Settings.tileDigTime * 1000);
        };

        that.digSide = function() {
            if(onFloor) velocity.x = 0;
            sprite.currentAnimation = "diggingSide";
            digging = true;
        };

        that.digDown = function () {
            if(onFloor) velocity.x = 0;
            sprite.currentAnimation = "diggingDown";
            digging = true;
        };

        that.stopDigging = function() {
            sprite.currentAnimation = "idle";
            stopDiggingEvent();
            stopDiggingEvent = function() {};
            clearTimeout(timeoutId);
            digging = false;
        };

        that.isDigging = function() {
            return digging;
        };


        that.update = function(elapsedTimeSeconds) {
            var acceleration = Vector(that.mass * that.appliedForce.x, that.mass * that.appliedForce.y);
            if(!onFloor) {
                acceleration.y += that.mass * gravity.y;
            }
            var frictionForceMag = gravity.y * frictionCoef;
            if(velocity.x > 0) acceleration.x -= frictionForceMag * that.mass;
            if(velocity.x < 0) acceleration.x += frictionForceMag * that.mass;
            velocity.x = Math.max(-that.topSpeed, Math.min(that.topSpeed, velocity.x + acceleration.x * elapsedTimeSeconds));
            velocity.y = velocity.y + acceleration.y * elapsedTimeSeconds;
            if(Math.abs(velocity.x) < stoppedSpeed) velocity.x = 0;
            if(velocity.x < 0) {
                if(onFloor) {
                    sprite.currentAnimation = "running";
                }
                sprite.reverse = true;
            }
            if(velocity.x > 0) {
                if(onFloor) {
                    sprite.currentAnimation = "running";
                }
                sprite.reverse = false;
            }
            if(velocity.x === 0 && onFloor && !digging) {
                sprite.currentAnimation = "idle";
            }
            sprite.position.x += velocity.x * elapsedTimeSeconds;
            sprite.position.y += velocity.y * elapsedTimeSeconds;

        };

        return that;
    };
});
