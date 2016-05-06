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
        var eggCell = Entity(eggCellSprite);
        eggCell.setBoundingCircle(Circle(Vector(64, 64), 64));
        map.attachSprite(eggCellSprite, 1);
        entityManager.add(eggCell);

        var middlePoint = Vector(eggCell.getBoundingCircle().position.x, eggCell.getBoundingCircle().position.y);

        var cumulusCell1Sprite = Sprite("img/cumulus.png", Vector(middlePoint.x, middlePoint.y - 78), Vector(), 32, 1);
        var cumulusCell1 = Entity(cumulusCell1Sprite, middlePoint, 15);
        cumulusCell1.setBoundingCircle(Circle(Vector(16, 16), 8));
        map.attachSprite(cumulusCell1Sprite, 2);
        entityManager.add(cumulusCell1);
        cumulusCell1.appliedForce = Vector(-0.1,0);

        // var cumulusCell2Sprite = Sprite("img/Cumulus Cell 15.png", Vector(2 * Settings.tileSize.x, 2 * Settings.tileSize.y), Vector(), 32, 1);
        // var cumulusCell2 = Entity(cumulusCell2Sprite);
        // cumulusCell1.setBoundingCircle(Circle(Vector(16, 16), 8));
        // map.attachSprite(cumulusCell2Sprite, 2);
        // entityManager.add(cumulusCell2);

        map.click(function(e) {
            //alert((e.x) + ' , ' + (e.y));
            console.log(entityManager.getEntitiesInRadius(Circle(Vector(e.x, e.y), 1)));
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
