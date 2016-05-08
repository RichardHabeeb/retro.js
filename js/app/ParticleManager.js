define(['app/Vector', 'app/Circle'], function (Vector, Circle) {
    function ParticleManager(opts) {
        this.maxParticles = 50;
        this.particles = [];
        this.secondsBetweenInsertions = 2;
        this.elapsedTimeSinceInsertion = 0;
        this.particleTtl = 40;
        if(typeof(opts) !== "undefined") {
            if(opts.movementHandler) this.movementHandler = opts.movementHandler;
            if(opts.spriteCreator) this.spriteCreator = opts.spriteCreator;
            if(opts.spriteRemover) this.spriteRemover = opts.spriteRemover;
        }
    }


    ParticleManager.prototype.update = function (elapsedTimeSeconds) {
        var i = this.particles.length;
        while(i--) {
            var p = this.particles[i];

            p.timeLived += elapsedTimeSeconds;
            if(p.timeLived >= this.particleTtl || !this.movementHandler(p.sprite, p.velocity, elapsedTimeSeconds)) {
                this.particles.splice(i, 1);
                this.spriteRemover(p.sprite);
                continue;
            }


        }

        this.elapsedTimeSinceInsertion += elapsedTimeSeconds;
        if(this.elapsedTimeSinceInsertion >= this.secondsBetweenInsertions) {
            this.elapsedTimeSinceInsertion = 0;
            this.add();
        }
    };

    ParticleManager.prototype.add = function () {
        var p = {
            timeLived: 0,
            sprite: this.spriteCreator(),
            velocity: new Vector()
        };
        this.particles.push(p);
    };

    return ParticleManager;
});
