define(['jquery'], function ($) {
    return function (parent, sizeVector, scale) {
        var that = {};
        var domElement = document.createElement('canvas');

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
            'width': sizeVector.x,
            'height': sizeVector.y,
        });
        /* setting scaled size */
        $(domElement).css({
            'width': sizeVector.x * scale + 'px',
            'height': sizeVector.y * scale + 'px',
            'position': 'absolute',
        });
        parent.appendChild(domElement);

        return that;
    };
});
