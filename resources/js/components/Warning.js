import React, { Component } from 'react'

class Warning extends Component {
    constructor() {
        super();
    }
    render() {
        return(
            <div className={this.props.classes} id="confirm-purchase">
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default Warning; 