import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import styles from './image-component.scss';
import {AppModel} from "../../model";
import CanvasComponent from "../canvas-component/canvas-component";

export default class ImageComponent extends Component {

    constructor() {
        super();
        this.state = {
            readedFile: null,
            imageName: null
        };

        this.model = AppModel.getInstance();
    }

    onDrop(files) {
        var reader = new FileReader();
        reader.onload = () => {
            this.model.image = reader.result;
            this.setState({
                readedFile: reader.result,
                imageName: files[0].name
            });
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <div id={styles['image-component']} ref={styles['image-component']}>
                <Dropzone className={this.state.readedFile ? styles['drop-zone-completed'] : styles['drop-zone-empty']}
                          onDrop={this.onDrop.bind(this)}
                          accept=".jpeg,.png,.jpg,.bmp">

                    <p className={styles['drop-zone-text']}>{this.state.imageName}</p>
                </Dropzone>
                {this.state.readedFile && (
                    <CanvasComponent parent={this.refs[styles['image-component']]}/>
                )}
            </div>
        );
    }
}
