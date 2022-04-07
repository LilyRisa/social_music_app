import { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Container, Row} from 'react-bootstrap';
import { Link} from "react-router-dom";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import ReactDOM from 'react-dom'
import {PlayCircleOutlined, PauseCircleOutlined, ClockCircleOutlined} from '@ant-design/icons'
import '../css/_listPost.css'


const customDownloader = (downloadInfo) => {
    console.log(downloadInfo);
    const newWindow = window.open(downloadInfo.src, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const onAudioPlayTrackChange = (currentPlayId,audioLists,audioInfo) =>{
      console.log(currentPlayId);
      console.log(audioLists);
      console.log(audioInfo);

  }
const initial = [];

const ListPost = ({data}) => {

    const [audioLists, setAudioLists] = useState(initial)
    const [id, setId] = useState()

    useLayoutEffect(() => {
        setAudioLists(initial);
        let arr = [];
        data.map(item=>{
            arr.push({
                musicSrc: item.video.url,
                name: item.title,
                cover: item.thumb_url,
                ...item
            })
            
        })
        setAudioLists(arr);
    },[JSON.stringify(data)])

    const PlayTrackChange = (id) =>{
        console.log(id);
        setId(id)
    }
    const checkIDlistAudio = (index)=>{
        setId(index)
    }
    return (
        <Container>
            <Row>
                {audioLists.length > 0 && audioLists.map((item, i) => {
                    return <div  key={i} className="bg-light md-12 my-3 pb-3 pb-lg-0 shadow rounded">
                        <a className="cursor row" onClick={() => {PlayTrackChange(i)}}>
                            <div className="col-12 col-lg-3 px-0">
                                <img src={item.thumb_url} className="img-fluid thumb"/>
                            </div>
                            <div className="col-12 col-lg-7 px-4">
                                <h3 className="my-2">{item.name}</h3>
                                <p className="text-gray-3 overflow-hidden" dangerouslySetInnerHTML={{ __html: item.description }} ></p>
                                <p className="text-gray-2 text-right py-2 d-flex justify-content-end align-items-center"><ClockCircleOutlined className="d-inline-block px-2" /> {item.created_at}</p>
                            </div> 
                            <div key={i} className="text-warning col-12 col-lg-2 ml-auto bg-dark d-flex justify-content-center align-items-center">
                                {i === id && <PauseCircleOutlined className="icon" />}
                                {i !== id && <PlayCircleOutlined className="icon" />}
                                
                            </div>
                        </a>
                    </div>
                })}
                
            </Row>
            {console.log(audioLists)}

            {audioLists.length > 0 && 
                <ReactJkMusicPlayer
                    key={JSON.stringify(audioLists)}
                    className="background-none"
                    autoPlay={true}
                    preload={true}
                    mode="full"
                    theme='light'
                    audioLists={audioLists}
                    playIndex={id}
                    onPlayIndexChange={checkIDlistAudio}
                    customDownloader={customDownloader}
                    />}
            
        </Container>
    );
}

export default ListPost