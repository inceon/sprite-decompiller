import React, {Component} from 'react';
import styles from './sprites-list-component.scss';

export default class SpritesListComponent extends Component {
    state = {
        list: [
            {
                name: '1.png',
                frame: {"x": 329, "y": 823, "w": 148, "h": 32},
                rotated: false,
                trimmed: true,
                spriteSourceSize: {"x": 0, "y": 0, "w": 148, "h": 32},
                sourceSize: {"w": 149, "h": 32}
            },
            {
                name: '2.png',
                frame: {"x": 329, "y": 823, "w": 148, "h": 32},
                rotated: false,
                trimmed: true,
                spriteSourceSize: {"x": 0, "y": 0, "w": 148, "h": 32},
                sourceSize: {"w": 149, "h": 32}
            },
            {
                name: '3.png',
                frame: {"x": 329, "y": 823, "w": 148, "h": 32},
                rotated: false,
                trimmed: true,
                spriteSourceSize: {"x": 0, "y": 0, "w": 148, "h": 32},
                sourceSize: {"w": 149, "h": 32}
            }
        ]
    };

    render() {
        return (
            <div id={styles['sprites-list-component']}>
                {
                    this.state.list.map((el, idx) => {
                        return (
                            <div className={styles['sprite-item']} key={idx}>
                                {el.name}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
