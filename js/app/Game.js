define(['app/Vector', 'app/Sprite', 'app/Settings', 'app/Keyboard', 'app/Map', 'app/Entity', 'app/Circle', 'app/EntityManager'], function(Vector, Sprite, Settings, Keyboard, Map, Entity, Circle, EntityManager) {
    return function() {
        var that = {};
        var map = Map();
        var entityManager = EntityManager();
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

        var eggCellSprite = Sprite("img/Egg Cell clone.png", new Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y), new Vector(), 128, 1);
        map.attachSprite(eggCellSprite, 1);

        var middlePoint = new Vector(eggCellSprite.position.x + 64, eggCellSprite.position.y + 64);

        var cumulusCells = [];






        var addCumulusCell = function(theta, onLoop) {
            var arm = new Vector(0, 1);
            arm.setAngle(theta);
            arm.setLength(64);
            var moveTo = new Vector(middlePoint.x + arm.x, middlePoint.y + arm.y);
            var cumulusCellSprite = Sprite("img/full_cumulus.png", new Vector(moveTo.x - 16, moveTo.y - 16), new Vector(), 32, 0.05);
            cumulusCellSprite.setLoopHandler(onLoop);
            var cumulusCell = Entity(cumulusCellSprite, middlePoint, 15);
            cumulusCell.setBoundingCircle(new Circle(new Vector(16, 16), 8));
            cumulusCell.targetRadialAngle = theta;
            map.attachSprite(cumulusCellSprite, 2);
            entityManager.add(cumulusCell);
            cumulusCells.push(cumulusCell);
            return cumulusCell;
        };

        var cumulusCellSpawn = function(old) {
            old.pause();
            //old.reset();
        };


        for(var i = 0; i < 3; i++) {
            var cell = addCumulusCell(Math.random() * 2 * Math.PI, cumulusCellSpawn);
        }



        var commandMoveSprite = Sprite("img/Command Move.png", new Vector(-10, -10), new Vector(), 8, 24, function() {}, function() {
            commandMoveSprite.position.x = -10;
            commandMoveSprite.position.y = -10;
            commandMoveSprite.pause();
        });
        map.attachSprite(commandMoveSprite, 3);
        commandMoveSprite.pause();

        map.click({
            left:function(e) {
                entityManager.each(function(e) {
                    e.selected = false;
                });

                entitiesClicked = entityManager.getEntitiesInRadius(new Circle(new Vector(e.x, e.y), 1));
                for(var i = 0; i < entitiesClicked.length; i++) {
                    entitiesClicked[i].selected = true;
                }
            },
            right: function(e) {
                var arm = new Vector(e.x - middlePoint.x, e.y - middlePoint.y);
                arm.setLength(64);
                var moveTo = new Vector(middlePoint.x + arm.x, middlePoint.y + arm.y);

                commandMoveSprite.position.x = moveTo.x - commandMoveSprite.getFrameWidth() / 2;
                commandMoveSprite.position.y = moveTo.y - commandMoveSprite.size.y;
                commandMoveSprite.play();
                commandMoveSprite.reset();

                entityManager.each(function(e) {
                    if(e.selected) {
                        e.targetRadialAngle = arm.getAngle();
                    }
                });
            }
        });


        that.update = function(elapsedTimeSeconds) {
            entityManager.update(elapsedTimeSeconds);
        };

        that.draw = function(elapsedTimeSeconds) {
            map.draw(elapsedTimeSeconds);
        };

        return that;
    };
});
