import React, { Component } from 'react';
import { STATUS } from './constants'
import '../styles/PopUp.css';

class PopUp extends Component {

    onBackgroundClick = () => {
        const { closePopUp } = this.props;
        closePopUp();
    }

    getKey = () => {
        if (localStorage.length) {
            const arrayOfKeys = Object.keys(localStorage).filter(el => +el);
            if (arrayOfKeys.length) {
                const keyOfTheLastElement = Math.max.apply(null, arrayOfKeys);
                const key = +keyOfTheLastElement + 1;
                return key;
            }
        }
        return 1;
    }

    onApplyClick = () => {
        if (this.title.value.trim() && this.description.value.trim()) {
            const { closePopUp, getToDoList } = this.props;
            const toDo = {
                title: this.title.value.trim(),
                description: this.description.value.trim(),
                createDate: new Date(),
                status: STATUS.TO_DO,
                key: this.getKey()
            }
            localStorage.setItem(this.getKey(), JSON.stringify(toDo))
            closePopUp();
            getToDoList();
        } else {
            alert('Заполните все поля!');
        }
    }

    render() {
        return (
            <div className="background" onClick={this.onBackgroundClick}>
                <div className="contentBlock" onClick={(e) => e.stopPropagation()}>
                    <label htmlFor='title'>Title</label>
                    <input id="title" ref={elem => this.title = elem}></input>
                    <label htmlFor='description'>Description</label>
                    <textarea id='description' rows='5' ref={elem => this.description = elem}></textarea>
                    <button onClick={this.props.closePopUp}>Cancel</button>
                    <button onClick={this.onApplyClick}>Apply</button>
                </div>
            </div>
        );
    }
}

export default PopUp;

