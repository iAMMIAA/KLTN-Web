import "./css/Detection.css";
import React, { useRef, useEffect, useState } from "react";
import { useDarkMode } from "./DarkModeContext";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Detection() {
    const { darkMode } = useDarkMode();
    const [drugInfo, setDrugInfo] = useState([]);
    const [imageLink, setImageLink] = useState(null);
    const [detailDrugInfo, setDetailDrugInfo] = useState(null);
    // const [currentFrameDetected, setCurrentFrameDetected] = useState(null);
    const currentFrameRef = useRef(null); // Dùng useRef để lưu giá trị trước đó

    useEffect(() => {
        const socket = new WebSocket(
            "ws://jetson-xavier-nx.tailnet-8188.ts.net:8765",
        );

        // Khi kết nối mở
        socket.onopen = () => {
            // alert("Connected to WebSocket Server");
        };

        // Khi nhận được dữ liệu từ Python
        socket.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              // console.log("Dữ liệu nhận được:", data.frame);
              
              // Nếu frame_detected thay đổi, cập nhật currentFrame để reload component
              if (data.frame !== undefined && data.frame !== currentFrameRef.current) {
                // setCurrentFrame(data.frame);
                currentFrameRef.current = data.frame;
                // console.log("setCurrentFrame:", data.frame);
                // console.log("CurrentFrame:", currentFrameRef.current);
                setDrugInfo([]); // Reset drugInfo về rỗng
                setImageLink(null); // Reset imageLink về null
              } 
              
              if (data.name !== undefined && data.count !== undefined && data.image_bounding_box !== undefined) {
                
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
              }
      
              // Cập nhật hình ảnh chính
              if (data.image) {
                setImageLink(`data:image/jpeg;base64,${data.image}`);
              }
      
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };

        window.scrollTo(0, 0);

        // Khi kết nối bị đóng
        socket.onclose = () => {
            // alert("WebSocket connection closed");
        };

        // Khi có lỗi xảy ra
        socket.onerror = (error) => {
            // alert("WebSocket Error:", error);
        };

        return () => {
            socket.close(); // Ngắt kết nối khi component unmount
        };
    }, []);

    const get_detail_drug_info = (nameDrug) => {
        axios
            .get(`${API_URL}/get-name-drug/${nameDrug}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setDetailDrugInfo(response.data[0]);
                } else {
                    setDetailDrugInfo(null);
                }
            })
            .catch((error) => {
                console.error("Error fetching drug details:", error);
            });
    };

    return (
        <div className="Detection">
            <div className={`detection_container`}>
                <div
                    className="d_result"
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                    {drugInfo.length > 0 ? (
                        <div className="main_result">
                            {drugInfo.map((drug, index) => (
                                <div key={index} className="drug_item">
                                    <div
                                        className="basic_drug_info"
                                        onClick={() =>
                                            get_detail_drug_info(drug.name)
                                        }
                                    >
                                        <div className="drug_bounding_box">
                                            {drug.bounding_boxes.map(
                                                (boundingBox, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="drug_bounding_box"
                                                    >
                                                        <img
                                                            src={`data:image/jpeg;base64,${boundingBox}`}
                                                            alt="Drug"
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                            }}
                                                        />
                                                    </div>
                                                ),
                                            )}
                                            {/* <img src={`data:image/jpeg;base64,${drug.image_bounding_box}`} alt="Drug" style={{ width: '100%', height: 'auto' }} /> */}
                                        </div>
                                        <div className="drug_info">
                                            <p>
                                                <strong>Tên thuốc:</strong>{" "}
                                                {drug.name}
                                            </p>
                                            <p>
                                                <strong>Số lượng:</strong>{" "}
                                                {drug.count}
                                            </p>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="intro_result">
                            <div
                                className={`intro_result1 ${darkMode ? "dark_mode" : ""}`}
                            >
                                <p>Bạn có thể tra cứu hình ảnh thuốc ở đây.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="show_input_video">
                    {imageLink && (
                        <div>
                            <img
                                src={imageLink}
                                alt="Drug"
                                style={{ width: "100%", height: "auto" }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="detection_detail">
                {/* <div className='drug_detail'>
            <h3>Thông tin chi tiết:</h3>
            <p><strong>Tên thuốc:</strong></p>

            <div>
              <strong>Công dụng:</strong>
            </div>

            <div>
              <strong>Thành phần:</strong>
            </div>

            <div>
              <strong>Tác dụng phụ:</strong>
            </div>
          </div> */}

                {detailDrugInfo && (
                    <div className="drug_detail">
                        <h3>Thông tin chi tiết:</h3>
                        <p>
                            <strong>Tên thuốc:</strong> {detailDrugInfo.name}
                        </p>

                        <div>
                            <strong>Công dụng:</strong>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailDrugInfo.uses,
                                }}
                            />
                        </div>

                        <div>
                            <strong>Thành phần:</strong>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailDrugInfo.excipients,
                                }}
                            />
                        </div>

                        <div>
                            <strong>Tác dụng phụ:</strong>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: detailDrugInfo.side_effects,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Detection;
