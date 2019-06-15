import {RectangularImage} from "./RectangularImage";
import {ReelConfig} from "../config/settings";
import {ReelStrip} from "./ReelStrip";

export interface IReelConfig {
    symbolsCount: number;
    symbolWidth: number;
    symbolHeight: number;
    spinSpeed: number;
}

export interface ISymbolTextures {
    [propName: string]: PIXI.Texture
}

export enum ReelEvents {SpinComplete = "spinComplete", SpinStarted = "spinStarted"}

enum ReelState {Stopped, Spinning, Stopping}

export class Reel extends PIXI.Container {
    private symbolHolders: PIXI.Sprite[];
    private readonly reelConfig: IReelConfig;
    private readonly symbolTextures: ISymbolTextures;
    private readonly reelStrip: ReelStrip;
    private offset: number = 0;
    private stripPosition: number = 0;
    private state: ReelState;

    constructor(reelConfig: IReelConfig, reelStrip: ReelStrip, symbolTextures: ISymbolTextures) {
        super();

        this.reelConfig = reelConfig;
        this.symbolTextures = symbolTextures;
        this.reelStrip = reelStrip;
        this.state = ReelState.Stopped;
        this.stripPosition = 0;//reelConfig.symbolsCount;

        this.symbolHolders = this.createSymbolHolders();

        this.setInitialOutcome();

        this.updateSymbolPositions();

        this.createMask();
    }

    createMask(): void {
        const {symbolWidth, symbolHeight, symbolsCount} = this.reelConfig;
        const width = symbolWidth;
        const height = symbolHeight * symbolsCount;
        const mask = new RectangularImage(width, height);

        this.addChild(mask);

        this.mask = mask;
    }

    /**
     * Create nests for symbol images
     * @param reelConfig
     */
    private createSymbolHolders(): PIXI.Sprite[] {
        const symbolHolders = [];
        const {symbolsCount} = this.reelConfig;

        for (let i = 0; i < symbolsCount + 1; i++) {
            const holder = new PIXI.Sprite(PIXI.Texture.EMPTY);

            symbolHolders.push(holder);
            this.addChild(holder);
        }

        return symbolHolders;
    }

    private setInitialOutcome(): void {
        this.symbolHolders.forEach((symbolHolder: PIXI.Sprite, index: number) => {
            const symbolName = this.reelStrip.getSymbol(index);
            const texture = this.symbolTextures[symbolName];

            symbolHolder.texture = texture;
        });
    }

    public onEvent(eventName: ReelEvents, callback: Function): void {
        this.on(eventName, callback);
    }

    /**
     * Update nests' positions
     */
    private updateSymbolPositions() {
        const {symbolHeight} = this.reelConfig;

        this.symbolHolders.forEach((holder: PIXI.Sprite, i: number) => {
            holder.position.y = this.offset + i * symbolHeight - symbolHeight;
        });
    }

    private moveReelStripDown(): void {
        this.stripPosition++;

        const symbolName = this.reelStrip.getSymbol(this.stripPosition);
        const texture = this.symbolTextures[symbolName];

        let curTexture = texture;

        this.symbolHolders.forEach((symbolHolder: PIXI.Sprite, index: number) => {
            const tempTexture = symbolHolder.texture;
            symbolHolder.texture = curTexture;
            curTexture = tempTexture;
        });
    }

    public getSymbolCenterCoords(symbolIndex: number): { x: number, y: number } {
        const {symbolWidth, symbolHeight} = ReelConfig;
        const x = symbolWidth / 2;
        const y = symbolIndex * symbolHeight + symbolHeight / 2;

        return {x, y};
    }

    public startSpin(spinTime: number): void {
        if (this.state === ReelState.Stopped) {
            this.state = ReelState.Spinning;

            this.emit("spinStarted");

            setTimeout(() => {
                this.state = ReelState.Stopping;
            }, spinTime);
        }
    }

    public update(delta: number): void {
        if (this.state === ReelState.Stopping) {
            this.processStopping();
        } else if (this.state === ReelState.Spinning) {
            this.processSpinning();
        }
    }

    private processStopping(): void {
        const {symbolHeight, spinSpeed} = this.reelConfig;

        if (this.offset + spinSpeed >= symbolHeight) {
            this.offset = 0;
            this.state = ReelState.Stopped;
            this.moveReelStripDown();
            this.onReelStopped();
        } else {
            this.offset += spinSpeed;
        }

        this.updateSymbolPositions();
    }

    private onReelStopped(): void {
        this.emit("spinComplete");
    }

    private processSpinning(): void {
        const {symbolHeight, spinSpeed} = this.reelConfig;

        this.offset += spinSpeed;
        const prevOffset = this.offset;
        this.offset = this.offset % symbolHeight;

        if (prevOffset > this.offset) {
            this.moveReelStripDown();
        }

        this.updateSymbolPositions();

    }

}
