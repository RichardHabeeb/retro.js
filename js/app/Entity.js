define(['app/Vector', 'app/Circle', 'app/Settings'], function(Vector, Circle, Settings) {
    return function(sprite, radialCenterPosition, rotationBounds) {
        var that = {};
        var bounds = null;
        var velocity = Vector();
        var angularVelocity = 0;
        that.mass = 1;
        that.topSpeed = 150;
        that.topAngularSpeed = 1.0;
        that.appliedForce = Vector(); //todo protect
        if(typeof(rotationBounds) !== "undefined" && rotationBounds > 0) {
            for(var i = 0; i < 360/rotationBounds; i++) {
                sprite.addAnimationBounds(i*rotationBounds, i*4, 4, 1);
            }
            sprite.currentAnimation = 0;
        }

        if(typeof(radialCenterPosition) !== "undefined")
        {
        }

        that.draw = function(context, elapsedTimeSeconds) {
            return sprite.draw(context, elapsedTimeSeconds);
        };

        /* this rectangle's coords are relative to the sprite's position */
        that.setBoundingCircle = function(c) {
            bounds = c;
        };

        that.getBoundingCircle = function(c) {
            if(bounds === null) return Circle(sprite.position, 16); //todo magic number
            return Circle(Vector(sprite.position.x + bounds.position.x, sprite.position.y + bounds.position.y), bounds.radius);
        };

        that.spriteFacingLeft = function() {
            return sprite.reverse;
        };


        that.update = function(elapsedTimeSeconds) {
            if(typeof(radialCenterPosition) !== "undefined") {
                var currentBounds = that.getBoundingCircle();
                var r = Vector(currentBounds.position.x - radialCenterPosition.x, currentBounds.position.y - radialCenterPosition.y);
                var momentOfIntertia = that.mass * currentBounds.radius * currentBounds.radius / 2;
                var angularAcceleration = (r.x * that.appliedForce.y - r.y * that.appliedForce.x) / momentOfIntertia;
                angularVelocity += angularAcceleration * elapsedTimeSeconds;
                angularVelocity = (angularVelocity > 0 ? 1 : -1) * Math.min(Math.abs(angularVelocity), that.topAngularSpeed);
                r.setAngle(r.getAngle() + angularVelocity * elapsedTimeSeconds);
                sprite.position = Vector(r.x + radialCenterPosition.x - bounds.position.x, r.y + radialCenterPosition.y - bounds.position.y);
                if(typeof(rotationBounds) !== "undefined" && rotationBounds > 0) {
                    //todo cleanup
                    sprite.currentAnimation = (Math.round((180 - 180 * r.getAngle() / Math.PI) / rotationBounds) * rotationBounds + 90) % 360;
                }
            }
            else {
                var acceleration = Vector(that.mass * that.appliedForce.x, that.mass * that.appliedForce.y);
                velocity.x = Math.max(-that.topSpeed, Math.min(that.topSpeed, velocity.x + acceleration.x * elapsedTimeSeconds));
                velocity.y = velocity.y + acceleration.y * elapsedTimeSeconds;
            }

        };

        return that;
    };
});
