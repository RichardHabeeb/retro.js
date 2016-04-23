define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Keyboard', 'app/Map', 'app/Entity', 'app/Rect'], function(Vector, Sprite, Settings, Keyboard, Map, Entity, Rect) {
    return function() {
        var that = {};
        var map = Map();
        var keyCodes = {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            space: 32,
            z: 90,
            x: 88,
        };
        var keys = Keyboard();
        keys.preventDefault(keyCodes.up);
        keys.preventDefault(keyCodes.down);
        keys.preventDefault(keyCodes.left);
        keys.preventDefault(keyCodes.right);
        keys.preventDefault(keyCodes.space);
        keys.preventDefault(keyCodes.z);
        keys.preventDefault(keyCodes.x);
        keys.startListener();

        var jelly2 = Sprite("img/Egg Cell clone.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y), Vector(), 128, 1);
        map.attachSprite(jelly2, 1);
        var jelly = Sprite("img/Cumulus Cell Growth.png", Vector(3 * Settings.tileSize.x, 1 * Settings.tileSize.y), Vector(), 32, 1);
        map.attachSprite(jelly, 2);
        var jelly1 = Sprite("img/Cumulus Cell 15.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y), Vector(), 32, 1);
        map.attachSprite(jelly1, 2);


        // var bunbun = Entity(Sprite("img/BunBunFull.png", Vector(1 * Settings.tileSize.x, 1 * Settings.tileSize.y), Vector(), 32, 12), {
        //     idle: { start: 0, duration: 1 },
        //     running: { start: 0, duration: 2 },
        //     diggingSide: { start: 2, duration: 5 },
        //     diggingDown: { start: 7, duration: 5 },
        // });
        // bunbun.setHitbox(Rect( /* relative to sprite position */
        //     8, //x
        //     1, //y
        //     15, //width
        //     31 //height
        // ));
        //map.attachPlayer(bunbun);
        // keys.addDownEvent(keyCodes.space, bunbun.jump);
        // keys.addDownEvent(keyCodes.z, function() {
        //     map.digAdjacentTile(bunbun);
        //     bunbun.digSide();
        //  });
        // keys.addDownEvent(keyCodes.x, function() {
        //     map.digAdjacentTile(bunbun, true);
        //     bunbun.digDown();
        // });
        // keys.addUpEvent(keyCodes.z, bunbun.stopDigging);
        // keys.addUpEvent(keyCodes.x, bunbun.stopDigging);


        that.update = function(elapsedTimeSeconds) {
            // bunbun.appliedForce.x = 0;
            // if(keys.keyPressed[keyCodes.left] && !bunbun.isDigging()) bunbun.appliedForce.x -= Settings.playerMovementForce;
            // if(keys.keyPressed[keyCodes.right] && !bunbun.isDigging()) bunbun.appliedForce.x += Settings.playerMovementForce;

            // bunbun.update(elapsedTimeSeconds);
            // map.checkCollision(bunbun);
            // map.checkBorderCollision(bunbun);

            //jelly2.position.y += 10 * elapsedTimeSeconds;
            //map.moveAll(Vector(-5 * elapsedTimeSeconds, -5 * elapsedTimeSeconds));
        };

        that.draw = function(elapsedTimeSeconds) {
            map.draw(elapsedTimeSeconds);
        };

        return that;
    };
});
