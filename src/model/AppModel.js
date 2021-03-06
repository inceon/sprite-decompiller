export class AppModel {
    _instance: null;
    _image: null;
    canvas: null;
    spritesList: null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new AppModel();
        }
        return this._instance;
    }

    set image(value) {
        // Check if its image
        if (atob(value.split(';')[1].split(',')[1])) {
            this._image = new Image();
            this._image.src = value;
        } else {
            console.error(`Error, it's not an image`);
        }
    }

    get image() {
        return this._image;
    }
}