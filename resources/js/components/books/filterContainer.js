import React, { Component } from 'react'

class FilterContainer extends Component {
    constructor(){
        super();
    }

    render() {

        let that = this;
        let lastItemId = 0;
        let filter_tags = this.props.categories.map(function(item){
            lastItemId = item.id;
            return <span onClick={that.props.removeFilterTag} data-key={item.id} className="filter" key={item.id}><p  onClick={that.props.removeFilterTag} key={item.id} data-key={item.id}>category : {item.name}</p></span>
        });
        filter_tags.push( <span key={lastItemId+1} className="filter"><p>Price : {this.props.price}$</p></span> );

        return (
            <div className="filter-container">
                {filter_tags}
            </div>
        );
    }
}

export default FilterContainer;