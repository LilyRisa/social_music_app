
import {Header} from '../Layout'
import React, {useEffect, useState, useRef} from "react";
import {AxiosClient} from '../Helper';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { Navigate } from 'react-router-dom';

const uploadVideo = async (file)=>{
    const formData = new FormData();
    formData.append('file', file)
    const {data} = await AxiosClient.post('/upload', formData);
    console.log(data);
    return data
}

const uploadPost = async (data_s)=>{
    console.log(data_s)
    const formData = new FormData();
    for ( var key in data_s ) {
        formData.append(key, data_s[key]);
    }
    const {data} = await AxiosClient.post('/post/upload_post', formData);
    console.log(data);
    return data
}

const Upload = ()=>{

    const [category, setCategory] = useState([])
    const [cate, setCate] = useState(null)
    const [title, setTitle] = useState(null)
    const [keyword, setKeyword] = useState(null)
    const [description, setDescription] = useState(null)
    const [thumb, setThumb] = useState(null)
    const [type, setType] = useState(null)
    const [Video, setVideo] = useState(null)
    const [Videopre, setVideoPreview] = useState(null)
    const [content, setContent] = useState(null)
    const editor = useRef();


    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
        setContent(sunEditor.getContents())

    };

    const handleCategory= (e) =>{
        console.log(e.target.value);
        setCate(e.target.value)
    }
    const handleTitle = (e) =>{
        setTitle(e.target.value)
    }
    const handleKeyword = (e) =>{
        setKeyword(e.target.value)
    }
    const handleDescription = (e) =>{
        setDescription(e.target.value)
    }
    const handleThumb = (e) =>{
        setThumb(e.target.files[0])
    }
    const handleVideo = (e) =>{
        console.log('upload...');
        uploadVideo(e.target.files[0]).then((resp)=>{
            setVideoPreview(resp.data)
            setVideo(resp.data.id)
        })
        
    }
    const handleType = (e) =>{
        setType(e.target.value)
    }
    const handleSubmit = (e) =>{
        console.log('upload post ....');
        const data = {}
        data.category_primary_id = cate
        data.title = title
        data.keyword = keyword
        data.thumb = thumb
        data.type_asset = type
        data.content = content
        data.asset_id = Video
        data.description = description
        console.log(data);
        uploadPost(data).then((resp)=>{
            console.log('success');
            console.log(resp);
            if(resp.status){
                return <Navigate to='/'/>
            }
        })
    }
    

    useEffect(()=>{
        (async () => {
            const {data} = await AxiosClient.get('/category?ls=parent')
            setCategory(data.data)
        })()
    },[])

     return (
         <div>
             <Header/>
             <div className='container mt-4 bg-light p-3'>
                 <div className=''>Upload post</div>
                <div>
                    <div className='form-group'>
                        <label>Primary category</label>
                        <select className='form-control' onChange={handleCategory}>
                            {category && category.map(item => {
                                return <option key={item.id} value={item.id}  style={{background : item.thumb_url}}> {item.category}</option>
                            })}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Title</label>
                        <input className='form-control' onChange={handleTitle}/>
                    </div>
                    <div className='form-group'>
                        <label>keyword</label>
                        <input className='form-control' onChange={handleKeyword} />
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea className='form-control' onChange={handleDescription}/>
                    </div>
                    <div className='form-group'>
                        <label>Thumb</label>
                        <input type='file' className='form-control' onChange={handleThumb} />
                    </div>
                    
                    <div className='form-group'>
                        <label>Type</label>
                        <select className='form-control' onChange={handleType}>
                            <option value="music">Music</option>
                            <option value="video">video</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Video or audio</label>
                        <input type='file' className='form-control' onChange={handleVideo} />
                        
                        {Videopre && <div>preview<video controls>
                                <source src={Videopre.url} type={Videopre.type_ext} />
                            </video></div>}
                    </div>

                    <div className='form-control'>
                        <label>Content</label>
                        <SunEditor getSunEditorInstance={getSunEditorInstance} />
                    </div>
                    <div className='form-group'>
                        <button onClick={handleSubmit} >Submit</button>
                    </div>

                </div>
             </div>
         </div>
     );

}

export default Upload