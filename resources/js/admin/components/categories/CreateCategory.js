import React, { Component } from 'react';
import StripedTableUpdate from '../StripedTableUpdate'

class CreateCategory extends Component {
    constructor(props) {
        super(props)
    }


    render() {

        let item = {
            name : '',
            category_cover : ''
        }

        let textareaFields = [
            'name',
        ]

        let selectFields = {
        }

        let inputFields = [

        ];
        
        let routes = {
            getItem : 'http://127.0.0.1:8000/api/category/',
            create : 'category/create/',
            createBook : 'http://127.0.0.1:8000/api/category/create/'
        }

        return (
            <StripedTableUpdate 
                type="create"
                item={item}
                selectedFile="placeholder-image.jpg"
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="category"
            />
        )
    }
}

export default CreateCategory;