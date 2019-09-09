import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'

class CityUpdate extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let textareaFields = [
            'name',
        ]

        let inputFields = [
            {
                name: 'extra_cost',
                type: 'num',
                min: 0,
                max: 1000
            },
        ];

        let selectFields = '';
        let selectedFile = '';

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/city/',
            create : 'city/update/',
            createBook : 'http://127.0.0.1:8000/api/city/create'
        }

        let city = {
            'name' : '',
            'extra_cost' : ''
        }

        return (
            <StripedTableUpdate 
                type="create"
                item={city}
                selectedFile={selectedFile}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="city"
            />
        )
    }
}

export default CityUpdate;