define(['app/Vector', 'app/Map'], function(Vector, Map) {
    var previousTimeStamp = null;
    var map = Map();

    /* Animation loop */
    var loop = function (timeStamp) {
        if(!previousTimeStamp) previousTimeStamp = timeStamp;
        var elapsedTimeSeconds = (timeStamp - previousTimeStamp) / 1000.0;

        map.draw(elapsedTimeSeconds);

        previousTimeStamp = timeStamp;
        window.requestAnimationFrame(loop);
        //console.log(~~(1 /elapsedTimeSeconds));
    };
    window.requestAnimationFrame(loop);
});
