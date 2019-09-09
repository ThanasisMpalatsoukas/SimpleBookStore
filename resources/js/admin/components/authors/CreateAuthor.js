import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'
import axios from 'axios';

class CreateAuthor extends Component {
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

        let item = {
            name : '',
            surname: '',
            description: ''
        }
        let textareaFields = [
            'name',
            'surname',
            'description'
        ]

        let inputFields = '';

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/author/',
            create : 'author/create/',
            createBook : 'http://127.0.0.1:8000/api/author/create'
        }

        return (
            <StripedTableUpdate
                type="create"
                item={item}
                db_models="none"
                selectedFile=""
                inputFields={inputFields}
                textareaFields = {textareaFields}
                routes = {routes}
                itemName="author"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default CreateAuthor;