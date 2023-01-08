class Background {
    constructor(ctx) {
        this.ctx = ctx;

        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;
        this.x = 0;
        this.y = 380;
        this.vx = 0;
        this.vy = .5;

        this.img = new Image();
        this.img.src = "/assets/img/JTA_BACKGROUND.png"
    }

    draw(){
        this.ctx.drawImage(this.img, this.x, this.y - this.img.height + 927);
        this.ctx.drawImage(this.img, this.x, this.y - this.img.height + 927);
    }

    move() {
        this.y += this.vy;

        if (this.y >= this.img.height - 927) {
            this.y = 0;
        }
    }
}