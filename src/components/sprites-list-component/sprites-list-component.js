import React, {Component} from 'react';
import styles from './sprites-list-component.scss';
import Dropzone from "react-dropzone";
import {AppModel} from '../../model';

export default class SpritesListComponent extends Component {

    constructor() {
        super();
        this.state = {
            list: [],
            readedFile: null
        };
        this._model = AppModel.getInstance();
    }

    getSpriteArray(spriteList = []) {
        let list = [];
        for (let spriteName in spriteList.frames) {
            let spriteInfo = {
                name: spriteName,
                ...spriteList.frames[spriteName]
            };

            list.push(spriteInfo);
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

            this._model.spritesList = list;

            this.setState({
                readedFile: spriteList,
                list
            });

            this.props.updateImage();
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
        this.props.updateImage();
    }

    render() {
        return (
            <div id={styles['sprites-list-component']}>
                <Dropzone className={this.state.readedFile ? styles['drop-zone-completed'] : styles['drop-zone-empty']}
                          onDrop={this.onDrop.bind(this)}
                          accept=".json">
                    <p className={styles['drop-zone-text']}/>
                </Dropzone>
                {this.state.readedFile &&
                this._model.spritesList.map((el, idx) => {
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

                <div className={styles['github-buttons']}>
                    <a className="github-button" href="https://github.com/inceon" data-show-count="true"
                       aria-label="Follow @inceon on GitHub">Follow</a>
                    <a className="github-button" href="https://github.com/inceon/sprite-decompiller/subscription"
                       data-show-count="true" aria-label="Watch inceon/sprite-decompiller on GitHub">Watch</a>&nbsp;
                    <a className="github-button" href="https://github.com/inceon/sprite-decompiller" data-show-count="true"
                       aria-label="Star inceon/sprite-decompiller on GitHub">Star</a>
                </div>
            </div>
        );
    }
}
