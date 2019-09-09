import React, { Component } from 'react'
import StripedTableUpdate from '../StripedTableUpdate'

class CreateBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book : {},
            categories : [],
            authors: []
        }
    }

    componentDidMount() {
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
            'details',
            'ISBN'
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

        let item = {
            'title' : '',
            'description' : '',
            'author' : '',
            'category' : '',
            'author_id' : '',
            'category_id' : '',
            'book_image' : '',
            'ISBN' : '',
            'yearOfPublication' : '',
            'discount' : '',
            'price' : '',
            'amount_available' : '',
            'details' : '' 
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
        let selectedFile = 'placeholder-image.jpg';

        let routes = {
            getItem : 'http://127.0.0.1:8000/api/book/',
            create : 'book/update/',
            createBook : 'http://127.0.0.1:8000/api/bookCreate'
        }

        return (
            <StripedTableUpdate 
                type="create"
                item={item}
                selectedFile={selectedFile}
                inputFields={inputFields}
                textareaFields = {textareaFields}
                selectFields={selectFields}
                routes = {routes}
                itemName="book"
            />
        )
    }
}

export default CreateBook;