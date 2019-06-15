import {SceneLayer} from "../../controllers/SceneController";
import {Scene} from "../../scene";
import {SpinButtonConfig, SpinButtonPosition} from "../../config/settings";
import {Button} from "../../components/Button";
import {App} from "../../app";
import {Particles} from "../../components/Particles";
import {imagesRes, jsonRes, loadedFiles} from "../../config/resources";

export enum SpinButtonActions {Click = "spinButtonClick", Hover = "spinButtonHover"}

export class MainMenuScene extends Scene {
    private spinButton: Button;
    private particles: Particles;

    constructor(layer: SceneLayer) {
        super(layer);
        this.create();
    }

    protected create(): void {
        this.particles = this.createParticles();
        this.spinButton = this.createSpinButton(this.onSpinButtonClick.bind(this));
    }

    private createParticles(): Particles {
        const {x, y} = SpinButtonPosition;
        const texture = loadedFiles[imagesRes["particle"]].texture;
        const emitterConfig = loadedFiles[jsonRes["ringEmitterConfig"]].data;
        const particles = new Particles(emitterConfig, texture);

        particles.position.set(x, y);

        this.sceneContainer.addChild(particles);

        return particles;
    }

    private onSpinButtonClick(): void {
        App.messageHandler.fireEvent(SpinButtonActions.Click);

        //Emit particles behind spin button
        this.particles.emitOnce(0.05);
    }

    private createSpinButton(clickCallback: Function): Button {
        const {x, y} = SpinButtonPosition;
        const spinButton = new Button(SpinButtonConfig, clickCallback);

        spinButton.position.set(x, y);

        this.sceneContainer.addChild(spinButton);

        return spinButton;
    }

    public update(delta: number): void {
        this.particles.update(delta);
    }
}
