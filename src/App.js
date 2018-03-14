import React, {Component} from 'react';
import './App.css';
import ImageComponent from './image-component/image-component';

class App extends Component {
    render() {
        return (
            <div className="App">
                <ImageComponent/>
            </div>
        );
    }
}

export default App;
