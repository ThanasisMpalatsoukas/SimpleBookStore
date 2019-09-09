import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class UpdateBookInput extends Component {
    constructor() {
        super();
    }

    swapVisibility(id2,id1) {
        if( document.getElementById(id1).style.display == 'none' ) {
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

        let type = 'input';
        let inputType = this.props.inputType;
        let inputId = type+'-'+this.props.memberName;

        return(
            <div>
                <br />
                <span className="card-subtitle mt-4 text-muted updateInput" id={this.props.memberName}>{this.props.memberName} : 
                <i> { (this.props.member === '' && this.props.member !== 0 ) ? 'Enter '+this.props.memberName+' here' : this.props.member}</i></span>
                <input
                    id={inputId}
                    data-member={this.props.memberName}
                    className="updateInput"
                    onChange={this.props.changeBookMember.bind(this)} 
                    style={{display:'none'}} 
                    type={inputType}
                    min={this.props.min}
                    max={this.props.max}
                    value={this.props.member}>
                </input>
                <br />

                <span onClick={() => {this.swapVisibility(inputId,this.props.memberName)}}>{descriptionPencil}</span>
            </div>
        )
    }
}

export default UpdateBookInput