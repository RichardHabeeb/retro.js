define(['app/Vector', 'app/Rect', 'app/Circle'], function (Vector, Rect, Circle) {
    return function() {
        var that = {};
        var entitiesXSorted = [];
        var entitiesYSorted = [];

        insertionSortX = function(items) {
            for (var i = 0; i < items.length; ++i) {
                var tmp = items[i];
                for (var j = i - 1; j >= 0 && items[j].left > tmp.left; --j) {
                    items[j + 1] = items[j];
                }
                items[j + 1] = tmp;
            }
        };

        insertionSortY = function(items) {
            for (var i = 0; i < items.length; ++i) {
                var tmp = items[i];
                for (var j = i - 1; j >= 0 && items[j].top > tmp.top; --j) {
                    items[j + 1] = items[j];
                }
                items[j + 1] = tmp;
            }
        };

        sortEntities = function() {
            insertionSortX(entitiesXSorted);
            insertionSortY(entitiesYSorted);
        };

        updateBounds = function() {
            var i;
            for(i = 0; i < entitiesXSorted.length; i++) {
                entitiesXSorted[i].hit = entitiesXSorted[i].ent.getBoundingCircle();
                entitiesXSorted[i].left = entitiesXSorted[i].hit.position.x - entitiesXSorted[i].hit.radius;
                entitiesXSorted[i].top = entitiesXSorted[i].hit.position.y - entitiesXSorted[i].hit.radius;
            }

            for(i = 0; i < entitiesYSorted.length; i++) {
                entitiesYSorted[i].hit = entitiesYSorted[i].ent.getBoundingCircle();
                entitiesYSorted[i].left = entitiesYSorted[i].hit.position.x - entitiesYSorted[i].hit.radius;
                entitiesYSorted[i].top = entitiesYSorted[i].hit.position.y - entitiesYSorted[i].hit.radius;
            }
        };

        that.add = function(e) {
            /* this is to simplify some calculations by caching the hixbox */
            var newChildWrapper = {
                ent: e
            };
            entitiesXSorted.push(newChildWrapper);
            entitiesYSorted.push(newChildWrapper);
        };

        that.remove = function(e) {
            var xPos = -1, yPos = -1;
            for (var i = 0; i < entityXpos.length; i++) {
                if (entitiesXSorted[i].ent === e) xPos = i;
                if (entitiesYSorted[i].ent === e) yPos = i;
                if(xPos != -1 && yPos != -1) break;
            }
            if (xPos === -1 || yPos === -1) return false;
            entitiesXSorted.splice(xPos, 1);
            entitiesYSorted.splice(yPos, 1);
            return true;
        };

        that.getEntitiesInRadius = function(c) {
            var collisions = [];
            var i;
            var left = c.position.x - c.radius;
            var right = c.position.x + c.radius;

            for(i = 0; i < entitiesXSorted.length; i++) {
                if(entitiesXSorted[i].left > right) continue;
                //if(entitiesXSorted[i].left > right) break;
                if(entitiesXSorted[i].hit.overlappingWithCircle(c)) collisions.push(entitiesXSorted[i].ent);
            }

            return collisions;
        };

        that.update = function(elapsedTimeSeconds) {
            updateBounds();
            sortEntities();

            for(var i = 0; i < entitiesXSorted.length; i++) {
                entitiesXSorted[i].ent.update(elapsedTimeSeconds);
            }
        };

        that.each = function(operation) {
            for(var i = 0; i < entitiesXSorted.length; i++) {
                operation(entitiesXSorted[i].ent);
            }
        };



        return that;
    };
});
