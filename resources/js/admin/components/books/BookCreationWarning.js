import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'

class BookCreationWarning extends Component {
    constructor(props) {
        super(props);
    }

    extra_text( type ) {
        let extra_text = this.props.text;
        if ( type == 'not_null' ) {
            extra_text += ' must not be empty';
        }
        if ( type == 'number_range' ) {
            extra_text += ' must be between '+this.props.min+' and '+this.props.max;
        }
        if ( type == 'html_injection' ) {
            extra_text += ' has wrong value';
        }
        if ( type == 'invalid_number' ) {
            extra_text = this.props.text.name + ' must have a value between ' + this.props.text.min + ' and '+this.props.text.max;
        }
        if ( type == 'invalid_isbn' ) {
            extra_text += ' must have the following format : 123-123-123-123-1';
        }
        return extra_text;
    }

    render() {
        let extra_text = this.extra_text(this.props.type);

        let elementId;
        if ( this.props.type != 'invalid_number' ) {
            elementId = this.props.type+'_'+this.props.text;
        }
        else {
            elementId = this.props.type+'_'+this.props.text.name;
        }

        return(
            <Alert className="not-null-warning" id={elementId} variant="danger" style={{display:'none'}}>{extra_text}</Alert>
        )
    }
}

export default BookCreationWarning