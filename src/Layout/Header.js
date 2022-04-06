import { useState, useEffect, memo } from "react";
import axios from 'axios';
import React from 'react';
import { Container, Row} from 'react-bootstrap';
import { Link} from "react-router-dom";

const Header = () => {

    const [category, setCategory] = useState([]);

     useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/category?ls=parent`)
        .then(res=>{
            const cate = res.data;
            setCategory(cate.data);
        })
         return () => {
             
         };
     }, []);
    return (
        <Container>
            <Row>
                <ul className='d-flex list-menu font-weight-bold bg-light p-4 justify-content-between'>
                    <li className=''><Link to="/"  className='text-decoration-none font-weight-bold'>
                        Home
                    </Link></li>
                {category && category.map((item) => <li className='' key={item.id}><Link to={`/category/${item.id}`}>{item.category}</Link></li>)}
                </ul>
            </Row>
        </Container>
    );
}

export default memo(Header)