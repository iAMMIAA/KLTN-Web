import './css/WritePaper.css';
import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from './DarkModeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function WritePaper() {
  const {useDarkMode} = useState(false);
  const [error, setError] = useState('');
  const [formPaper, setFormPaper]=useState({
    title: '',
    author: '',
    content: '',
    tag: '',
    cite_source: ''
  })
  const modules = {
    toolbar: [
      [
        { 'header': '1'}, 
        {'header': '2'}, 
        { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        {'list': 'ordered'}, 
        {'list': 'bullet'}, 
        {'indent': '-1'}, 
        {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const handlePaperChange = (event) => {
    const {name, value} = event.target;
    setFormPaper({...formPaper, [name]: value});
  }
  const handleContentChange = (value) => {
    setFormPaper({...formPaper, content: value});
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const {title, author, content, tag, cite_source} = formPaper;
    if(!title || !author || !content || !tag || !cite_source){
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    setError('');
    axios.post('http://localhost:3001/write-paper', formPaper) 
        .then(response => {console.log('Success:', response.data);})
        .catch(error => {console.error('Error:', error);})
  }
    
  return (
      <div className={`Write-Paper`}>
        <h2>WritePaper</h2>
        <form className={`form-paper`} onSubmit={handleSubmit}>
          <input className='title-paper' type='text' name='title' value={formPaper.title} placeholder='Chủ đề' onChange={handlePaperChange}></input>
          <input className='author-paper' type='text' name='author' value={formPaper.author} placeholder='Tác giả/ Người viết' onChange={handlePaperChange}></input>
          <ReactQuill
              className={`content-paper`}
              value={formPaper.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
          />
          <select className='tag-paper' type='text' name='tag' value={formPaper.tag} placeholder='Hashtag' onChange={handlePaperChange}>
            <option value=''>Hashtag của bài viết</option>
            <option value='Thuốc'>Thuốc</option>
            <option value='Chăm_sóc_sức_khỏe'>Chăm_sóc_sức_khỏe</option>
            <option value='Bệnh'>Bệnh</option>
            <option value='Vitamin'>Vitamin</option>
          </select>
          <input className='cite-source-paper' type='text' name='cite_source' value={formPaper.cite_source} placeholder='Nguồn trích dẫn' onChange={handlePaperChange}></input>
          {error && <p className='error-message'>{error}</p>}
          <div className='layout-submit'>
            <button className='submit-paper' type='submit'>
              <FontAwesomeIcon className='icon-submit-paper' icon={faPaperPlane}/>
            </button>
          </div>
        </form>
      </div>
  );
}
export default WritePaper;