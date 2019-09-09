import FilterContainer from './FilterContainer';
import SingleBook from './SingleBook';
import React, { Component } from 'react'
import {CSSTransition} from 'react-transition-group';

class Books extends Component {

    constructor(){
        super();

    }

    render() {

        let noElementsAvailableStyle = {
            textAlign: 'center',
            fontSize: '30px',
            color: '#333',
            opacity: '.6',
            paddingTop: '30px'
        }

        let pStyle = {fontWeight: '700' , marginLeft: '20px', 'opacity': '0.7'};
        let pTag = this.props.categories.length < 1 ?  <p></p> : <p style={pStyle}>Active filters: </p>;

        let categories = [];
        for ( let i = 0;i<this.props.categories.length;i++) {
            categories[this.props.categories[i].id] = this.props.categories[i].name;
        }

        let filteredBooks = this.props.books.map( (item) => {
            return <SingleBook 
                    setIsAvailableState={this.props.setIsAvailableState} 
                    categoryName={ categories[item.category_id] } 
                    setIsLoggedIn={this.props.setIsLoggedIn} 
                    setBuyedItemState={this.props.setBuyedItemState}
                    book={item} 
                    key={item.id}

                    />
        });

        if ( filteredBooks.length < 1 ) {
            filteredBooks = <p style={noElementsAvailableStyle}>We are sorry , there are no books with these filters available :(</p>
        }

        let seeMoreBooks = !this.props.isPaginationMaxed ? <button onClick={this.props.getItemsByCategory}>See more books</button> : null;

        // Not being used yet. It is a loading screen
        let loadingTransition = <CSSTransition
                                    in = {this.props.isNotLoaded}
                                    timeout={1000}
                                    classNames="appear"
                                >
                                    <div class="react-category-lazy-load-container">
                                        <div class="lazy-load">
                                            <div class="lazy-ball"></div>
                                            <div class="lazy-ball"></div>
                                            <div class="lazy-ball"></div>
                                        </div>
                                    </div>
                                </CSSTransition>
        return (
            <div className="content-container" id="filtered-books">
                {pTag}
                <FilterContainer price={this.props.price} removeFilterTag={this.props.removeFilterTag.bind(this)} categories={this.props.categories} />
                <div className="book-container" id="book-container-products-by-filter">
                         {filteredBooks}
                </div>
                <div className="items-by-category-see-more">
                    {seeMoreBooks}
                </div>
            </div>
        );
    }
}

export default Books;