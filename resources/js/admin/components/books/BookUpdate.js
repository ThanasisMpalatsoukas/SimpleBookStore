import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'
import axios from 'axios';

class BookUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book : {},
            authors : [],
            categories: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/book/'+this.props.match.params.id).then(res => {
            this.setState({book : res.data});
        });
        axios.get('http://127.0.0.1:8000/api/authors').then(res => {
            let authors = res.data.map( (author) => {
                return {
                    author: author.name,
                    id: author.id
                }
            });
            this.setState({authors:authors});
        })
        axios.get('http://127.0.0.1:8000/api/categories').then(res => {
            let categories = res.data.map( (category) => {
                return {
                    category: category.name,
                    id: category.id
                }
            })
            this.setState({categories : categories});
        })
    }

    render() {

        let textareaFields = [
            'title',
            'description',
            'details'
        ]

        let selectFields = {
            simple : [],
            foreignKey : [
                { 
                    name: 'author' ,
                    value: this.state.authors 
                },
                {
                    name: 'category',
                    value: this.state.categories
                }
            ]
        }

        let inputFields = [
            {
                name: 'price',
                type: 'num',
                min: 0,
                max: 1000
            },
            {
                name: 'pages',
                type: 'num',
                min: 10,
                max: 10000
            },
            {
                name: 'discount',
                type: 'num',
                min: 0,
                max: 10
            },
            {
                name: 'amount_available',
                type: 'num',
                min: 0,
                max: 200
            },
            {
                name: 'yearOfPublication',
                type: 'num',
                min: 1000,
                max: 2019
            }
        ];
        let selectedFile = this.state.book.book_image;

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/book/',
            update : 'book/update/',
            updateBook : 'http://127.0.0.1:8000/api/book/update/'
        }

        return (
            <StripedTableUpdate 
                type="update"
                item={this.state.book}
                selectedFile={selectedFile}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="book"
                item_id={this.props.match.params.id}
            />
        )
    }
}

export default BookUpdate;