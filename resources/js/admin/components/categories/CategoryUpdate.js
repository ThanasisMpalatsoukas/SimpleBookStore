import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'
import axios from 'axios';

class CategoryUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category : {},
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/category/'+this.props.match.params.id).then(res => {
            this.setState({category : res.data});
        });
    }

    render() {

        let textareaFields = [
            'name',
        ]

        let selectFields = {
        }

        let inputFields = [

        ];

        let selectedFile = this.state.category.category_cover;
        
        let routes = {
            getItem : 'http://127.0.0.1:8000/api/category/',
            update : 'category/update/',
            updateBook : 'http://127.0.0.1:8000/api/category/update/'
        }

        return (
            <StripedTableUpdate 
                type="update"
                item={this.state.category}
                selectedFile={this.state.category.category_cover}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="category"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default CategoryUpdate;