export class Resources
{

    static loadResources(cbProgress: Function, cbComplete: Function): void {

        Object.keys(Resources.imageFilesPath).forEach(key => {
            let path = Resources.imageFilesPath[key];
            PIXI.loader.add(key, path);

        });
  

        PIXI.loader.on('progress', () => {
            cbProgress(PIXI.loader.progress);
        })

        PIXI.loader.load(() => {
            loadedFiles = PIXI.loader.resources;
            cbComplete();
        });


    }

    static imageFilesPath =
    {
        title : './src/assets/image/title.png', 
    };
    static audioFilesPath =
    {
     
    };
}

export let imagesRes = {  title : 'title' }; 
export let audiosRes = { }; 
export let spriteSheetRes = { }; 
export let loadedFiles: PIXI.loaders.Resource | PIXI.loaders.ResourceDictionary;