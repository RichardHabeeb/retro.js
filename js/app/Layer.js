define(function () {
    return function (parent, sizeVector, scale) {
        var that = {};
        var domElement = document.createElement('canvas');

        that.context = domElement.getContext('2d');

        domElement.setAttribute('width', sizeVector.x);
        domElement.setAttribute('height', sizeVector.y);
        domElement.setAttribute('style', 'width: ' + sizeVector.x * scale + 'px; height: ' + sizeVector.y * scale + 'px;');
        parent.appendChild(domElement);

        return that;
    };
});
