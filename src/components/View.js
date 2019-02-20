import React, { Component } from 'react';
import '../styles/View.css';

class View extends Component {
    onItemDelete = (key) => {
        const { onItemDelete } = this.props;
        onItemDelete(key);
    }
    render() {
        const { el } = this.props;
        const createDate = new Date(el.createDate);
        const formatDate = createDate.getHours() + ':' + createDate.getMinutes() + ':' + createDate.getSeconds();
        return (
            <div className='ToDoView'>
                <span className='title'>{el.title}</span>
                <p>{el.description}</p>
                <p>{formatDate}</p>
                <button onClick={() => this.onItemDelete(el.key)}>Remove</button>
            </div>
        );
    }
}

export default View;
