import React, {Component} from 'react';
import styles from './sprites-list-component.scss';
import Dropzone from "react-dropzone";

export default class SpritesListComponent extends Component {
    state = {
        list: [],
        readedFile: null
    };

    getSpriteArray(spriteList = []) {
        let list = [];
        for (let spriteName in spriteList.frames) {
            list.push({
                name: spriteName,
                ...spriteList.frames[spriteName]
            });
        }

        return list;
    }

    sortSpriteArrayByName(list = []) {
        let sortedList = list.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });

        return sortedList;
    }

    onDrop(files) {
        let reader = new FileReader();
        reader.onload = () => {
            let spriteList = JSON.parse(reader.result);
            let list = this.sortSpriteArrayByName(this.getSpriteArray(spriteList));

            this.setState({
                readedFile: spriteList,
                list
            });
        };
        reader.readAsText(files[0]);
    }

    parseObject(el, indent) {
        let info = [];
        for (let key in el) {
            if (key === 'showInfo') {
                continue;
            }
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
                {!this.state.readedFile && (
                    <Dropzone className={styles['drop-zone']}
                              onDrop={this.onDrop.bind(this)}
                              accept=".json">
                        <p className={styles['drop-zone-text']}>Drop or click for select JSON here.</p>
                    </Dropzone>
                )}
                {this.state.readedFile &&
                    this.state.list.map((el, idx) => {
                        return (
                            <div key={idx}>
                                <div className={styles['sprite-item'] + ' ' + (el.showInfo ? styles.selected : null)}
                                     onClick={this.openAdditionalInfo.bind(this, el)}>
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
