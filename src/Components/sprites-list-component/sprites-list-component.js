import React, {Component} from 'react';
import './sprites-list-component.css';

export default class SpritesListComponent extends Component {
    state = {
        list: [1, 2, 3]
    };

    render() {
        return (
            <div id="sprites-list-component">
                {
                    this.state.list.map((el) => {
                        return (
                            <div className="sprite-item" key={el}>
                                {el}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
