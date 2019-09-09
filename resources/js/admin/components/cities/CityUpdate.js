import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'
import axios from 'axios';

class CityUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city : {},
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/city/'+this.props.match.params.id).then(res => {
            this.setState({city : res.data});
        });
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
            update : 'city/update/',
            updateBook : 'http://127.0.0.1:8000/api/city/update/'
        }

        return (
            <StripedTableUpdate 
                type="update"
                item={this.state.city}
                selectedFile={selectedFile}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="city"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default CityUpdate;