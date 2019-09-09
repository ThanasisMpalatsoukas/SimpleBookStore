import React, { Component } from 'react';
import axios from 'axios'
import StripedTable from '../StripedTable'


class AllBooksTable extends Component {
    constructor() {
        super()

        this.state = {
            model: '',
            model_count: '',
            models_initialized: false
        }

        let getItemCountUrl = 'http://127.0.0.1:8000/api/getItemCount/';
        axios.post(getItemCountUrl).then(res => {
            this.setState({ model_count : res.data['books'] },()=>{
                if( this.state.model != '' ) {
                    this.setState({ models_initialized : true });
                }
            });
        });

        let getCategories = 'http://127.0.0.1:8000/api/books/';
        axios.get(getCategories).then(res => {
            this.setState({ model : res.data[0] },()=>{
                if( this.state.model_count != '' ) {
                    this.setState({ models_initialized : true });
                }
            });
        })
    }
    
    componentDidMount() {

    }

    render() {

        let tableHeaders = ['title','price','discount','ISBN','pages','created_at','yearOfPublication','amount_available','category_name','author_name'];
        let tableOrdered = ['title','description','price','author_name'];

        let routes = {
            item_count: 'http://127.0.0.1:8000/api/getItemCount/',
            items: 'http://127.0.0.1:8000/api/books/',
            delete: 'http://127.0.0.1:8000/api/book/delete/',
            paginate: 'http://127.0.0.1:8000/paginate',
            create: '/admin/books/create',
            update: '/admin/books/update/'
        }

        return(
            <div>
                { this.state.models_initialized ? 
                    <StripedTable 
                        routes={routes}
                        model={this.state.model}
                        model_count={this.state.model_count}
                        createOffsetHeightId="bookTableId"
                        tableHeaders={tableHeaders}
                        tableTitle="books"
                        tableOrdered={tableOrdered}
                    /> : '<div></div>' 
                }
            </div>
        )
    }
}

export default AllBooksTable;