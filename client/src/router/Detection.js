import './css/Detection.css';
import React, { useRef, useEffect, useState } from 'react';
import { useDarkMode } from './DarkModeContext';
import axios from 'axios';

function Detection() {
  const { darkMode } = useDarkMode();
  const [drugInfo, setDrugInfo] = useState([]);
  const [imageLink, setImageLink] = useState(null);
  const [detailDrugInfo, setDetailDrugInfo] = useState(null);
  const currentFrameRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://jetson-xavier-nx.tailnet-8188.ts.net:8765");

    socket.onopen = () => {
      // alert("Connected to WebSocket Server");
    };

    socket.onmessage = (event) => {
      handleSocketMessage(event);
    };

    window.scrollTo(0, 0);

    socket.onclose = () => {
      // alert("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      // alert("WebSocket Error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSocketMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("Dữ liệu nhận được:", data.frame);

      if (data.frame !== undefined && data.frame !== currentFrameRef.current) {
        currentFrameRef.current = data.frame;
        console.log("setCurrentFrame:", data.frame);
        console.log("CurrentFrame:", currentFrameRef.current);
        resetDrugInfo();
      }

      if (data.name !== undefined && data.count !== undefined && data.image_bounding_box !== undefined) {
        updateDrugInfo(data);
      }

      if (data.image) {
        setImageLink(`data:image/jpeg;base64,${data.image}`);
      }

    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  };

  const resetDrugInfo = () => {
    setDrugInfo([]);
    setImageLink(null);
  };

  const updateDrugInfo = (data) => {
    setDrugInfo((prevData) => {
      const existingDrugIndex = prevData.findIndex(drug => drug.name === data.name);
      if (existingDrugIndex !== -1) {
        const updatedDrug = {
          ...prevData[existingDrugIndex],
          count: data.count,
          bounding_boxes: [...prevData[existingDrugIndex].bounding_boxes, data.image_bounding_box]
        };
        const newData = [...prevData];
        newData[existingDrugIndex] = updatedDrug;
        return newData;
      } else {
        return [...prevData, {
          name: data.name,
          count: data.count,
          bounding_boxes: [data.image_bounding_box]
        }];
      }
    });
  };

  const getDetailDrugInfo = (nameDrug) => {
    axios.get(`http://localhost:3001/get-name-drug/${nameDrug}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setDetailDrugInfo(response.data[0]);
        } else {
          setDetailDrugInfo(null);
        }
      })
      .catch(error => {
        console.error("Error fetching drug details:", error);
      });
  };

  return (
    <div className='Detection'>
      <div className={`detection_container`}>
        <div className="d_result" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {drugInfo.length > 0 ? (
            <div className='main_result'>
              {drugInfo.map((drug, index) => (
                <div key={index} className='drug_item'>
                  <div className='basic_drug_info' onClick={() => getDetailDrugInfo(drug.name)}>
                    <div className='drug_bounding_box'>
                      {drug.bounding_boxes.map((boundingBox, idx) => (
                        <div key={idx} className='drug_bounding_box'>
                          <img src={`data:image/jpeg;base64,${boundingBox}`} alt="Drug" style={{ width: '100%', height: 'auto' }} />
                        </div>
                      ))}
                    </div>
                    <div className='drug_info'>
                      <p><strong>Tên thuốc:</strong> {drug.name}</p>
                      <p><strong>Số lượng:</strong> {drug.count}</p>
                      <hr />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='intro_result'>
              <div className={`intro_result1 ${darkMode ? 'dark_mode' : ''}`}>
                <p>Bạn có thể tra cứu hình ảnh thuốc ở đây.</p>
              </div>
            </div>
          )}
        </div>
        <div className="show_input_video">
          {imageLink && (
            <div>
              <img src={imageLink} alt="Drug" style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </div>
      </div>
      <div className="detection_detail">
        {detailDrugInfo && (
          <div className='drug_detail'>
            <h3>Thông tin chi tiết:</h3>
            <p><strong>Tên thuốc:</strong> {detailDrugInfo.name}</p>
            <div>
              <strong>Công dụng:</strong>
              <div dangerouslySetInnerHTML={{ __html: detailDrugInfo.uses }} />
            </div>
            <div>
              <strong>Thành phần:</strong>
              <div dangerouslySetInnerHTML={{ __html: detailDrugInfo.excipients }} />
            </div>
            <div>
              <strong>Tác dụng phụ:</strong>
              <div dangerouslySetInnerHTML={{ __html: detailDrugInfo.side_effects }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detection;