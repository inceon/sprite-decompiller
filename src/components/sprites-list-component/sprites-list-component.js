import React, {Component} from 'react';
import styles from './sprites-list-component.scss';
import spriteList from '../../../static/fire.json';

export default class SpritesListComponent extends Component {
    state = {
        list: []
    };

    componentWillMount() {
        let list = [];
        for (let spriteName in spriteList.frames) {
            list.push({
                name: spriteName,
                ...spriteList.frames[spriteName]
            });
        }

        this.setState({list});
    }

    parseObject(el, indent) {
        let info = [];
        for (let key in el) {
            if (key === 'showInfo') continue;
            if (typeof el[key] === 'object') {
                info.push(
                    <div className={styles.object}>
                        <span className={styles.name}>
                            {key}:
                        </span>
                        {this.parseObject(el[key], indent + 1)}
                    </div>
                );
            } else {
                info.push(
                    <div style={{paddingLeft: indent * 15}}>
                        <span className={styles.name}>
                            {key}:
                        </span>
                        {' ' + el[key]}
                    </div>
                );
            }
        }
        return info;
    }

    openAdditionalInfo(el) {
        el.showInfo = !el.showInfo;
        this.setState(this.state);
    }

    render() {
        return (
            <div id={styles['sprites-list-component']}>
                {
                    this.state.list.map((el, idx) => {
                        return (
                            <div key={idx}>
                                <div className={styles['sprite-item']} onClick={this.openAdditionalInfo.bind(this, el)}>
                                    {el.name}
                                </div>
                                {el.showInfo && (
                                    <div className={styles['additional-info']}>
                                        {
                                            this.parseObject(el, 0)
                                        }
                                    </div>
                                )}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
