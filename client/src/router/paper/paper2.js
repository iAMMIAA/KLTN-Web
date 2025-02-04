import axios from 'axios';
import './paper2.css';
import { useState, useEffect } from 'react';
import React from 'react';
import '../css/Home.css'; 
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUser, faClock, faHome} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDarkMode } from '../DarkModeContext';

function Paper() {
    const {darkMode} = useDarkMode();
    const { id } = useParams();
    const [idRelatedPost, setIdRelatedPost] = useState([]);
    const [titlePost, setTitlePost] = useState(null);
    const [authorPost, setAuthorPost] = useState(null);
    const [contentPost, setContentPost] = useState(null);
    const [tagPost, setTagPost] = useState(null);
    const [dateUpdatePost, setDateUpdatePost] = useState(null);
    const [fixedTableOfPaper, setFixedTableOfPaper] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`)
            .then(response => {
                var post = response.data;
                var tagRelatedPost = post.tag;
                setTitlePost(post.title);
                setAuthorPost(post.author)
                setContentPost(post.content);
                setTagPost(post.tag);
                setDateUpdatePost(post.date_update);

                axios.get(`http://localhost:3001/related_post/${tagRelatedPost}`)
                    .then(response => {
                        // alert(`tag: ${tagRelatedPost}`);
                        const data = response.data;
                        setIdRelatedPost(data);
                    })
            })
            .catch(error => {
                console.error("Error fetching posts: ", error);
            });

            window.scrollTo(0, 0); //trang web sẽ tự động cuộn lên đầu trang

    }, [id]); // Fetch lại dữ liệu khi `id` thay đổi
    //useEffect sử dụng [id] là mảng dependency, để nó sẽ fetch dữ liệu mới khi id thay đổi.
    // Không cập nhật useEffect khi id thay đổi: Trong useEffect, bạn đã sử dụng axios.get để fetch dữ liệu cho id được truyền từ useParams(). Tuy nhiên, useEffect này chỉ chạy một lần khi component được render lần đầu tiên (do mảng dependency là []). Điều này có nghĩa là nó chỉ fetch dữ liệu một lần cho id ban đầu. Khi id thay đổi (ví dụ: từ 5 sang 7), useEffect không được gọi lại để fetch dữ liệu mới cho id mới.


    useEffect(() => {
        const handleFixedTableOfPaper = () => {
          const offset = window.scrollY;
          setFixedTableOfPaper(offset > 42);
        };
    
        window.addEventListener('scroll', handleFixedTableOfPaper);
        return () => {
          window.removeEventListener('scroll', handleFixedTableOfPaper);
        };
      }, []);
    

     // Lấy danh sách tất cả các tiêu đề h2 từ nội dung
    const headings = document.querySelectorAll('.BaiViet > strong');

    // Tạo mục lục từ danh sách các tiêu đề h2
    const tocItems = Array.from(headings).map((heading, index) => {
        const headingText = heading.textContent;
        const anchorId = `toc-item-${index}`;

        return (
        <li key={index}>
            <a href={`#${anchorId}`}>{headingText}</a>
        </li>
        );
    });

    return (
        <div className='paper'>
            <div className='breadCrum_backWard'>
                <FontAwesomeIcon icon={faHome} style={{color: 'rgb(68, 68, 109)'}}/>
                <p style={{color: '#37537B', margin: '0px', paddingLeft: '10px'}}> Trang chủ / Bài viết</p>
            </div>
            <div className='main_paper'>
                <div className={`container_paper ${darkMode ? 'dark_mode':''}`}>
                    <div className="theme_paper">
                        <span><h2>{titlePost}</h2></span>
                    </div>
                    <div className='author_article'>
                        <p><FontAwesomeIcon icon={faUser} /><span> {authorPost} </span>| <FontAwesomeIcon icon={faClock}/> {dateUpdatePost}</p>
                    </div>
                    <div className="content_container">
                        <div dangerouslySetInnerHTML={{ __html: contentPost }} />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <p><em><strong>Thank you for reading!</strong></em></p>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', fontSize: '12sp'}}>
                        <p>Tags: <span className='tag_article'>{tagPost}</span></p>
                    </div>
                    <div className={`end_article ${darkMode ? 'dark_mode':''}`}>
                        <p>Đang xem: <strong>{titlePost}</strong></p>
                    </div>
                </div>
                {/* <div className={`table_of_paper ${fixedTableOfPaper ? 'fixed_table_of_paper':''}`}>
                    <h4>Mục lục</h4>
                    <ul>{tocItems}</ul>
                </div> */}
            </div>
           
            <div className='related_article'>
                <div className={`related_posts_theme ${darkMode ? 'dark_mode':''}`}>
                    <p>Bài viết liên quan</p>
                </div>
                <div className="related_posts">
                    {idRelatedPost.map(post => (
                        <div className={`related_post ${darkMode ? 'dark_mode':''}`} key={post.id}>
                            <div className='related_post_img'>
                                <img src={post.url_img}></img>
                            </div>
                            <div className="related_post_title">
                                <Link className={`related_post_link ${darkMode ? 'dark_mode':''}`} to={`/paper2/${post.id}`} id="demo">{post.title}</Link>
                                <div className={`related_post_author ${darkMode ? 'dark_mode':''}`}>
                                    <p>Tác giả: <strong>{post.author}</strong></p>
                                </div>
                            </div> 
                        </div>  
                    ))}
                </div>
            </div>

        </div>
        
    );
}

export default Paper;
