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
        reader.onload = (res) => {
            console.log(reader.result);
            this.setState({
                readedFile: reader.result
            });
        };
        reader.readAsText(files[0]);

        this.setState({
            files
        });
    }

    render() {
        return (
            <div id={styles['image-component']}>
                <Dropzone className={styles['drop-zone']} onDrop={this.onDrop.bind(this)}>
                    <p className={styles['drop-zone-text']}>Drop or click for select image file here.</p>
                </Dropzone>

                <p>
                    {this.state.readedFile}
                </p>
            </div>
        );
    }
}
