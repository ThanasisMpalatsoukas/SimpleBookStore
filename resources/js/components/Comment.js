import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Comment extends Component {
    constructor() {
        super();
    }
    render() {

        let stars = { backgroundImage : 'url(http://127.0.0.1:8000/storage/stars.png)' }
        let stars_overlay = { width : this.props.width }

        return(
            <div className="single-review-container" style={{marginTop : '15px'}}>
                <div className="profile-information">
                    <p>{this.props.name}</p>
                    <div className="stars image" style={stars}></div>
                    <div className="stars-overlay" style={stars_overlay}>
                    </div>
                </div>
                <div className="comment">
                    <p>{this.props.comment}</p>
                </div>
            </div>
        )
    }
}

export default Comment;