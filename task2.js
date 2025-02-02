class PixelBoard {
    constructor(width, height, refreshRate) {
        this.width = width;
        this.height = height;
        this.pixels = new Array(height).fill(0).map(() => new Array(width).fill(0));
        this.refreshRate = refreshRate;
        this.intervalId = null;

        this.animations = [];
    }

    isValidCoordinate(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    setPixelOn(x, y) {
        if (this.isValidCoordinate(x, y)) this.pixels[y][x] = 1;
    }

    setPixelOff(x, y) {
        if (this.isValidCoordinate(x, y)) this.pixels[y][x] = 0;
    }

    getPixels() {
        return this.pixels;
    }

    printPixels() {
        console.clear();
        const grid = this.pixels
            .map(row => row.map(pixel => pixel ? '█' : '□').join(''))
            .join('\n');
        console.log("--------------\n" + grid + "\n--------------");
    }

    addAnimation(animation) {
        this.animations.push(animation);
        animation.board = this; 
    }

    removeAnimation(animation) {
        this.animations.delete(animation);
    }

    render() {
        if (this.intervalId) clearInterval(this.intervalId);
        
        this.intervalId = setInterval(() => {
            this.animations.forEach(anim => anim.update());
            
            this.printPixels();
        }, this.refreshRate);
    }
}

class CircleAnimation {
    constructor(centerX, centerY, radius, angleStep = 10, clamp = true) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.angle = 0;
        this.prevX = null;
        this.prevY = null;
        this.angleStep = angleStep;
        this.clamp = clamp;
    }

    update() {
        const radians = this.angle * (Math.PI / 180);
        const x = Math.round(this.centerX + this.radius * Math.cos(radians));
        const y = Math.round(this.centerY + this.radius * Math.sin(radians));
        
        if (this.prevX !== null && this.prevY !== null) {
            this.board.setPixelOff(this.prevX, this.prevY);
        }
        
        let newX,newY; 
        if (this.clamp) {
            newX = Math.max(0, Math.min(x, this.board.width - 1));
            newY = Math.max(0, Math.min(y, this.board.height - 1));
        }
        else {
            newX = x;
            newY = y;
        }
        
        this.board.setPixelOn(newX, newY);
        
        this.prevX = newX;
        this.prevY = newY;
        this.angle = (this.angle + this.angleStep) % 360;
    }
}

const board = new PixelBoard(14, 28, 100);

const animation = new CircleAnimation(7, 14, 5);
const animation2 = new CircleAnimation(7, 14, 4, -10);
const animation3 = new CircleAnimation(7, 5, 8);
const animation4 = new CircleAnimation(7, 20, 8, 10, false);

board.addAnimation(animation);
board.addAnimation(animation2);
board.addAnimation(animation3);
board.addAnimation(animation4);

board.render();