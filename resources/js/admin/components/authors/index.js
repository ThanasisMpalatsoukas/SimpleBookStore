import React, { Component } from 'react';
import axios from 'axios'
import StripedTable from '../StripedTable'


class AllAuthorsTable extends Component {
    constructor() {
        super()

        this.state = {
            model: [],
            model_count : 0,
            model_initialized : false
        }
    }
    
    componentDidMount() {
        let getItemCountUrl = 'http://127.0.0.1:8000/api/getItemCount/';
        axios.post(getItemCountUrl).then(res => {
            this.setState({ model_count : res.data['authors'] },()=>{
                if( this.state.model != '' ) {
                    this.setState({model_initialized : true});
                }
            });
        });

        let getCategories = 'http://127.0.0.1:8000/api/authors/';
        axios.get(getCategories).then(res => {
            this.setState({ model : res.data },()=>{
                if( this.state.model_count != '' ) {
                    this.setState({model_initialized : true});
                }
            });
        });
    }

    render() {

        let tableHeaders = ['name','surname','description','created_at'];
        let tableOrdered = ['name','surname'];

        let routes = {
            item_count: 'http://127.0.0.1:8000/api/getItemCount/',
            items: 'http://127.0.0.1:8000/api/authors/',
            delete: 'http://127.0.0.1:8000/api/author/delete/',
            paginate: 'http://127.0.0.1:8000/paginate/',
            create: '/admin/authors/create',
            update: '/admin/authors/update/'
        }

        return(
            <div>
                {
                    this.state.model_initialized ? 
                    <StripedTable 
                        routes={routes}
                        model={this.state.model}
                        model_count={this.state.model_count}
                        tableOrdered={tableOrdered}
                        createOffsetHeightId="authorTableId"
                        tableHeaders={tableHeaders}
                        tableTitle="authors"
                    />
                    : '<div></div>'
                }
            </div>
        )
    }
}

export default AllAuthorsTable;