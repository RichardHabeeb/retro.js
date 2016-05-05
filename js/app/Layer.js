define(['jquery', 'app/Vector'], function ($, Vector) {
    return function (parent, visibleSizeVector, scale, sizeVector) {
        var that = {};
        var preRenderedCanvas = document.createElement('canvas');
        var preRenderedContext = preRenderedCanvas.getContext('2d');
        var domElement = document.createElement('canvas');
        var sprites = [];
        var previousPosition = null;

        that.position = Vector();
        that.context = domElement.getContext('2d');

        /* Setup scaled canvas styling and let the browser choose the acceptable method. */
        domElement.setAttribute('style',
            'image-rendering: optimizeSpeed;' +
            'image-rendering: -moz-crisp-edges;' +
            'image-rendering: -webkit-optimize-contrast;' +
            'image-rendering: optimize-contrast;' +
            'image-rendering: pixelated;' +
            '-ms-interpolation-mode: nearest-neighbor;'
            );

        /* setting base size */
        $(domElement).attr({
            'width': visibleSizeVector.x,
            'height': visibleSizeVector.y,
        });
        /* setting scaled size */
        $(domElement).css({
            'width': visibleSizeVector.x * scale + 'px',
            'height': visibleSizeVector.y * scale + 'px',
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'margin-left': -visibleSizeVector.x * scale/2 + 'px',
            'margin-top': -visibleSizeVector.y * scale/2 + 'px',
        });
        $(preRenderedCanvas).attr({
            'width': sizeVector.x,
            'height': sizeVector.y,
        });

        parent.appendChild(domElement);

        that.attachDrawable = function (sprite) {
            sprites.push(sprite);
        };

        that.removeDrawable = function(sprite) {
            var index = sprites.indexOf(sprite);
            if(index > -1) sprites.splice(index, 1);
        };

        that.draw = function (elapsedTimeSeconds) {
            var redraw = false;
            for(var i = 0; i < sprites.length; i++) {
                redraw = redraw || sprites[i].draw(preRenderedContext, elapsedTimeSeconds);
            }
            var roundedPosition = Vector(~~that.position.x, ~~that.position.y);

            if(redraw || previousPosition === null || previousPosition.x != roundedPosition.x || previousPosition.y != roundedPosition.y) {
                previousPosition = roundedPosition;
                that.context.save();
                that.context.clearRect(0, 0, visibleSizeVector.x, visibleSizeVector.y);
                that.context.drawImage(preRenderedCanvas, roundedPosition.x, roundedPosition.y);
                that.context.restore();
            }
        };

        that.fadeOut = function(duration) {
            $(domElement).fadeOut(duration, function(){
                parent.removeChild(domElement);
            });
        };

        that.setZ = function(z) {
            $(domElement).css({
                'z-index': z,
            });
        };

        that.setClickHandler = function(handler) {
            $(domElement).click(function(e) {
                handler({
                    x: ~~((e.pageX - $(domElement).offset().left)/4),
                    y: ~~((e.pageY - $(domElement).offset().top)/4)
                });
            });
        };

        return that;
    };
});
