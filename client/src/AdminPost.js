import axios from 'axios';
import { useState } from 'react';

function Paper() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [cite, setCite] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Ngăn chặn việc tải lại trang khi gửi form

        // Tạo object chứa dữ liệu của bài viết
        const postData = {
            title: title,
            author: author,
            cite: cite,
            content: content
        };

        // Gửi dữ liệu lên server sử dụng phương thức POST
        axios.post('http://localhost:3001/posts', postData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                // Xử lý phản hồi từ server nếu cần
            })
            .catch(error => {
                console.error('Error sending data:', error);
                // Xử lý lỗi nếu có
            });
    };

    return (
        <div>
            <h1>Write a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <label>Cite:</label>
                    <input type="text" value={cite} onChange={(e) => setCite(e.target.value)} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Paper;
