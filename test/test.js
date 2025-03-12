import './css/Detection.css';
import React, { useEffect, useState } from 'react';
import { useDarkMode } from './DarkModeContext';

function Detection() {
  const { darkMode } = useDarkMode();
  const [drugData, setDrugData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://jetson-xavier-nx.tail4559a.ts.net:9001");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setDrugData((prevData) => [...prevData, data]); // Lưu nhiều đối tượng
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    window.scrollTo(0, 0);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className='Detection'>
      <div className="d_result" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {drugData.length > 0 ? (
          <div className='main_result'>
            {drugData.map((drug, index) => (
              <div key={index} className='drug_item'>
                <p><strong>Tên thuốc:</strong> {drug.name}</p>
                <p><strong>Công dụng:</strong> {drug.uses}</p>
                <p><strong>Thành phần:</strong> {drug.excipients}</p>
                <p><strong>Tác dụng phụ:</strong> {drug.side_effects}</p>
                {drug.link && <img src={drug.link} alt={drug.name} style={{ width: '100%', height: 'auto' }} />}
                <hr />
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
    </div>
  );
}

export default Detection;
