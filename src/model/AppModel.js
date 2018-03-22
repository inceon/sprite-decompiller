export class AppModel {
    _instance: null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new AppModel();
        }
        return this._instance;
    }

    set image(value) {
        if (btoa(atob(value)) == value) {
            this._image = value;
            console.log('set tes');
        }
    }
}