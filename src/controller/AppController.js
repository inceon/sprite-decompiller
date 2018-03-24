import {AppModel} from "../model";

export class AppController {
    _instance: null;
    _model: null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new AppController();
        }
        return this._instance;
    }

    drawRectOnCanvas(rectFrame) {
        this._model = AppModel.getInstance();
        let ctx = this._model.canvas;
        let scale = this._model.scale;
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(
            rectFrame.x * scale, rectFrame.y * scale,
            rectFrame.w * scale, rectFrame.h * scale
        );
        ctx.stroke();

        console.log(rectFrame);
    }
}
