
import { SceneLayer } from "../../controllers/SceneController";
import { loadedFiles, imagesRes } from "../../config/resources";
import { Scene } from "../../scene";
import { ScreenSize } from "../../config/settings";

export class MainMenuScene extends Scene {

    private title: PIXI.Sprite;

    constructor(layer: SceneLayer) {
        super(layer);
        this.create();
    }

    protected create(): void {

        this.title = new PIXI.Sprite(loadedFiles[imagesRes.title].texture);
        this.title.anchor.set(0.5);
        this.title.x = ScreenSize.width / 2;
        this.title.y = ScreenSize.height / 2;

        this.sceneContainer.addChild(this.title);
    }

    public update(delta: number): void {
    }
}