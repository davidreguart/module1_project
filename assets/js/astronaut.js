class Astronaut {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = 100;
        this.floor = 800;
        this.y = 50
        this.w = 60;
        this.h = 120;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = .8;

        this.img = new Image();
        this.img.src = "/assets/img/SPRITE_IDLEING.png"

        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.tick = 0;

        this.jumpAudio = new Audio ("/assets/sfx/jump.wav");
    }

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        this.ctx.drawImage(
                this.img,
                this.img.frameIndex * this.img.width / this.img.frames,
                0,
                this.img.width / this.img.frames,
                this.img.height,
                this.x,
                this.y,
                this.w,
                this.h
            );

        this.animate();
    }

    animate() {
        this.tick++;

            if (this.tick > 10) {
                this.tick = 0;
                this.img.frameIndex++;

                if (this.img.frameIndex > this.img.frames - 1) {
                    this.img.frameIndex = 0;
                }
            }
    }

    move() {
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        if (game.initialplatform.y <= this.ctx.canvas.height){
            if (this.y >= this.ctx.canvas.height - 130) {
                this.y = this.ctx.canvas.height - 130;
                this.vy = 0;
            }
        }

        if (this.x >= this.ctx.canvas.width + this.w) {
            this.x = 0 - this.w;
        }

        if (this.x + this.w < 0) {
            this.x = this.ctx.canvas.width + this.w;
        }
    }

    jump() {
            this.vy -= 25;
            this.jumpAudio.play();;
    }

    onKeyDown(key) {
        switch (key) {
            case RIGHT:
                this.vx = 5;
                break;
            case LEFT:
                this.vx = -5;
                 break;  
            case UP:
                this.jump();
                break;                      
        }
    }

    onKeyUp(key){
        switch (key) {
            case RIGHT:
            case LEFT:
                this.vx = 0;
                break;
        }
    }
}