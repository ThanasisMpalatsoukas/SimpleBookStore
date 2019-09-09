import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'

class CreateRegion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: '',
            city_initialization: false
        }
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/cities').then(res => {
            let cities = res.data.map( (city) => {
                return {
                    city: city.name,
                    id: city.id
                }
            })
            this.setState({cities : cities,city_initialization:true});
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
    
        let region = {
            name: '',
            extra_cost: '',
            city: ''
        }
    
        let selectedFile = '';
    
        let routes = {
            getItem : 'http://127.0.0.1:8000/api/region/',
            create : 'region/create/',
            createBook : 'http://127.0.0.1:8000/api/region/create/'
        }
    
        console.log(this.props.match.params.id);
    
        return (
            <div>
                {
                    this.state.city_initialization ? 
                    <StripedTableUpdate 
                        type="create"
                        item={region}
                        selectedFile={selectedFile}
                        inputFields={inputFields}
                        textareaFields = {textareaFields}
                        selectFields={selectFields}
                        routes = {routes}
                        itemName="region"
                        item_id={this.props.match.params.id}
                    /> : <h1>Loading</h1>
                }
            </div>
        )
    }
}

export default CreateRegion;