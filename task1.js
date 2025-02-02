class PixelBoard {
    constructor(width, height, refreshRate) {
        this.width = width;
        this.height = height;
        this.pixels = new Array(height).fill(0).map(() => new Array(width).fill(0));
        this.refreshRate = refreshRate;
        this.intervalId = null;
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

    render() {
        if (this.intervalId) clearInterval(this.intervalId);
        
        this.intervalId = setInterval(() => {
            this.printPixels();
        }, this.refreshRate);
    }
}

const pixelboard = new PixelBoard(14, 28, 500);

const examplePixelsToTurnOn = [[2, 3], [4, 3], [2, 4], [3, 4], [4, 4], [2, 5], [4, 5], [2, 6], [4, 6], [3, 8], [7, 8], [8, 8], [10, 8], [11, 8], [3, 9], [7, 9], [9, 9], [11, 9], [3, 10], [7, 10], [9, 10], [11, 10], [3, 11], [7, 11], [11, 11], [2, 13], [3, 13], [4, 13], [8, 13], [9, 13], [10, 13], [2, 14], [4, 14], [8, 14], [2, 15], [3, 15], [4, 15], [8, 15], [9, 15], [2, 16], [3, 16], [8, 16], [2, 17], [4, 17], [8, 17], [9, 17], [10, 17], [2, 19], [3, 19], [4, 19], [2, 20], [10, 20], [2, 21], [3, 21], [8, 21], [11, 21], [2, 22], [11, 22], [2, 23], [3, 23], [4, 23], [11, 23], [8, 24], [11, 24], [10, 25]]
examplePixelsToTurnOn.forEach(([x, y]) => pixelboard.setPixelOn(x, y));

pixelboard.render();