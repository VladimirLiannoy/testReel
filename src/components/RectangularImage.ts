export class RectangularImage extends PIXI.Graphics {
    constructor(width: number, height: number, color: number = 0x000000) {
        super();
        this.drawImage(width, height, color);
    }

    private drawImage(width: number, height: number, color: number): void {
        this.beginFill(color);
        this.drawRect(0, 0, width, height);
    }
}
