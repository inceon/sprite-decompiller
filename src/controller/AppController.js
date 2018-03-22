export class AppController {
    _instance: null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new AppModel();
        }
        return this._instance;
    }
}
