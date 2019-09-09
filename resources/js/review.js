require('./bootstrap');

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'

import Comment from './components/Comment'
import Rating from './components/Rating'

class App extends Component {

    constructor() {
        super();

        this.state = {
            book : {},
            reviews : [],
            orientation : 'DESC',
            rating : {
                mean : '',
                total : '',
                amountForEach : [],
                percentageForEach : []
            }
        }
        Axios.post('../../reviews',{ 'book_id' : document.getElementById('book_id').value }).then( response => {
            let reviews = response.data['reviews'];
            console.log(reviews);

            let rating = {};
            let totalRating = reviews.map((review)=>{
                return parseFloat(review.rating);
            });

            rating.amountForEach = [0,0,0,0,0];
            rating.percentageForEach = [0,0,0,0,0];

            console.log(rating.amountForEach);

            for(let i = 0;i<reviews.length;i++) {
                if( reviews[i].rating == 1 ) {
                    rating.amountForEach[0]++;
                }
                else if( reviews[i].rating == 2 ) {
                    rating.amountForEach[1]++;
                }
                else if( reviews[i].rating == 3  ) {
                    rating.amountForEach[2]++;
                }
                else if( reviews[i].rating == 4 ) {
                    rating.amountForEach[3]++;
                }
                else {
                    rating.amountForEach[4]++;
                }
            }

            rating.percentageForEach.fill(0,0,5);
            for (let i=0;i<5;i++) {
                rating.percentageForEach[i] = ((rating.amountForEach[i] / reviews.length)*100).toFixed(1);
            }


            totalRating = totalRating.reduce((a,b)=>{
                return a+b;
            });
            rating.mean = (totalRating / reviews.length).toFixed(2);
            rating.total = reviews.length;

            console.log(rating);

            let book = response.data['book'];
            this.setState({book: book,reviews: reviews, rating : rating},function(){
                this.filterItems();
            });
        });
    }

    componentDidMount() {

    }

    filterItems() {
        let reviews = this.state.reviews;
        if( this.state.orientation == 'ASC' ) {
            reviews.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
        }
        else {
            reviews.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
        }

        this.setState({ reviews : reviews });
    }

    changeOrientation(e) {
        let that = this;
        this.setState({ orientation : e.target.value } , function(){
            that.filterItems();
        });
    }

    render() {

        let bookCover = { backgroundImage : 'url(http://127.0.0.1:8000/storage/'+this.state.book.book_image+')' }
        let that = this;

        let comments = this.state.reviews.map(function(review,i){
            let width = review.rating*20;
            return <Comment key={i}  width={width} comment={review.comment} name={that.state.reviews[i].user.name} />;
        });

        let bookUrl = '../../item/'+this.state.book.id;

        let orientation = this.state.orientation;

        return(
            <div className="container">
                <div className="book-card">
                    <div className="book-cover image" style={bookCover} >

                    </div>
                    <h1><a href={bookUrl}>{this.state.book.title}</a></h1>
                    <h2>{this.state.book.price}$</h2>
                    <button class="add-item" id="add-item">Add to cart</button>
                </div>
                <Rating rating={this.state.rating}/>
                <div className="single-review-container">
                    <p className="filter-by">Filter by ratings: </p>
                    <select class="ratings" name="ratings" id="ratings">
                        <option value="ASC" onClick={this.changeOrientation.bind(this)} selected={orientation == 'ASC' }>ASC</option>
                        <option value="DESC" onClick={this.changeOrientation.bind(this)} selected={orientation == 'DESC' }>DESC</option>
                    </select>
                </div>
                {comments}
            </div>
        )
    }
}

ReactDOM.render(
    <App />
  ,
  document.getElementById('reviews')
);