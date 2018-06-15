import React, {Component} from 'react';
import styles from './App.scss';
import ImageComponent from '../components/image-component/image-component';
import SpritesListComponent from '../components/sprites-list-component/sprites-list-component';

class App extends Component {
    rerenderImage() {
        this.imageComponent.forceUpdate();
    }
    render() {
        return (
            <div className={styles.App}>
                <ImageComponent ref={imageComponent => this.imageComponent = imageComponent}/>
                <SpritesListComponent updateImage={this.rerenderImage.bind(this)}/>
            </div>
        );
    }
}

export default App;
