import React, { Component } from 'react'
import Proptypes from 'prop-types';

export class todoitem extends Component {
    render() {
        return (
            <div>
                <p>{this.props.todo.title}</p>
            </div>
        )
    }
}

//Proptypes
todoitem.propTypes = {
    todo: Proptypes.object.isRequired
}

export default todoitem
