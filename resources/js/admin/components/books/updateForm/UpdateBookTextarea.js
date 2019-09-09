import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class UpdateBookTextarea extends Component {
    constructor() {
        super();
    }

    swapVisibility(id2,id1) {
        if( document.getElementById(id1).style.display === 'none' ) {
            document.getElementById(id1).style.display = 'block';
            document.getElementById(id2).style.display = 'none';
        }
        else {
            document.getElementById(id1).style.display = 'none';
            document.getElementById(id2).style.display = 'block';
        }

    }

    render() {

        let descriptionPencil = <FontAwesomeIcon className="pencil-icon-description" icon={faPencilAlt} fill="red" />;
        let type = 'textarea';
        let textareaId = type+'-'+this.props.memberName;

        return(
            <div>
                <h3 style={{fontWeight:'700'}} className="mt-3 mb-3">{this.props.memberName}</h3>
                <span id={this.props.memberName}>{this.props.member === '' ? 'Enter '+this.props.memberName+' here' : this.props.member}</span>
                <textarea  
                    id={textareaId} 
                    data-member={this.props.memberName}
                    onChange={this.props.changeBookMember.bind(this)} 
                    style={{display:'none'}} 
                    rows="5"
                    cols="30"
                    value={this.props.member}>{this.props.member}
                </textarea>
                <br />
                <span onClick={() => {this.swapVisibility(textareaId,this.props.memberName)}}>{descriptionPencil}</span>
            </div>
        )
    }
}

export default UpdateBookTextarea