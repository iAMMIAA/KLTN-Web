import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart } from '@fortawesome/free-regular-svg-icons';

function Post({ avatar, userName, time, description, likes, comments, openComment }) {
    return (
        <div className='post'>
            <div className='post-content'>
                <div className="post-user">
                    <div className='post-user-avatar'>
                        <img src={avatar} className='img' alt={`Avatar của ${userName}`}/>
                    </div>
                    <div className='post-user-info'>
                        <div className='post-user-name'>{userName}</div>
                        <div className='post-user-time'>{time}</div>
                    </div>
                </div>
                <div className="post-description">{description}</div>
                <div className='post-summary'>
                    <div className="like">{likes} lượt thích</div>
                    <div className="comment">{comments} bình luận</div>
                </div>
            </div>
            <div className='post-action'>
                <FontAwesomeIcon icon={faHeart} className='icon'/>
                <FontAwesomeIcon icon={faComment} className='icon' onClick={() => openComment()}/>
                <FontAwesomeIcon icon={faBookmark} className='icon'/>
            </div>
        </div>
    );
}

export default Post;
