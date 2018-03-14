import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import './image-component.css';

class ImageComponent extends Component {
    constructor() {
        super();
        this.state = {files: []}
    }

    onDrop(files) {
        var reader = new FileReader();
        reader.onload = (res) => {
            console.log(reader.result);
        };
        reader.readAsText(files[0]);

        this.setState({
            files
        });
    }

    render() {
        return (
            <Dropzone onDrop={this.onDrop.bind(this)}>
                <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
        );
    }
}

export default ImageComponent;
