import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'
import axios from 'axios';

class AuthorUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            author : {}
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/author/'+this.props.match.params.id).then(res => {
            this.setState({author : res.data});
        })
    }

    render() {

        let textareaFields = [
            'name',
            'surname'
        ]

        let inputFields = '';

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/author/',
            update : 'author/update/',
            updateBook : 'http://127.0.0.1:8000/api/author/update/'
        }

        return (
            <StripedTableUpdate
                type="update"
                item={this.state.author}
                db_models="none"
                inputFields={inputFields}
                textareaFields = {textareaFields}
                routes = {routes}
                itemName="author"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default AuthorUpdate;