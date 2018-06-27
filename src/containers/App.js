import React, {Component} from 'react';
import styles from './App.scss';
import ImageComponent from '../components/image-component/image-component';
import SpritesListComponent from '../components/sprites-list-component/sprites-list-component';
import {AppModel} from "../model/AppModel";

class App extends Component {
    rerenderImage() {
        this.imageComponent.forceUpdate();
    }

    pointInSquare(point, square) {
        return (point.x >= square.x && point.x <= (square.x + square.w) &&
            point.y >= square.y && point.y <= (square.y + square.h));
    }

    updateSpriteList(coord) {
        this._model = AppModel.getInstance();
        for (let item of this._model.spritesList) {
            if (this.pointInSquare(coord, item['frame'])) {
                item.showInfo = !item.showInfo;
            }
        }

        this.spriteListComponent.forceUpdate();
        this.rerenderImage();
    }

    render() {
        return (
            <div className={styles.App}>
                <ImageComponent updateSpriteList={this.updateSpriteList.bind(this)}
                                ref={imageComponent => this.imageComponent = imageComponent}/>
                <SpritesListComponent updateImage={this.rerenderImage.bind(this)}
                                      ref={spriteListComponent => this.spriteListComponent = spriteListComponent}/>
            </div>
        );
    }
}

export default App;
