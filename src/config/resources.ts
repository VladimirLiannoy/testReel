export class Resources {

    static loadResources(cbProgress: Function, cbComplete: Function): void {

        Object.keys(Resources.imageFilesPath).forEach(key => {
            let path = Resources.imageFilesPath[key];
            PIXI.loader.add(key, path);
        });

        Object.keys(Resources.jsonFilesPath).forEach(key => {
            let path = Resources.jsonFilesPath[key];
            PIXI.loader.add(key, path);
        });


        PIXI.loader.on('progress', () => {
            cbProgress(PIXI.loader.progress);
        });

        PIXI.loader.load(() => {
            loadedFiles = PIXI.loader.resources;
            cbComplete();
        });


    }

    static imageFilesPath =
        {
            sym1: './src/assets/image/sym1.png',
            sym2: './src/assets/image/sym2.png',
            sym3: './src/assets/image/sym3.png',
            sym4: './src/assets/image/sym4.png',
            particle: './src/assets/image/particle.png'
        };
    static jsonFilesPath =
        {
            ringEmitterConfig: './src/assets/emitterConfigs/emitter.json'
        };
}

export let imagesRes = {
    particle: 'particle',
    sym1: "sym1",
    sym2: "sym2",
    sym3: "sym3",
    sym4: "sym4"
};

export let jsonRes = {
    ringEmitterConfig: 'ringEmitterConfig'
};

export let audiosRes = {};
export let spriteSheetRes = {};
export let loadedFiles: PIXI.loaders.Resource | PIXI.loaders.ResourceDictionary;
