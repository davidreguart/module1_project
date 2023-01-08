class Game {
    constructor(ctx) {
        this.ctx = ctx;
        
        this.interval = null;
        this.background = new Background(ctx);
        this.astronaut = new Astronaut(ctx);
        this.enemies = [];
        this.platforms = [];
        this.initialplatform = new InitialPlatform(ctx);
        this.tick = 0;
        this.tickEnemies = 0;
        this.initialCollision = false;
        this.difficulty = 2;

        this.gameAudio = new Audio ('/assets/music/8 bit (Full version).mp3');
        this.gameOverAudio = new Audio ('/assets/sfx/gameover.mp3');
        this.whistle = new Audio ('/assets/sfx/whistle2.mp3');
    }

    start() {
        this.initListeners();
        this.gameAudio.play();
        this.interval = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.checkEnemiesPlatformsCollisions();
            this.checkEnemiesAstronautCollisions();
            this.addPlatform();
            this.astronautFall();
            this.addEnemies();
        }, 1000/60);
    }

    addPlatform() {
        this.tick++;

        if (this.tick > (60 * 1.6)) {
            this.tick = 0;
            this.platforms.push(new Platform(this.ctx));
        }

    }

    addEnemies() {
        this.tickEnemies++;

        if (this.tickEnemies > (60 * this.difficulty)) {
            this.tickEnemies = 0;
            if (this.difficulty > 0.55) {
                this.difficulty -= .150;}
            this.enemies.push(new Enemy(this.ctx));
        }
    }

    initListeners() {
        document.onkeydown = (e) => {
            this.astronaut.onKeyDown(e.keyCode);
            // this.background.onKeyDown(e.keyCode);
        }
        
        document.onkeyup = (e) => {
            this.astronaut.onKeyUp(e.keyCode);
            // this.background.onKeyUp(e.keyCode);
        }
    }

    stop() {
        this.gameAudio.pause();
        clearInterval(this.interval);
    }

    draw() {
        this.background.draw();
        this.platforms.forEach(p => p.draw());
        this.initialplatform.draw();
        this.astronaut.draw();
        this.enemies.forEach(e => e.draw());
    }

    move() {
        this.background.move();
        this.astronaut.move();
        this.platforms.forEach(p => p.move());
        this.initialplatform.move();
        this.enemies.forEach(e => e.move());
    }

    clear() {
        this.platforms = this.platforms.filter(p => p.onScreen());
        this.enemies = this.enemies.filter(e => e.onScreen());
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height,
        )
    }

    checkCollisions() {
        const a = this.astronaut;
        this.platforms.forEach(p => {
            const colX = (a.x + a.w) - 10 >= p.x && a.x + 10 <= (p.x + p.w);
            const colY = p.y >= a.y && p.y <= (a.y + a.h);
    
            if (colX && colY && (a.vy >= 0)) {
                a.y = (p.y - a.h) + 8;
                a.vy = 0;
                this.initialCollision = true;
            }
        });
    }

    checkEnemiesPlatformsCollisions() {
        this.platforms.forEach(p => {
            this.enemies.forEach(e => {
                const colX = e.x <= (p.x + p.w) && (e.x + e.w) >= p.x;
                const colY = (e.y + e.h) >= p.y;
           
                
                if (colX && colY) {
                    e.vx = -.8;
                    e.vy = p.vy;
                }

                if((e.x + e.w) < p.x){
                    e.vx = 0;
                    e.vy = -15;
                }
                
            })
        });

    }

    checkEnemiesAstronautCollisions() {
        const a = this.astronaut;
        this.enemies.forEach(e => {
            const colX = (a.x + a.w) >= e.x && (e.x + e.w) >= a.x;
            const colY = (e.y + e.h) >= a.y && e.y <= (a.y + a.h);

            if (colX && colY) {
                this.whistle.play();
                this.astronaut.vy = -50;
                setTimeout(() => {
                    this.gameOver();
                }, 350);
            }
        })
    }

    
    astronautFall() {
        if (this.astronaut.y - 25 > this.ctx.canvas.height) {
            this.gameOver();
        }
    }


    gameOver() {
            this.stop();
            this.gameOverAudio.play();
            canvas.style.display = 'none';
            const gameover = document.getElementById("game-over");
            gameover.style.display = 'block';
            pnts.style.display = 'none';
    }
}