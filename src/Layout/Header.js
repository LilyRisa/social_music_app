import { useState, useLayoutEffect, memo } from "react";
import {AxiosClient} from '../Helper';
import React from 'react';
import { Container, Row, Navbar, Nav} from 'react-bootstrap';
import { Link} from "react-router-dom";
import {SearchOutlined} from '@ant-design/icons'

const Header = () => {

    const [category, setCategory] = useState([]);
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        AxiosClient.get('/category?ls=parent')
        .then(res=>{
            const cate = res.data;
            setCategory(cate.data);
        })
         return () => {
             
         };
     }, []);
    const updateInput = (e) => {
        setInput(e.target.value)
    }
    const search = (e) => {
        // setInput(e.target.value)
    }
    if(category.length > 0){
        return (
        <Container className=" bg-light font-weight-bold">
        <div className="d-flex">
            <Navbar expand="lg">
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    {category && category.map((item) => <Nav.Link key={item.id}><Link to={`/category/${item.id}`}>{item.category}</Link></Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="ml-auto d-flex align-items-center">
                <input type="text" name="name" className="form-control" onChange={updateInput}/>
            </div>
            <div className="px-3 d-flex align-items-center cursor" onClick={search}>
                <SearchOutlined className="icon-sm p-2 bg-dark text-white rounded" />
            </div>
        </div>
    </Container>
    )
    }else{
        return (
            <div className="loading bg-light d-flex align-items-center justify-content-center">
                <img src="/images/loading.svg" className="img-fluid"></img>
            </div>
    )
    }

}

export default memo(Header)