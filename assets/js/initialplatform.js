class InitialPlatform {
    constructor (ctx) {
        this.ctx = ctx;

        this.w = this.ctx.canvas.width;
        this.h = 275;
        this.x = 0;
        this.y = this.ctx.canvas.height-this.h;
        this.vy = 4;

        this.img = new Image();
        this.img.src = "/assets/img/INITIAL_PLATFORM.png"
    }

    draw() {
        
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.w,
                this.h,
                );
    }

    move() {
        if(game.initialCollision) {
            this.y += this.vy;   
        }
    }
}