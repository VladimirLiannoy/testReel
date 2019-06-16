import {Settings, ScreenSize} from "./config/settings";
import * as PIXI from 'pixi.js';
import {SceneController, SceneLayer} from "./controllers/SceneController";
import {Messaging} from "./messaging";

export class App extends PIXI.Application {

    private static instance: App;
    private static _sceneController: SceneController;
    private static _messageHandler: Messaging;

    constructor(width: number, height: number, resolution: number) {
        var canvas = <HTMLCanvasElement>document.getElementById('canvas');
        super({
            view: canvas,
            antialias: false,
            backgroundColor: Settings.BgColor,
            roundPixels: Settings.RoundPixels,
            width: ScreenSize.width,
            height: ScreenSize.height
        });

        document.body.appendChild(this.view);

    }

    //Create singlenton instance
    public static get application(): App {
        if (!this.instance) {
            this.instance = new App(window.innerWidth, window.innerHeight, window.devicePixelRatio);
            this.initMessageHandler();
            this.startControllers();
            this.instance.addListeners();
            this.instance.init();
        }
        return this.instance;
    }

    private init(): void {
        App.sceneController.loadScene(Settings.Scenes.LoadScene, SceneLayer.UI);
    }

    private static startControllers(): void {
        this._sceneController = new SceneController();
    }

    private static initMessageHandler(): void {
        this._messageHandler = new Messaging();
    }

    static get sceneController(): SceneController {
        return this._sceneController;
    }

    static get messageHandler(): Messaging {
        return this._messageHandler;
    }

    private addListeners(): void {
        window.addEventListener('resize', this.resize.bind(this));
        //iOS Chrome fix
        window.addEventListener('orientationchange', ()=>{
            setTimeout(this.resize.bind(this), 100);
        });
        this.resize();
    }

    resize() {
        const {width, height} = ScreenSize;
        const {innerWidth, innerHeight} = window;
        const gameScale = Math.min(
            innerWidth / width,
            innerHeight / height
        );

        const scaledHeight = height * gameScale;
        const scaledWidth = width * gameScale;

        const newLeft = (innerWidth - scaledWidth) / 2  / gameScale;
        const newTop = (innerHeight - scaledHeight) / 2 / gameScale;

        App.sceneController.updateSizeConfig(gameScale, newLeft, newTop, innerWidth, innerHeight);

    }
}
