/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import {CSSTransition} from 'react-transition-group';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


import Books from './components/books/Books';
import Navbar from './components/Navbar';
import Warning from './components/Warning';

class App extends Component {
    constructor(){
        super();
        this.state = {
             books : [],
             categories : [],
             filtered_books : [],
             filtered_categories : [],
             maxPrice : 50,
             orientation : 'ASC',
             orderBy : 'Price',
             buyedItem : false,
             isLoggedIn : false,
             pagination: 0,
             isPaginationMaxed: false,
             isNotLoaded: false,
             isAvailable: false
        }
    }

    componentDidMount() {
        
        let startingCatId = parseInt( document.getElementById('category_id').value );
        let api_books_url = '../../getBooksByCategory/';
        // Retrieve all books from database
        axios.post( api_books_url , { 
            'categories' : [startingCatId] ,
            'pagination' : this.state.pagination ,
        }).
        then( res => {
            const books = res.data;

            this.setState({books : books},()=>{
                if(startingCatId != -1) {
                    let filtered_books = books.filter(function(item){
                        return ( startingCatId == item.category_id );
                    });
                    this.setState({ filtered_books : filtered_books},()=>{
                        this.getItemsByCategory();
                    });
                }
                else {
                    this.setState({ filtered_books : books });
                }
            });

        });

        // Retrieve all categories from database
        let api_categories_url = '../../api/categories';
        axios.get( api_categories_url ).
        then( res => {
            const categories = res.data;
            this.setState({ categories : categories},()=>{
                if(startingCatId!=-1) {
                    //console.log(categories);
                    let filtered_categories = categories.filter(function(item){
                        return  ( item.id == startingCatId );
                    });
                    console.log( filtered_categories );
                    this.setState({ filtered_categories :filtered_categories },()=>{
                        this.getItemsByCategory();
                    });
                }
                else {
                    this.setState({ filtered_categories : categories },()=>{
                        //this.getItemsByCategory();
                    });
                }
            });
        });

    }
    
    setPrice(e) {
        this.setState({ maxPrice : e.target.value },()=>{
            this.filterByCatAndPrice();
        });
    }
    setOrder(e) {
        this.setState({orderBy : e.target.value},()=>{
            this.filterByCatAndPrice();
        });
    }
    setOrientation(e) {
        this.setState({orientation : e.target.value},()=>{
            this.filterByCatAndPrice();
        });
    }

    setCategories(e) {

        let filtered_categories = this.state.filtered_categories;
        let filtered_categories_ids = filtered_categories.map(function(item){
            return item.id;
        });

        if( e.target.checked == false && filtered_categories_ids.length > 1 ) {
            filtered_categories_ids = filtered_categories_ids.filter(function(item){
                return ( e.target.getAttribute('data-key') != item );
            });
        }
        else {
            filtered_categories_ids.push( parseInt( e.target.getAttribute('data-key') ) );
        }

        filtered_categories = this.state.categories.filter(function(item){
            return filtered_categories_ids.includes( item.id );
        });

        this.setState({pagination : 0},()=>{
            this.setState({filtered_categories : filtered_categories},()=>{
                this.setState({isNotLoaded : !this.state.isNotLoaded},()=>{
                    setTimeout(()=>{
                        this.setState({isNotLoaded : !this.state.isNotLoaded});
                        this.getItemsByCategory();
                    },900);
                });
            });
        });


    }

    /* 
     * Filters books by Price or Title.
     */
    filterByCatAndPrice() {
            //let selectedCategories = document.getElementsByName('category');

            let new_books = [];
            
            let filtered_categories_ids = this.state.filtered_categories.map(function(item){
                return item.id;
            });
    
            for(let i=0;i<this.state.books.length;i++){
                if ( filtered_categories_ids.includes( this.state.books[i].category_id ) && (this.state.maxPrice > this.state.books[i].price ) ) {
                    new_books.push(this.state.books[i]);
                }
            }
    
    
            if( this.state.orderBy == 'Price' && this.state.orientation == 'ASC' ) {
                new_books.sort((a, b) => (a.price > b.price) ? 1 : -1);
            }
            else if( this.state.orderBy == 'Title' && this.state.orientation == 'ASC' ) {
                new_books.sort((a, b) => (a.title > b.title) ? 1 : -1);
            }
            else if( this.state.orderBy == 'Price' && this.state.orientation == 'DESC' ) {
                new_books.sort((a, b) => (a.price < b.price) ? 1 : -1);
            }
            else if( this.state.orderBy == 'Title' && this.state.orientation == 'DESC' ) {
                new_books.sort((a, b) => (a.title < b.title) ? 1 : -1);
            }
            
            this.setState({ filtered_books : new_books });
    }

    /*
     * When removing a filter tag this sets the pagination to 0
     * and filters items again
     */
    removeFilterTag(e) {
        let filtered_categories = this.state.filtered_categories;
        let filtered_categories_ids = filtered_categories.map(function(item){
            return item.id;
        });

        if( filtered_categories_ids.length > 1 ){
            filtered_categories_ids = filtered_categories_ids.filter(function(item){
                return ( e.target.getAttribute('data-key') != item );
            });
    
            filtered_categories = this.state.categories.filter(function(item){
                return filtered_categories_ids.includes( item.id );
            });
    
            this.setState({pagination : 0},()=>{
                this.setState({filtered_categories : filtered_categories},()=>{
                    this.getItemsByCategory();
                });
            });
        }
    }

    /*
     * We visit the database here by current active categories and 
     * change the state of pagination ,filtered books and books 
     */
    getItemsByCategory() {

        let filtered_categories_ids = this.state.filtered_categories.map(function(item){
            return item.id;
        });
        let api_books_url = '../../getBooksByCategory';

        // Retrieve all books from database
        axios.post( api_books_url , { 
            'categories' : filtered_categories_ids ,
            'pagination' : this.state.pagination ,
        }).
        then( res => {
            let books = [];
            if( this.state.pagination != 0 ) {
                books = this.state.books;
            }
            let paginationNum = this.state.pagination + 1;
            books.push(...res.data);

            this.setState({ pagination : paginationNum , books : books , filtered_books : books },()=>{
                this.filterByCatAndPrice();
            });
        });
    }

    setBuyedItemState() {
        this.setState({ buyedItem : !this.state.buyedItem });
    }

    setIsLoggedIn() {
        this.setState({ isLoggedIn : !this.state.isLoggedIn });
    }
    
    setIsAvailableState() {
        this.setState({ isAvailable : !this.state.isAvailable });
    }

    render() {
        return (
            <div>
                <CSSTransition
                    in = {this.state.buyedItem}
                    timeout={1000}
                    classNames="list"
                    
                >
                    <Warning content="Your item has been added to the cart" classes="confirm-purchase"/>
                </CSSTransition>
                <CSSTransition
                    in = {this.state.isLoggedIn}
                    timeout={1000}
                    classNames="list"
                >
                    <Warning content="You need to be logged in to do this" classes="warning-react"/>
                </CSSTransition>
                <CSSTransition
                    in = {this.state.isAvailable}
                    timeout={1000}
                    classNames="list"
                >
                    <Warning content="There are no items left" classes="warning-react"/>
                </CSSTransition>
                <Navbar 
                    setOrder={this.setOrder.bind(this)} 
                    setOrientation={this.setOrientation.bind(this)} 
                    orientation={this.state.orientation}
                    orderBy={this.state.orderBy}
                    setPrice={this.setPrice.bind(this)} 
                    setCategories={this.setCategories.bind(this)}
                    price={this.state.maxPrice}
                    filteredCat = {this.state.filtered_categories}
                    categories={this.state.categories} 
                    filterByCat={this.filterByCatAndPrice.bind(this)}
                />
                <Books
                    isPaginationMaxed={this.state.isPaginationMaxed}
                    getItemsByCategory={this.getItemsByCategory.bind(this)}
                    setBuyedItemState={this.setBuyedItemState.bind(this)} 
                    isNotLoaded={this.state.isNotLoaded}
                    setIsLoggedIn={this.setIsLoggedIn.bind(this)}
                    setIsAvailableState={this.setIsAvailableState.bind(this)}
                    price={this.state.maxPrice} 
                    removeFilterTag={this.removeFilterTag.bind(this)} 
                    categories={this.state.filtered_categories} 
                    books={this.state.filtered_books} 
                />
            </div>
        ); 
    }
}

ReactDOM.render(
    <App />
  ,
  document.getElementById('products-by-filter')
);
