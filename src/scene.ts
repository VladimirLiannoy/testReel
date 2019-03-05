
import * as PIXI from 'pixi.js';
import { SceneLayer } from "./controllers/SceneController";

export abstract class Scene {

    public sceneContainer: PIXI.Container;
    public readonly layer : SceneLayer;

    constructor(layer : SceneLayer) {
        this.sceneContainer = new PIXI.Container();
        this.layer = layer;
    }

    public show() {
        this.sceneContainer.visible = true;
    }

    public hide() {
        this.sceneContainer.visible = false;
    }

    public destroy() {
        this.sceneContainer.removeAllListeners();
        this.sceneContainer.removeChildren();
    }

    protected abstract create(): void;
    public abstract update(delta: number): void;

}