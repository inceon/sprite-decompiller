import React, {Component} from 'react';
import './App.css';
import ImageComponent from './Components/image-component/image-component';
import SpritesListComponent from './Components/sprites-list-component/sprites-list-component';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ImageComponent/>
                <SpritesListComponent/>
            </div>
        );
    }
}

export default App;
