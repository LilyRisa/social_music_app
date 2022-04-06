import React from 'react';
import {useParams} from 'react-router-dom'
import {Header, ListPost} from '../Layout'
import { useState, useEffect } from "react";
import {AxiosClient} from '../Helper';

const Category = () =>{
    const { id } = useParams()
    const [category, setCategory] = useState([])

    useEffect(() => {
        AxiosClient.get(`/post/list_post?category_primary=${id}`)
        .then(res=>{
            const cate = res.data;
            setCategory(cate.data);
        })
     }, [id]);
     console.log(id);
    return (
        <div>
            {category.length >0 && <Header/> }
            {category.length >0 && <ListPost data={category}/>}
            {category.length == 0 && <div className="loading bg-light d-flex align-items-center justify-content-center">
                <img src="/images/loading.svg" className="img-fluid"></img>
            </div>}
        </div>
    )
}

export default Category