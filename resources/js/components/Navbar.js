import React, { Component } from 'react'

class Navbar extends Component {

    constructor(){
        super();
    }

    componentDidMount() {

    }

    render() {
        var that = this;
        let filtered_category_ids = this.props.filteredCat.map(function(item){
            return item.id;
        });
        let category_tags = this.props.categories.map(function(item){
            let checked = filtered_category_ids.includes( item.id ) ? 'checked' : '';
            return <li key={item.id}> <input onChange={ that.props.setCategories.bind(this) } data-key={item.id} type="checkbox" name="category" key={item.id} checked={checked}/>{item.name}</li>
        });
 
        return (
            <div className="navbar-container">
                <nav>
                    <p>Filters</p>
                    <p>Categories</p>
                    <ul>
                        {category_tags}
                        <p>Maximum price</p>
                        <li><input type="range" min="5" onChange={this.props.setPrice.bind(this)} max="50" name="price" id="price" value={this.props.price} style={{width : '100px'}} /></li>
                        <li className="max-price"><span id="max-price">{this.props.price}$</span></li>
                        <p>Order By</p>
                        <li>
                            <input onChange={this.props.setOrder.bind(this)} type="radio" name="order" value="Price" checked={this.props.orderBy == 'Price'}/>Price
                            <input onChange={this.props.setOrder.bind(this)} style={{marginLeft: '14px'}} type="radio" name="order" value="Title" checked={this.props.orderBy == 'Title'}/>Title
                        </li>
                        <p style={{marginTop: '10px'}}>Direction</p>
                        <li>
                            <input onChange={this.props.setOrientation.bind(this)}  type="radio" name="direction" value="ASC" checked={this.props.orientation == 'ASC' || this.props.orientation == 'ASC_1'}/>Asc
                            <input onChange={this.props.setOrientation.bind(this)} style={{marginLeft: '14px'}} type="radio" name="direction" value="DESC" checked={this.props.orientation == 'DESC'}/>Desc
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;