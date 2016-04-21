define(['app/AssetLoader', 'app/Game'], function(AssetLoader, Game) {
    var previousTimeStamp = null;
    var game = null;

    /* Animation loop */
    var loop = function (timeStamp) {
        if(!previousTimeStamp) previousTimeStamp = timeStamp;
        var elapsedTimeSeconds = (timeStamp - previousTimeStamp) / 1000.0;

        game.update(elapsedTimeSeconds);
        game.draw(elapsedTimeSeconds);

        previousTimeStamp = timeStamp;
        window.requestAnimationFrame(loop);
    };

    AssetLoader.onLoad = function() {
        window.requestAnimationFrame(loop);
    };
    game = Game();

});
