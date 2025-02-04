import './css/LookUp.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPrescription } from '@fortawesome/free-solid-svg-icons';
import { useDarkMode } from './DarkModeContext';

function LookUp() {
  const {darkMode} = useDarkMode();
  const[selectedImage, setSelectedImage] = useState(null);
  const[resultDrug, setResultDrug] = useState(null);
  const[detailDrug, setDetailDrug] = useState(null);
  const[sourceInfo, setSourceInfo] = useState(null);
  const[imgDrug, setImgDrug] = useState(null);
  const[colorDrug, setColorDrug] = useState(null);
  const[shapeDrug, setShapeDrug] = useState(null);
  const[imprintDrug, setImprintDrug] = useState(null);
  const[describeDrug, setDescribeDrug] = useState(null);
  const [relatedDrug, setRelatedDrug] = useState([]);
  const [fixedResult, setFixedResult] = useState();
  const [openLookUp, setOpenLookUp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleFixedListResult = () => {
      if(window.scrollY > 285)
        setFixedResult(true);
      else setFixedResult(false);
    }
    window.addEventListener('scroll', handleFixedListResult);
    return () => {
      window.removeEventListener('scroll', handleFixedListResult);
    }
  },[])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file)
  };

  const handleLookUp = () =>{
    if(!selectedImage){
      alert("Vui long chon hinh anh truoc khi tra cuu");
      return;
    } 
    const formData = new FormData();
    formData.append('image', selectedImage);
    axios.post('http://localhost:3001/predict', formData)
      .then(Response => {
        var drug = Response.data;
        var tagDrug = drug.tagDrug;
        setResultDrug(drug.nameDrug);
        setDetailDrug(drug.detail);
        setSourceInfo(drug.cites);
        setImgDrug(drug.imgDrug);
        setColorDrug(drug.colorDrug);
        setShapeDrug(drug.shapeDrug);
        setImprintDrug(drug.imprintDrug);
        setDescribeDrug(drug.describeDrug);

        axios.get(`http://localhost:3001/related_drug/${tagDrug}`)
            .then(response => {
              setRelatedDrug(response.data);
            })

        setOpenLookUp(true);
      })
      .catch(error => {console.error("Error while fetching result: ", error);});
  };
    
  return (
      <div className='LookUp'>
          <div className = "uploadImage">
              <p>D r u g I d e n t i f i c a t i o n</p>
              <form className="drugForm" >
                  <input className="form_control" type="file" placeholder="Tải ảnh lên" onChange={handleImageChange} name='image'/>
                  <div className="input_group_text">
                    <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                  </div>
              </form>
              <button className="btn_check" onClick={handleLookUp}>Tra cứu</button>
          </div>

          
          <div className="result">
            {openLookUp ? (
              <div className='main_result'>
                <div className='square1'>
                    <div className='name_drug'>
                      <p>{resultDrug}</p>
                    </div>
                  <div className='over_drug'>
                    <div className='describe_drug'>
                        <p><strong>Color: </strong> {colorDrug}</p>
                        <p><strong>Shape: </strong> {shapeDrug}</p>
                        <p><strong>Imprint: </strong> {imprintDrug}</p>
                        <p></p>
                        <p><em>"{describeDrug}"</em></p>
                    </div>
                    {/* <p className='detail_drug' dangerouslySetInnerHTML={{ __html: detailDrug }}></p> */}
                    <div className='information_source'>
                      <img src="https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/12/28/ceef2be96f71c72f9e60-1703752254941963328669.jpg"/>
                      <p><span> Medically reviewed by <strong>{sourceInfo}</strong>.</span></p>
                    </div>
                  </div>
                  <div className='detail_drug'>
                    <p><h3>Thông tin chi tiết:</h3></p>
                    <p className='detail_drug' dangerouslySetInnerHTML={{ __html: detailDrug }}></p>
                  </div>
                </div>
                <div className='result_flag'>
                </div>
                <div className={fixedResult ? 'fix_list_result':'list_result'}>
                    <div className='square3'>
                      <div className='defineImage'>
                        <img src={imgDrug}></img>
                        <p>Ảnh mặc định</p>
                      </div>
                      <div className='drugImage'>
                        <img  alt="Drug" src='https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2023/12/28/ceef2be96f71c72f9e60-1703752254941963328669.jpg'/>
                        <p>Ảnh người dùng đăng tải</p>
                      </div>
                      {/* {selectedImage && 
                        <img className='drugImage' alt="Drug" src={URL.createObjectURL(selectedImage)}/>
                      } */}
                    </div>
                    <div className='related_drug'>
                      <p><strong>Các bài viết liên quan thuốc:</strong></p>
                      <ul>
                          {/* <li></li> */}
                        {relatedDrug.map(post => (
                          <li>{post.title}</li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
            ):(
              <div className='intro_result'>
                <div className={`intro_result1 ${darkMode ? 'dark_mode':''}`}>
                  <p>Bạn có thể tra cứu hình ảnh thuốc ở đây.</p>
                </div>
              </div>
            )}
          </div>
      </div>
  );
}
export default LookUp;