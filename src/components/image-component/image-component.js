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
            imageName: null,
            colorChanger: false,
            imageComponentStyle: {}
        };

        this.canvasComponent = React.createRef();
        this.model = AppModel.getInstance();
    }

    onDrop(files) {
        var reader = new FileReader();
        reader.onload = () => {
            this.model.image = reader.result;
            this.setState({
                readedFile: reader.result,
                imageName: files[0].name,
                colorChanger: true
            });
        };
        reader.readAsDataURL(files[0]);
    }

    changeBackground() {
        let bg = {};
        if (Object.keys(this.state.imageComponentStyle).length === 0) {
            bg = {
                background: 'url(Graph-paper.svg)',
                backgroundSize: '10%'
            };
        }
        this.setState({imageComponentStyle: bg});
    }

    resetScale() {
        this.canvasComponent.current.reset();
    }

    render() {
        return (
            <div id={styles['image-component']} ref={styles['image-component']} style={this.state.imageComponentStyle}>
                {this.state.colorChanger &&
                <div className={styles['changers']}>
                    <div className={styles['bg-changer']} onClick={this.changeBackground.bind(this)}/>
                    <div className={styles['zoom-reset']} onClick={this.resetScale.bind(this)}/>
                </div>}
                <Dropzone className={this.state.readedFile ? styles['drop-zone-completed'] : styles['drop-zone-empty']}
                          onDrop={this.onDrop.bind(this)}
                          accept=".jpeg,.png,.jpg,.bmp">

                    <p className={styles['drop-zone-text']}>{this.state.imageName}</p>
                </Dropzone>
                {this.state.readedFile && (
                    <CanvasComponent updateSpriteList={this.props.updateSpriteList}
                                     parent={this.refs[styles['image-component']]}
                                     ref={this.canvasComponent}/>
                )}
            </div>
        );
    }
}
