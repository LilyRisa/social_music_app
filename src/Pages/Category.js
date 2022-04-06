import React from 'react';
import {useParams} from 'react-router-dom'
import {Header, ListPost} from '../Layout'
import { useState, useEffect } from "react";
import axios from 'axios';

const Category = () =>{
    const { id } = useParams()
    const [category, setCategory] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/post/list_post?category_primary=${id}`)
        .then(res=>{
            const cate = res.data;
            setCategory(cate.data);
        })
     }, [id]);
     console.log(id);
    return (
        <div>
            <Header/>
            {category.length >0 && <ListPost data={category}/>}
        </div>
    )
}

export default Category