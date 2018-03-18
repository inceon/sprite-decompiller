import React, {Component} from 'react';
import styles from './App.scss';
import ImageComponent from '../components/image-component/image-component';
import SpritesListComponent from '../components/sprites-list-component/sprites-list-component';

class App extends Component {
    render() {
        return (
            <div className={styles.App}>
                <ImageComponent/>
                <SpritesListComponent/>
            </div>
        );
    }
}

export default App;
