import React, {Component} from 'react';
import styles from './sprites-list-component.scss';

export default class SpritesListComponent extends Component {
    state = {
        list: [1, 2, 3]
    };

    render() {
        return (
            <div id={styles['sprites-list-component']}>
                {
                    this.state.list.map((el) => {
                        return (
                            <div className={styles['sprite-item']} key={el}>
                                {el}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
