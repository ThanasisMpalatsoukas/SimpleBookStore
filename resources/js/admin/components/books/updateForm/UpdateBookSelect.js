import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

class UpdateBookTextarea extends Component {
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
        
        let type = 'select';
        let inputId = type+'-'+this.props.memberName;

        // Data_member must be of type : name+'_id'
        // if the type is going to be a foreign key.
        let data_member = this.props.memberName;

        return(
            <div>
                <h6 id={this.props.memberName} className="card-subtitle mb-2 mt-4 text-muted">
                    <i>{this.props.memberName} : {this.props.member == '' ? 'Enter '+this.props.memberName+' here' : this.props.member}</i></h6>
                        <select 
                        className="mt-4" 
                        id={inputId}
                        style={{display:'none'}} 
                        value={this.props.currentId} 
                        name={data_member}
                        data-member={data_member}
                        onChange={this.props.changeBookMember.bind(this)}
                        >
                            {this.props.options}
                        </select>
                    <span onClick={() => {this.swapVisibility(inputId,this.props.memberName)}}>{descriptionPencil}</span>
            </div>
        )
    }
}

export default UpdateBookTextarea