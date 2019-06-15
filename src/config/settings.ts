import {LoadScene} from "../scenes/loader.scene";
import {MainMenuScene} from "../scenes/ui/mainmenu";
import {GameScene} from "../scenes/gameScene";
import {IButtonConfig} from "../components/Button";
import {IReelConfig} from "../components/Reel";

export class Settings {
    static BgColor: number = 0x0B0033;
    static RoundPixels: boolean = false;
    static Scenes = {"LoadScene": LoadScene, "MainMenuScene": MainMenuScene, "GameScene": GameScene};
}

export const ScreenSize = {width: 800, height: 600};

export const SpinButtonConfig: IButtonConfig = {
    width: 100,
    height: 50,
    bgColor: 0xFF834F,
    title: "SPIN"
};

export const ReelStripSymbols = ["sym1", "sym2", "sym3", "sym4", "sym4", "sym3", "sym2", "sym1"];
export const ReelSymbols = ["sym1", "sym2", "sym3", "sym4", "sym4", "sym3", "sym2", "sym1"];

export const ReelConfig: IReelConfig = {
    symbolsCount: 3,
    symbolWidth: 100,
    symbolHeight: 110,
    spinSpeed: 15
};

export const ReelPosition = {
    x: 220,
    y: 120
};

export const SpinButtonPosition = {
    x: 460,
    y: 280
};
