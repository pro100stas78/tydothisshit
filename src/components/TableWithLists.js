import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { STATUS } from './constants'
import View from './View.js';
import '../styles/TableWithLists.css';
import { red } from 'ansi-colors';

class TableWithLists extends Component {

    componentDidMount = () => {
        this.setSelectValue()
    }

    setSelectValue = () => {
        if (localStorage.getItem('toDoFilter')) {
            this.toDoSelect.value = localStorage.getItem('toDoFilter');
        } else {
            this.toDoSelect.value = 'default';
        }
        if (localStorage.getItem('inProgressFilter')) {
            this.inProgressSelect.value = localStorage.getItem('inProgressFilter');

        } else {
            this.inProgressSelect.value = 'default';
        }
        if (localStorage.getItem('doneFilter')) {
            this.doneSelect.value = localStorage.getItem('doneFilter');
        } else {
            this.doneSelect.value = 'default';
        }
    }

    onItemDelete = (key) => {
        const { getToDoList } = this.props;
        localStorage.removeItem(key);
        getToDoList();
    }

    toDoColumntSort = (e) => {
        const sortingFilter = e.currentTarget.value;
        localStorage.setItem('toDoFilter', sortingFilter);
        const { toDoSort } = this.props;
        toDoSort(sortingFilter);
    }

    inProgressSort = (e) => {
        const sortingFilter = e.currentTarget.value;
        localStorage.setItem('inProgressFilter', sortingFilter);
        const { inProgressSort } = this.props;
        inProgressSort(sortingFilter);
    }

    doneSort = (e) => {
        const sortingFilter = e.currentTarget.value;
        localStorage.setItem('doneFilter', sortingFilter);
        const { doneSort } = this.props;
        doneSort(sortingFilter);
    }

    updateStatus = (column) => {
        if (column === 'toDo') {
            return STATUS.TO_DO;
        }
        if (column === 'inProgress') {
            return STATUS.IN_PROGRESS;
        }
        if (column === 'done') {
            return STATUS.DONE;
        }
    }

    onDrop = (column, dropResult) => {
        const { addedIndex, payload } = dropResult;
        const { getToDoList } = this.props;
        if (addedIndex !== null) {
            const newObj = Object.assign({}, payload);
            newObj.status = this.updateStatus(column);
            localStorage.setItem(newObj.key, JSON.stringify(newObj));
        }
        getToDoList();
    }

    getPayload = (column, index) => {
        const { toDoList, inProgressList, doneList } = this.props;
        if (column === 'toDo') {
            return toDoList[index];
        }
        if (column === 'inProgress') {
            return inProgressList[index];
        }
        if (column === 'done') {
            return doneList[index];
        }
    }

    render() {
        const styles = {
            background: red,
        }
        const { toDoList, inProgressList, doneList } = this.props;
        return (
            <div className='list'>
                <table className='table'>
                    <tbody>
                        <tr>
                            <th>
                                <span>To Do</span>
                                <select ref={elem => this.toDoSelect = elem} onChange={this.toDoColumntSort}>
                                    <option value='default' disabled>
                                        choose sorting method</option>
                                    <option value='byDate' >By date</option>
                                    <option value="byAlphabet" >By alphabet</option>
                                </select> </th>
                            <th>
                                <span>In Progress</span>
                                <select ref={elem => this.inProgressSelect = elem} onChange={this.inProgressSort}>
                                    <option value='default' disabled>
                                        choose sorting method</option>
                                    <option value='byDate'>By date</option>
                                    <option value="byAlphabet" >By alphabet</option>
                                </select>
                            </th>
                            <th>
                                <span>Done</span>
                                <select ref={elem => this.doneSelect = elem} onChange={this.doneSort}>
                                    <option value='default' disabled>
                                        choose sorting method</option>
                                    <option value='byDate'>By date</option>
                                    <option value="byAlphabet">By alphabet</option>
                                </select>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <Container
                                    onDrop={(e) => this.onDrop('toDo', e)}
                                    groupName="col"
                                    getChildPayload={(e) => this.getPayload('toDo', e)}
                                    style={styles}
                                >
                                    {toDoList.map(el =>
                                        <Draggable key={el.key}>
                                            <View el={el} onItemDelete={this.onItemDelete}></View>
                                            {/* <div className='ToDoView'>
                                                <span>{el.title}</span>
                                                <p>{el.description}</p>
                                                <button onClick={() => this.onItemDelete(el.key)}>Remove</button>
                                            </div> */}
                                        </Draggable>
                                    )}
                                    <div className='addHeightForContainer'></div>
                                </Container>
                            </td>
                            <td>
                                <Container
                                    onDrop={(e) => this.onDrop('inProgress', e)}
                                    groupName="col"
                                    getChildPayload={(e) => this.getPayload('inProgress', e)}

                                >
                                    {inProgressList.map(el =>
                                        <Draggable key={el.key}>
                                            <View el={el} onItemDelete={this.onItemDelete}></View>
                                            {/* <div className='ToDoView' key={el.key}>
                                                <span>{el.title}</span>
                                                <p>{el.description}</p>
                                                <button onClick={() => this.onItemDelete(el.key)}>Remove</button>
                                            </div> */}
                                        </Draggable>
                                    )}
                                    <div className='addHeightForContainer'></div>
                                </Container>
                            </td>
                            <td>
                                <Container
                                    onDrop={(e) => this.onDrop('done', e)}
                                    groupName="col"
                                    getChildPayload={(e) => this.getPayload('done', e)}
                                >
                                    {doneList.map(el =>
                                        <Draggable key={el.key}>
                                            <View el={el} onItemDelete={this.onItemDelete}></View>
                                            {/* <div className='ToDoView' key={el.key}>
                                                <span>{el.title}</span>
                                                <p>{el.description}</p>
                                                <button onClick={() => this.onItemDelete(el.key)}>Remove</button>
                                            </div> */}
                                        </Draggable>
                                    )}
                                    <div className='addHeightForContainer'></div>
                                </Container>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableWithLists;
