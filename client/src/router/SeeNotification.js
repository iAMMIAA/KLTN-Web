import React, { useEffect, useState } from 'react';
import './css/SeeNotification.css';
import {Avatar} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose} from '@fortawesome/free-solid-svg-icons';
import { layer } from '@fortawesome/fontawesome-svg-core';
import { useDarkMode } from './DarkModeContext';

function SeeNotification(props){
    const {darkMode} = useDarkMode();

    return(
        <div className={`see_notification`} onClick={props.closeSeeNotification}>
            <div className={`form_status ${darkMode ? 'dark_mode':''}`}>
                <div className={`content_status ${darkMode ? 'dark_mode':''}`}>
                    <Avatar alt={props.data?.[0]?.createrContent || ''} src={props.data?.[0]?.createrContent || ''}/>                    
                    <div className='container_status'>
                        <div className='createrContent' style={{fontWeight: 'bold'}}>{props.data.length > 0 && props.data[0].createrContent}</div>
                        <div className='content'>{props.data.length > 0 && props.data[0].content}</div>
                    </div>
                </div>
                <div className='comment_status'>
                {props.data
                    .slice() // Tạo một bản sao của mảng để không làm thay đổi mảng gốc
                    .sort((a, b) => (a.idComment === props.idCmt ? -1 : b.idComment === props.idCmt ? 1 : 0)) // Sắp xếp để idComment === props.idCmt lên đầu
                    .map(post => (
                    <div className={`item_comment ${post.idComment === props.idCmt ? 'gray' : ''} ${darkMode ? 'dark_mode':''}`} key={post.idComment}>
                        <Avatar alt={post.userComment || ''} src={post.userComment || ''}></Avatar>
                        <div className='container_comment'>
                            <div className='nameUserComment' style={{fontWeight: 'bold'}}>{post.userComment}</div>
                            <div className='contentComment'>{post.contentComment}</div>
                        </div>
                    </div>
                    ))}
                </div>
                {/* <div className='comment_status'>
                    {props.data.map(post => (
                        // <div className='item_comment' >
                        <div className={`item_comment ${post.idComment === props.idCmt ? 'gray': ''}`} >
                            <div className='nameUserComment'>{post.userComment}</div>
                            <div className='contentComment'>{post.contentComment}</div>
                        </div>
                    ))}
                    
                </div> */}
            </div>          
        </div>
       
    );
}

export default SeeNotification
