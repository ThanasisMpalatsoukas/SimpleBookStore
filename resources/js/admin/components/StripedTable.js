import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown , faCaretUp , faBookOpen } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import StripedTableLine from './StripedTableLine';

class StripedTable extends Component {
    constructor(props) {
        super(props)

        let orderObj = {};
        this.props.tableOrdered.map( (item) => {
            orderObj[item] = 'ASC';
        });

        this.state = {
            pagination: 0,
            paginatedBy: 10,
            model : this.props.model,
            nonPaginatedModel : this.props.model,
            currentOrdering: orderObj,
            firstRender : true
        }

    }
    
    componentDidMount() {
        this.getPaginatedResults();
    }

    createOffset() {
        const scrollto = document.getElementById(this.props.createOffsetHeightId).offsetHeight;
        const doc = document.documentElement;
        const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        let i = top;
        const smoothScroll = setInterval(()=>{
            if( i < scrollto + 150 ) {
                i+=7;
                window.scrollTo(0,i);
            }
            else {
                clearInterval( smoothScroll );
            }
        },1);
    }

    handleClick(event) {
        this.orderBy( event.target.getAttribute('data-header') );
    }

    // Ordering by element.
    // general version
    orderBy( whatToOrderBy ) {

        let filtered_categories = this.state.model;

        this.setState( prevState => {
            let currentOrdering = Object.assign({},prevState.currentOrdering);
            currentOrdering[whatToOrderBy] = prevState.currentOrdering[whatToOrderBy] === 'ASC' ? 'DESC' : 'ASC';
            return { currentOrdering }
        })

        if( this.state.currentOrdering[whatToOrderBy] === 'DESC' ) {
            filtered_categories.sort((a, b) => (a[whatToOrderBy] > b[whatToOrderBy]) ? 1 : -1);
        }
        else {
            filtered_categories.sort((a, b) => (a[whatToOrderBy] < b[whatToOrderBy]) ? 1 : -1);
        }

        this.setState({ model : filtered_categories});

    }

    deleteCategory( category_id ) {
        let result = window.confirm('Do you really want to delete this category?');
        if ( result ) {
            axios.get( this.props.routes.delete+category_id ).then( () =>{
                document.getElementById('b'+category_id).style.display="none";
            });
        }
    }

    getPaginatedResults(event) {

        let datapage = 0;
        if( event != undefined) {
            if( event.target.getAttribute('data-page') != null ) {
                datapage = event.target.getAttribute('data-page');
            }
        }


        axios.post( this.props.routes.paginate , { 
            'pagination' : datapage ,
            'paginateBy' : this.state.paginatedBy,
            'database_search' : this.props.tableTitle,
            'model' : this.state.nonPaginatedModel
        }).
        then( res => {
            this.setState({model : res.data,pagination: datapage})
        });
    }

    changePaginatedBy(event) {
        let paginateBy = 10;
        if( event!= undefined ) {
            paginateBy = event.target.value;
        }
        this.setState({ paginatedBy : paginateBy },()=>{
            this.getPaginatedResults();
        });
    }

    getItemTableLines() {
        const categoriesLength = this.state.model.length;
        return this.state.model.map((category,i) => {
            if( i < categoriesLength - 1 ) {
                return <StripedTableLine tableData={this.props.tableHeaders} update={this.props.routes.update} categoryNameId={this.props.createOffsetHeightId} deleteCategory={this.deleteCategory.bind(this)} key={category.id} category={category} />; 
            }
        });
    }

    getTableHeaders() {
        const that = this;
        return this.props.tableHeaders.map( (header,i) => {
            let caret = this.state.currentOrdering[header.toLowerCase()] === 'ASC' ?
                <FontAwesomeIcon className="ml-3" icon={faCaretDown} /> : <FontAwesomeIcon className="ml-3" icon={faCaretUp} />;
            
            if( this.props.tableOrdered != undefined ) {
                if( this.props.tableOrdered.includes( header ) ) {
                    return <th key={i} className="orderByLink" data-header={header.toLowerCase()} onClick={ event => that.orderBy(event.target.getAttribute('data-header')) }>{header} {caret}</th>
                }
                else {
                    return <th key={i}>{header}</th>
                }
            }
            else {
                return <th key={i}>{header}</th>
            }
        });
    }

    getPaginationNumbers() {
        let paginatedNum = [];
        const pagination = parseInt(this.state.pagination);

        const lastPage = pagination - 1;
        const nextPage = pagination + 1;

        if( pagination > 0 ) {
            paginatedNum.push( <Button key="1" onClick={this.getPaginatedResults.bind(this)} className="mr-3" data-page={lastPage} variant="outline-primary">{lastPage + 1}</Button> )
        }
        paginatedNum.push(<Button key="2" onClick={this.getPaginatedResults.bind(this)} style={{fontWeight:'700'}} data-page={pagination} variant="outline-primary">{pagination + 1}</Button>)

        if( nextPage*this.state.paginatedBy < this.state.model[ this.state.model.length - 1 ] ) {
            paginatedNum.push(<Button key="3" onClick={this.getPaginatedResults.bind(this)} className="ml-3" data-page={nextPage} variant="outline-primary">{nextPage + 1}</Button>);
        }

        return paginatedNum;
    }

    render() {

        let itemTableLines = this.getItemTableLines();

        // Pagination
        let paginatedNum = this.getPaginationNumbers();

        // Table headers
        let thElements = this.getTableHeaders();

        return(
            <div className="all-books mt-5">
            <Row>
                <Col sm="4" lg="4" className="card-info">
                    <div className="large blue text-center">
                        <FontAwesomeIcon className="card-info-book" icon={faBookOpen} />
                        <p>total {this.props.tableTitle} : {this.props.model_count}</p>
                    </div>
                </Col>
            </Row>
            <h1 className="float-left mb-3">ALL {this.props.tableTitle.toUpperCase()}</h1>
            <Link onClick={this.createOffset.bind(this)} to={this.props.routes.create} >
                <Button className="float-right" variant="primary">Create a new entry +</Button>
            </Link>
            <Table striped bordered hover className="mt-4" id={this.props.createOffsetHeightId}>
                <thead>
                    <tr>
                    <th>#</th>
                    { thElements }
                    <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itemTableLines}
                    <tr className="text-center">
                        <td colSpan={this.props.tableHeaders.length+1}>
                            {paginatedNum}
                        </td>
                        <td colSpan="2">paginate by : 
                            <select defaultValue={this.state.paginatedBy} onChange={this.changePaginatedBy.bind(this)}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="40">40</option>
                                <option value="80">80</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
        )
    }
}

export default StripedTable;