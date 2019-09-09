/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('../bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import AllBooksTable from './components/books/index';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BookUpdate from './components/books/BookUpdate'
import Menu from './components/Menu'; 
import CreateBook from './components/books/CreateBook';
import AllCategoriesTable from './components/categories/index';
import CategoryUpdate from './components/categories/CategoryUpdate';
import CreateCategory from './components/categories/CreateCategory';
import AllAuthorsTable from './components/authors/index';
import AuthorUpdate from './components/authors/AuthorUpdate';
import AuthorCreate from './components/authors/CreateAuthor';
import AllCitiesTable from './components/cities/index';
import CityUpdate from './components/cities/CityUpdate';
import CityCreate from './components/cities/CreateCity';
import AllRegionsTable from './components/regions/index';
import RegionUpdate from './components/regions/RegionUpdate';
import RegionCreate from './components/regions/CreateRegion';
var hashHistory = require('react-router').hashHistory;


class App extends Component { 
    render() {

        let colDimensions = { span: 10 , offset: 2 };

        return(
            <Router history={hashHistory}>
                <Row noGutters="true">
                    <Menu />
                    <Col sm={colDimensions} md={colDimensions} lg={colDimensions} xl={colDimensions}>
                        <div style={{marginLeft:'5%',marginRight:'5%'}}>
                                <Route path="/admin/categories" component={AllCategoriesTable}/>
                                <Route exact path="/admin/categories/update/:id" component={CategoryUpdate} />
                                <Route exact path="/admin/categories/create" component={CreateCategory} />

                                <Route path="/admin/books" component={AllBooksTable} />
                                <Route exact path="/admin/books/update/:id" component={BookUpdate} />
                                <Route exact path="/admin/books/create" component={CreateBook}/>

                                <Route path="/admin/authors" component={AllAuthorsTable} />
                                <Route exact path="/admin/authors/update/:id" component={AuthorUpdate} />
                                <Route exact path="/admin/authors/create" component={AuthorCreate} />

                                <Route path="/admin/cities" component={AllCitiesTable} />
                                <Route exact path="/admin/cities/update/:id" component={CityUpdate} />
                                <Route exact path="/admin/cities/create" component={CityCreate} />

                                <Route path="/admin/regions" component={AllRegionsTable} />
                                <Route exact path="/admin/regions/update/:id" component={RegionUpdate} />
                                <Route exact path="/admin/regions/create" component={RegionCreate} />
                        </div>
                    </Col>
                </Row>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />
  ,
  document.getElementById('admin-app')
);