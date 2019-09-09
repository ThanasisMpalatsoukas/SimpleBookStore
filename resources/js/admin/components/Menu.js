
import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { faChartLine , faShoppingCart , faBook , faUser , faCaretDown } from '@fortawesome/free-solid-svg-icons'

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            linksDisplay : {
                link1 : false,
                link2 : false,
                link3 : false
            }
        }
    }

    toggleLinkDisplay() {
        const clickedLink = event.target.getAttribute('data-el');

        // Toggle the linksDisplay
        this.setState((prevState) => {
            let linksDisplay = Object.assign({}, prevState.linksDisplay);
            linksDisplay[clickedLink] = !linksDisplay[clickedLink];
            return {linksDisplay};
        });
    }  

    render() {
        let menuContainer = {
            height: '100vh',
            overflowY: 'none',
            backgroundImage: 'url(http://127.0.0.1:8000/storage/admin-bg.jpg)',
            boxShadow: '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
        }
    
        const dashboardIcon = <FontAwesomeIcon className="mr-3" icon={faChartLine} />
        const shoppingCartIcon = <FontAwesomeIcon className="mr-3" icon={faShoppingCart} />
        const bookIcon = <FontAwesomeIcon className="mr-3" icon={faBook} />
        const profileIcon = <FontAwesomeIcon className="mr-3" icon={faUser} />
        const caret = <FontAwesomeIcon className="ml-3" icon={faCaretDown} />

        const avatarSrc = 'http://127.0.0.1:8000/storage/avatar50x50.jpg'

        let linkDisplay = [];
        linkDisplay[0] = this.state.linksDisplay.link1 ? {display : 'block'} : {display : 'none'};
        linkDisplay[1] = this.state.linksDisplay.link2 ? {display : 'block'} : {display : 'none'};
        linkDisplay[2] = this.state.linksDisplay.link3 ? {display : 'block'} : {display : 'none'};

        return(
            <Col md={2} lg={2} xl={2} sm={2} style={{position:'fixed'}}>
                <div className="image menu-container" style={menuContainer}>
                    <Nav defaultActiveKey="/home" className="flex-column pt-5 ml-3 mr-3" style={{borderBottom:'1px solid #fff'}}>
                        <Row className="ml-1 mr-1 pb-3" style={{borderBottom:'1px solid #fff'}}>
                            <Col sm={3}>
                                <Image src={avatarSrc} roundedCircle />
                            </Col>
                            <Col sm={9} className="text-center" style={{color: '#ffffff',marginTop:'14px'}}>
                                Than. Bal
                                    <NavDropdown title="" id="nav-dropdown" style={{marginTop:'-18px'}} className="float-right">
                                        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                
                            </Col>
                        </Row>
                        <Container style={{width:'70%'}}>
                            <Nav.Link eventKey="link-1" style={{marginTop:'40px'}}>{dashboardIcon}Dashboard</Nav.Link>
                            <Nav.Link eventKey="link-2" data-el='link1' onClick={this.toggleLinkDisplay.bind(this)}>{shoppingCartIcon}Orders{caret}</Nav.Link>
                            <div id="link-1" style={linkDisplay[0]}>
                                <Nav.Link eventKey="link-5">View</Nav.Link>
                            </div>
                            <Nav.Link eventKey="link-3" onClick={this.toggleLinkDisplay.bind(this)} data-el="link2" >{bookIcon}Books{caret}</Nav.Link>
                            <div id="link-3" style={linkDisplay[1]}>
                                <Link to="books" action="replace">All books</Link><br />
                                <Link to="categories" action="replace">All categories</Link><br />
                                <Link to="authors" action="replace">All authors</Link>
                            </div>
                            <Nav.Link eventKey="link-4" data-el="link3" onClick={this.toggleLinkDisplay.bind(this)} >{profileIcon}User{caret}</Nav.Link>
                            <div id="link-4" style={linkDisplay[2]}>
                                <Link to="cities" action="replace">All cities</Link><br />
                                <Link to="regions" action="replace">All regions</Link><br />
                            </div>
                        </Container>
                    </Nav>
                </div>
            </Col>
        )
    }
}
export default Menu

