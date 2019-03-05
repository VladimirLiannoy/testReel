import { LoadScene } from "../scenes/loader.scene";
import { MainMenuScene } from "../scenes/ui/mainmenu";

export class Settings
{
    static BgColor : number = 0x232323;
    static RoundPixels : boolean = false;
    static Scenes = {"LoadScene" : LoadScene, "MainMenuScene" : MainMenuScene};
}

export const ScreenSize =  { width: 1280, height: 720 };