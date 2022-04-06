import { useState, useEffect } from "react";
import axios from 'axios';
import React from 'react';
import { Container, Row, col} from 'react-bootstrap';
import { Link} from "react-router-dom";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import ReactDOM from 'react-dom'

const customDownloader = (downloadInfo) => {
    const link = document.createElement('a')
    link.href = downloadInfo.src 
    link.download = downloadInfo.filename || 'test'
    document.body.appendChild(link)
    link.click()
  }
  const onAudioPlayTrackChange = (currentPlayId,audioLists,audioInfo) =>{
      console.log(currentPlayId);
      console.log(audioLists);
      console.log(audioInfo);

  }

const ListPost = ({data}) => {

    const [audioLists, setAudioLists] = useState([])
    const [id, setId] = useState([])


    useEffect(() => {
        let arr = [];
        data.map(item=>{
            arr.push({
                musicSrc: item.video.url,
                name: item.title,
                cover: item.thumb
            })
            
        })
        setAudioLists([...arr]);
    },[JSON.stringify(data)])

    const PlayTrackChange = (id) =>{
        setId(id)
      }

    return (
        <Container>
            <Row>
                {data && data.map(item => {
                    return <div  key={item.id} className="bg-light md-12 my-3">
                        <a className="cursor" onClick={() => PlayTrackChange(item.id)}>
                            <h3 className="my-2">{item.title}</h3>
                        </a>
                    </div>
                })}
                
            </Row>
            {console.log(audioLists)}
            {audioLists.length > 0 && 
// @ts-ignore

            <ReactJkMusicPlayer
                // @ts-ignore
                className="background-none"
                autoPlay={true}
                preload={true}
                mode="full"
                theme='light'
                audioLists={audioLists}
                // @ts-ignore
                playIndex={id}
                customDownloader={customDownloader}
                />}
            
        </Container>
    );
}

export default ListPost