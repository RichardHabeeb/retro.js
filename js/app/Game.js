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

        var eggCellSprite = Sprite("img/Egg Cell clone.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y), Vector(), 128, 1);
        map.attachSprite(eggCellSprite, 1);

        var middlePoint = Vector(eggCellSprite.position.x + 64, eggCellSprite.position.y + 64);

        var cumulusCell1Sprite = Sprite("img/full_cumulus.png", Vector(middlePoint.x, middlePoint.y - 78), Vector(), 32, 1);
        var cumulusCell1 = Entity(cumulusCell1Sprite, middlePoint, 15);
        cumulusCell1.setBoundingCircle(Circle(Vector(16, 16), 8));
        map.attachSprite(cumulusCell1Sprite, 2);
        entityManager.add(cumulusCell1);

        var commandMoveSprite = Sprite("img/Command Move.png", Vector(-10, -10), Vector(), 8, 24, function() {}, function() {
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

                entitiesClicked = entityManager.getEntitiesInRadius(Circle(Vector(e.x, e.y), 1));
                for(var i = 0; i < entitiesClicked.length; i++) {
                    entitiesClicked[i].selected = true;
                }
            },
            right: function(e) {
                var arm = Vector(e.x - middlePoint.x, e.y - middlePoint.y);
                arm.setLength(64);
                var moveTo = Vector(middlePoint.x + arm.x, middlePoint.y + arm.y);

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
