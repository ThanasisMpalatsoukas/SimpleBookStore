import React, { Component } from 'react'

class SingleBook extends Component {

    constructor(){
        super();
    }

    buyItem(e) {

        var xmlhttp;

        let url = 'http://127.0.0.1:8000/ajaxRequestItem';

        xmlhttp = new XMLHttpRequest();

        let that = this;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log( parseInt( xmlhttp.responseText ) );
                let response = parseInt( xmlhttp.responseText );
                if( response == 2 ) {
                    that.props.setIsLoggedIn();
                    setTimeout(() => {
                        that.props.setIsLoggedIn();
                    },1000);
                }
                else if( response == 3 ) {
                    that.props.setIsAvailableState();
                    setTimeout(() => {
                        that.props.setIsAvailableState();
                    },1000);
                }
                else {
                    that.props.setBuyedItemState();
                    setTimeout(()=>{
                        that.props.setBuyedItemState();
                        console.log(xmlhttp.responseText);
                        if ( xmlhttp.responseText == 0 ) {
                            let amountOfItems = parseInt(document.getElementById('amount-of-items').innerHTML);
                            console.log(xmlhttp.amountOfItems);
                            if( amountOfItems == '' ){
                                amountOfItems = 0;
                            }
                            document.getElementById('amount-of-items').innerHTML = amountOfItems + 1;
                        }
                    },1000);
                }
            }
        }

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.setRequestHeader("X-CSRF-TOKEN", document.getElementsByName('csrf-token')[0].getAttribute('content'));
        xmlhttp.send(JSON.stringify({id : this.props.book.id})); 

    }

    render() {

        let bookCover = {
            backgroundImage : 'url(http://127.0.0.1:8000/storage/'+this.props.book.book_image+')'
        }

        let cartIcon = {
            backgroundImage : 'url(http://127.0.0.1:8000/storage/cart.png)'
        }

        return(
            <div className="single-book">
                <a href={"/item/"+this.props.book.id}>
                    <div className="book image" style={bookCover}>
                        <div className="buy-option">
                            <div className="cart-icon image" style={cartIcon}>
                                <div className="red-circle">
                                    <p>+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                    <div className="details">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{this.props.book.title}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.categoryName}</td>
                                </tr>
                                <tr>
                                    <td>Available : {this.props.book.amount_available}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.book.price}$</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="add-cart-container">
                            <button onClick={this.buyItem.bind(this)} className="add-item" data-key={this.props.book.id} key={this.props.book.id}>Add to cart</button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default SingleBook;