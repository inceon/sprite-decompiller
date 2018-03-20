import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import styles from './image-component.scss';

export default class ImageComponent extends Component {
    constructor() {
        super();
        this.state = {files: []}
    }

    onDrop(files) {
        var reader = new FileReader();
        reader.onload = () => {
            this.setState({
                readedFile: reader.result
            });
        };
        reader.readAsDataURL(files[0]);
    }

    render() {
        return (
            <div id={styles['image-component']}>
                {!this.state.readedFile && (
                    <Dropzone className={styles['drop-zone']}
                              onDrop={this.onDrop.bind(this)}
                              accept=".jpeg,.png,.jpg,.bmp">

                        <p className={styles['drop-zone-text']}>Drop or click for select image file here.</p>
                    </Dropzone>
                )}
                {this.state.readedFile && (
                    <img className={styles.image} src={this.state.readedFile} alt="Red dot"/>
                )}
            </div>
        );
    }
}
