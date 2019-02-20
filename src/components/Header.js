import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {

    addButtonClick = () => {
        const { openPopUp } = this.props;
        openPopUp();
    }

    reset = () => {
        const { getToDoList } = this.props;
        localStorage.clear();
        getToDoList();
    }

    render() {
        return (
            <div className='header'>
                <button className='addButtom' onClick={this.addButtonClick}>Add</button>
                <button className='resetButton' onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default Header;
