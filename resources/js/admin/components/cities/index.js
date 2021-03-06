import React, { Component } from 'react';
import StripedTable from '../StripedTable'
import axios from 'axios'


class AllCitiesTable extends Component {
    constructor() {
        super()

        this.state = {
            model: [],
            model_count : 0,
            model_initialized: false
        }
    }
    
    componentDidMount() {
        let getItemCountUrl = 'http://127.0.0.1:8000/api/getItemCount/';
        axios.post(getItemCountUrl).then(res => {
            this.setState({ model_count : res.data['cities'] },()=>{
                if( this.state.model!='' ) {
                    this.setState({model_initialized:true});
                }
            });
        });

        let getCategories = 'http://127.0.0.1:8000/api/cities/';
        axios.get(getCategories).then(res => {
            this.setState({ model : res.data },()=>{
                if( this.state.model_count!='' ) {
                    this.setState({model_initialized:true});
                }
            });
        });
    }

    render() {

        let tableHeaders = ['name','extra_cost'];
        let tableOrdered = ['name'];

        let routes = {
            item_count: 'http://127.0.0.1:8000/api/getItemCount',
            items: 'http://127.0.0.1:8000/api/cities',
            delete: 'http://127.0.0.1:8000/api/cities/delete',
            paginate: 'http://127.0.0.1:8000/paginate',
            create: '/admin/cities/create/', 
            update: '/admin/cities/update/'
        }

        return(
            <div>
                {
                    this.state.model_initialized ? 
                    <StripedTable 
                        routes={routes}
                        model={this.state.model}
                        model_count={this.state.model_count}
                        createOffsetHeightId="bookTableId"
                        tableHeaders={tableHeaders}
                        tableTitle="cities"
                        tableOrdered={tableOrdered}
                    /> : '<h1>Loading</h1>'
                }
            </div>
        )
    }
}

export default AllCitiesTable;