class Platform {
    constructor(ctx) {
        this.ctx = ctx;

        this.x = Math.random() * 800;
        this.y = -120;
        this.w = 400;
        this.h = 120;
        this.vx = 0;
        this.vy = -4;

        this.img = new Image();
        this.img.src = "/assets/img/PLATFORM.png"
    }

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h);
    }
    
    move() {
        this.y -= this.vy;
    }

    onScreen() {
        return this.y <= this.ctx.canvas.height
    }
}