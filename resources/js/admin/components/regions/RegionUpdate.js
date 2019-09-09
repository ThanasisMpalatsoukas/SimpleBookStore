import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'

class RegionUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            region : {},
            cities : []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/region/'+this.props.match.params.id).then(res => {
            this.setState({region : res.data});
        });

        axios.get('http://127.0.0.1:8000/api/cities').then(res => {
            let cities = res.data.map( (city) => {
                return {
                    city: city.name,
                    id: city.id
                }
            })
            this.setState({cities : cities});
        });
    }

    render() {

        let textareaFields = [
            'name',
        ]

        let selectFields = {
            simple : [],
            foreignKey : [
                { 
                    name: 'city' ,
                    value: this.state.cities
                },
            ]
        }

        let inputFields = [
            {
                name: 'extra_cost',
                type: 'num',
                min: 0,
                max: 1000
            },
        ];

        let selectedFile = '';

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/region/',
            update : 'region/update/',
            updateBook : 'http://127.0.0.1:8000/api/region/update/'
        }

        console.log(this.props.match.params.id);

        return (
            <StripedTableUpdate 
                type="update"
                item={this.state.region}
                selectedFile={selectedFile}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="region"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default RegionUpdate;