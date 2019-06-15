import {SceneLayer} from "../controllers/SceneController";
import {Scene} from "../scene";
import {ReelConfig, ReelPosition, ReelStripSymbols, ReelSymbols, ScreenSize} from "../config/settings";
import {ISymbolTextures, Reel, ReelEvents} from "../components/Reel";
import {App} from "../app";
import {RectangularImage} from "../components/RectangularImage";
import {SpinButtonActions} from "./ui/mainmenu";
import {Particles} from "../components/Particles";
import {imagesRes, jsonRes, loadedFiles} from "../config/resources";
import {ReelStrip} from "../components/ReelStrip";

const SPIN_DURATION = 3000;
const BACKGROUND_COLOR = 0xB2B54F;

export class GameScene extends Scene {

    private reel: Reel;
    private background: RectangularImage;
    private particleEmitters: Particles[];

    constructor(layer: SceneLayer) {
        super(layer);
        this.create();
        this.setupMessageHandlers();
    }

    private setupMessageHandlers(): void {
        App.messageHandler.onEvent(SpinButtonActions.Click, this.onSpinButtonClick.bind(this));
        this.reel.onEvent(ReelEvents.SpinComplete, this.onSpinComplete.bind(this));
    }

    private onSpinComplete(): void {
        this.particleEmitters.forEach((emitter: Particles) => {
            emitter.emitOnce();
        });
    }

    protected create(): void {
        this.background = this.createBackgroundImage();
        this.reel = this.createReel();
        this.particleEmitters = this.createParticles();
    }

    private createBackgroundImage(): RectangularImage {
        const {width, height} = ScreenSize;
        const background = new RectangularImage(width, height, BACKGROUND_COLOR);

        this.sceneContainer.addChild(background);

        return background;
    }

    private onSpinButtonClick(): void {
        this.reel.startSpin(SPIN_DURATION);
    }

    private createReel(): Reel {
        const {x, y} = ReelPosition;
        const textures = this.prepareSymbolTextures();
        const reelStrip = new ReelStrip(ReelStripSymbols);
        const reel = new Reel(ReelConfig, reelStrip, textures);

        reel.position.set(x, y);

        this.sceneContainer.addChild(reel);

        return reel;
    }

    private prepareSymbolTextures(): ISymbolTextures {
        const symbolTextures: ISymbolTextures = {};

        ReelSymbols.forEach((reelSymbolName: string) => {
            const texture = loadedFiles[imagesRes[reelSymbolName]].texture;

            symbolTextures[reelSymbolName] = texture;
        });

        return symbolTextures;
    }

    private createParticles(): Particles[] {
        const {x, y} = ReelPosition;
        const {symbolsCount} = ReelConfig;
        const particleEmitters: Particles[] = [];
        const texture = loadedFiles[imagesRes["particle"]].texture;
        const emitterConfig = loadedFiles[jsonRes["ringEmitterConfig"]].data;

        for (let i = 0; i < symbolsCount; i++) {
            const particleEmitter = new Particles(emitterConfig, texture);
            const {x: xCoord, y: yCoord} = this.reel.getSymbolCenterCoords(i);

            particleEmitter.position.set(x + xCoord, y + yCoord);

            this.sceneContainer.addChild(particleEmitter);
            particleEmitters.push(particleEmitter);
        }

        return particleEmitters;
    }

    public update(delta: number): void {
        this.reel.update(delta);

        this.particleEmitters.forEach((emitter: Particles) => {
            emitter.update(delta);
        });
    }
}
