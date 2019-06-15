import * as PIXI from "pixi.js";
import {Emitter, EmitterConfig} from "pixi-particles";

export class Particles extends PIXI.Container {
    private emitter: Emitter;

    constructor(config: EmitterConfig, particleTexture: PIXI.Texture) {
        super();

        this.emitter = new Emitter(
            this,
            particleTexture,
            config
        );

        this.emitter.emit = false;
    }

    public emitOnce(duration: number = 0.1): void {
        this.emitter.emitterLifetime = duration;
        this.emitter.playOnce();
    }

    public update(delta: number): void {
        this.emitter.update(delta * 0.01);
    }
}
