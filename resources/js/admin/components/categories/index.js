import React, { Component } from 'react';
import StripedTable from '../StripedTable'
import axios from 'axios'


class AllCategoriesTable extends Component {
    constructor() {
        super()

        this.state = {
            model: [],
            model_count : 0,
            models_initialized: false
        }
    }
    
    componentDidMount() {
        let getItemCountUrl = 'http://127.0.0.1:8000/api/getItemCount/';
        axios.post(getItemCountUrl).then(res => {
            this.setState({ model_count : res.data['categories'] },()=>{
                if( this.state.model != '' ) {
                    this.setState({ models_initialized : true });
                }
            });
        });

        let getCategories = 'http://127.0.0.1:8000/api/categories/';
        axios.get(getCategories).then(res => {
            this.setState({ model : res.data },()=>{
                if( this.state.model_count != '' ) {
                    this.setState({ models_initialized : true });
                }
            });
        });
    }

    render() {

        let tableHeaders = ['name','category_cover','created_at'];
        let tableOrdered = ['name'];

        let routes = {
            item_count: 'http://127.0.0.1:8000/api/getItemCount',
            items: 'http://127.0.0.1:8000/api/categories',
            delete: 'http://127.0.0.1:8000/api/category/delete',
            paginate: 'http://127.0.0.1:8000/paginate',
            create: '/admin/categories/create/', 
            update: '/admin/categories/update/'
        }

        return(
            <div>
                { 
                this.state.models_initialized ? 
                    <StripedTable 
                        routes={routes}
                        model={this.state.model}
                        model_count={this.state.model_count}
                        createOffsetHeightId="bookTableId"
                        tableHeaders={tableHeaders}
                        tableTitle="categories"
                        tableOrdered={tableOrdered}
                    /> : '<div></div>'
                }
            </div>
        )
    }
}

export default AllCategoriesTable;