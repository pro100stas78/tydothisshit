import React, { Component } from 'react';
import Header from './Header.js';
import TableWithLists from './TableWithLists.js';
import PopUp from './PopUp.js';
import { STATUS } from './constants';
import '../styles/MainPage.css';

class MainPage extends Component {

    state = {
        showPopUp: false,
        toDoList: [],
        inProgressList: [],
        doneList: [],
        loading: true,
    }

    componentDidMount = () => {
        setTimeout(this.getToDoList, 1000);
    }

    getToDoList = () => {
        var arrayOfKeys = Object.keys(localStorage).filter(el => +el);
        const toDoList = [];
        const inProgressList = [];
        const doneList = [];
        for (var i = 0; i < arrayOfKeys.length; i++) {
            const item = JSON.parse(localStorage.getItem(arrayOfKeys[i]));
            if (item.status === STATUS.TO_DO) {
                toDoList.push(item);
            }
            if (item.status === STATUS.IN_PROGRESS) {
                inProgressList.push(item);
            }
            if (item.status === STATUS.DONE) {
                doneList.push(item);
            }
        }

        this.setState({
            toDoList: this.sortBySelectedFilter(localStorage.getItem('toDoFilter'), toDoList),
            inProgressList: this.sortBySelectedFilter(localStorage.getItem('inProgressFilter'), inProgressList),
            doneList: this.sortBySelectedFilter(localStorage.getItem('doneFilter'), doneList),
            loading: false,
        })
    }

    sortBySelectedFilter = (filter, array) => {
        if (filter === 'byDate') {
            const sortedArray = array.sort((a, b) => {
                if (a.createDate > b.createDate) {
                    return 1;
                };
                return -1;
            })
            return sortedArray;
        } else {
            const sortedArray = array.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                }
                return -1;
            })
            return sortedArray;
        }
    }

    toDoSort = (filter) => {
        const { toDoList } = this.state;
        const sortedToDoList = this.sortBySelectedFilter(filter, toDoList);
        this.setState({
            toDoList: sortedToDoList,
        })
    }

    inProgressSort = (filter) => {
        const { inProgressList } = this.state;
        const sortedToDoList = this.sortBySelectedFilter(filter, inProgressList);
        this.setState({
            inProgressList: sortedToDoList,
        })
    }

    doneSort = (filter) => {
        const { doneList } = this.state;
        const sortedToDoList = this.sortBySelectedFilter(filter, doneList);
        this.setState({
            doneList: sortedToDoList,
        })
    }

    openPopUp = () => {
        this.setState({
            showPopUp: true,
        })
    }

    closePopUp = () => {
        this.setState({
            showPopUp: false,
        })
    }

    reset = () => {
        
    }

    render() {
        const { showPopUp, loading, toDoList, inProgressList, doneList } = this.state;
        return (
            <div className='wrapper'>
                {showPopUp ? <PopUp closePopUp={this.closePopUp} getToDoList={this.getToDoList} /> : null}
                <Header openPopUp={this.openPopUp} getToDoList={this.getToDoList}/>
                {!loading ? <TableWithLists toDoList={toDoList} inProgressList={inProgressList} doneList={doneList}
                    getToDoList={this.getToDoList} toDoSort={this.toDoSort} inProgressSort={this.inProgressSort} doneSort={this.doneSort} />
                    : <span className='loading'>Loading...</span>}
            </div>
        );
    }
}

export default MainPage;
