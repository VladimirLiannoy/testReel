import {RectangularImage} from "./RectangularImage";

export interface IButtonConfig {
    width: number;
    height: number;
    bgColor: number;
    title: string;
}

const DEFAULT_TITLE_STYLE = {
    fontSize: 20,
    fill: 0x000000,
    fontFamily: "Verdana, Arial"
};

export class Button extends PIXI.Container {
    private title: PIXI.Text;
    private background: RectangularImage;

    constructor(config: IButtonConfig, clickCallback: Function) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.on("pointerup", clickCallback);

        this.background = this.createBackground(config);
        this.title = this.createTitle(config.title);

        console.log(this);
    }

    private createBackground(config: IButtonConfig): RectangularImage {
        const {width, height, bgColor} = config;
        const background = new RectangularImage(width, height, bgColor);

        background.position.set(-width / 2, -height / 2);

        this.addChild(background);

        return background;
    }

    private createTitle(titleText: string): PIXI.Text {
        const title = new PIXI.Text(titleText, DEFAULT_TITLE_STYLE);

        title.anchor.set(0.5);

        this.addChild(title);

        return title;
    }

    public enable(): void {
        this.interactive = true;
    }

    public disable(): void {
        this.interactive = false;
    }
}
