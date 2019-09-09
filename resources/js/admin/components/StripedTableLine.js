import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt , faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";

class StripedTableLine extends Component {
    constructor(props) {
        super(props);
    }

    onClickHandler(e) {
        this.props.deleteCategory( e.currentTarget.getAttribute('data-id') );
    }

    createOffset() {
        let scrollto = document.getElementById(this.props.categoryNameId).offsetHeight;
        let doc = document.documentElement;
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        let i = top;
        let smoothScroll = setInterval(()=>{
            if( i < scrollto + 150 ) {
                if( i < top + 150 ) {
                    i+=30;
                }
                else if( i > scrollto ) {
                    i+=5;
                }
                else {
                    i+=15;
                }
                window.scrollTo(0,i);
            }
            else {
                clearInterval( smoothScroll );
            }
        },1);
    }

    render() {

        let pen = <FontAwesomeIcon icon={faPenAlt} />
        let trash = <FontAwesomeIcon icon={faTrashAlt} />
        let rowId = 'b' + this.props.category.id;

        let that = this;
        let td = this.props.tableData.map((header,i) => {
            return <td key={i}>{that.props.category[header]}</td>
        });

        let update = this.props.update + this.props.category.id;

        return(
            <tr id={rowId}>
                <td>{this.props.category.id}</td>
                {td}
                <td colSpan="2">
                    <Link onClick={this.createOffset.bind(this)} to={update}><Button className="ml-3 mt-3"  variant="outline-primary">{pen}</Button></Link>
                    <Button data-id={this.props.category.id} onClick={this.onClickHandler.bind(this)} className="ml-3 mt-3" variant="outline-danger">{trash}</Button>
                </td>
            </tr>
        )
    }
}

export default StripedTableLine;