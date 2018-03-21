import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import styles from './image-component.scss';

export default class ImageComponent extends Component {
    state = {
        files: []
    };

    onDrop(files) {
        var reader = new FileReader();
        reader.onload = () => {
            this.setState({
                readedFile: reader.result
            });
        };
        reader.readAsDataURL(files[0]);
    }

    componentDidUpdate() {
        if (this.refs.canvas) {
            const canvas = this.refs.canvas;
            canvas.width = this.refs[styles['image-component']].offsetWidth;
            canvas.height = this.refs[styles['image-component']].offsetHeight;
            const ctx = canvas.getContext('2d');

            let image = new Image();
            image.onload = function () {

                let widthScale = canvas.width / image.width;
                let heightScale = canvas.height / image.height;

                if (widthScale < heightScale) {
                    ctx.drawImage(image, 0, 0, canvas.width, image.height * widthScale);
                } else {
                    ctx.drawImage(image, 0, 0, image.width * heightScale, canvas.height);
                }

            };
            image.src = this.state.readedFile;
        }
    }

    render() {
        return (
            <div id={styles['image-component']} ref={styles['image-component']}>
                {!this.state.readedFile && (
                    <Dropzone className={styles['drop-zone']}
                              onDrop={this.onDrop.bind(this)}
                              accept=".jpeg,.png,.jpg,.bmp">

                        <p className={styles['drop-zone-text']}>Drop or click for select image file here.</p>
                    </Dropzone>
                )}
                {this.state.readedFile && (
                    <canvas ref='canvas' className={styles.canvas}/>
                    /*<img className={styles.image} src={this.state.readedFile} alt="Red dot"/>*/
                )}
            </div>
        );
    }
}
