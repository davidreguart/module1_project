class Enemy {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = Math.random() * 1400;
        this.y = -120;
        this.w = 75;
        this.h = 75;
        this.vx = 0;
        this.vy = -15;

        this.img = new Image();
        this.img.src = "/assets/img/SPRITE_ENEMY.png";

        this.img.frames = 4;
        this.img.frameIndex = 0;

        this.tick = 0;
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

            if (this.tick > 6) {
                this.tick = 0;
                this.img.frameIndex++;

                if (this.img.frameIndex > this.img.frames - 1) {
                    this.img.frameIndex = 0;
                }
            }
    }

    move() {
        this.x += this.vx;
        this.y -= this.vy;

        if (game.initialplatform.y <= this.ctx.canvas.height){
            if (this.y >= this.floor) {
                this.y = this.floor;
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

    onScreen() {
        return this.y <= this.ctx.canvas.height
    }
}