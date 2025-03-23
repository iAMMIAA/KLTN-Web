import "./css/WriteInfoDrug.css";
import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "./DarkModeContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function WriteInfoDrug() {
    const { useDarkMode } = useState(false);
    const [error, setError] = useState("");
    const [formPaper, setFormPaper] = useState({
        id_drug: "",
        uses: "",
        excipients: "",
        side_effects: "",
        name: "",
    });
    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];

    const handlePaperChange = (event) => {
        const { name, value } = event.target;
        setFormPaper({ ...formPaper, [name]: value });
    };
    // const handleContentChange = (value) => {
    //   setFormPaper({...formPaper, content: value});
    // }
    const handleContentChange = (field, value) => {
        setFormPaper((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const { id_drug, uses, excipients, side_effects, name } = formPaper;
        if (!id_drug || !uses || !excipients || !side_effects || !name) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        setError("");
        axios
            .post(`${API_URL}/write-info-drug`, formPaper)
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className={`Write-Info-Drug`}>
            <h2>Update Drug Information</h2>
            <form className={`form-info-drug`} onSubmit={handleSubmit}>
                <input
                    className="id-drug"
                    type="text"
                    name="id_drug"
                    value={formPaper.id_drug}
                    placeholder="Mã thuốc"
                    onChange={handlePaperChange}
                ></input>
                <input
                    className="name-drug"
                    type="text"
                    name="name"
                    value={formPaper.name}
                    placeholder="Tên thuốc"
                    onChange={handlePaperChange}
                ></input>

                <label>Nhập thành phần thuốc:</label>
                <ReactQuill
                    className={`ReactQuill-drug`}
                    value={formPaper.excipients}
                    onChange={(value) =>
                        handleContentChange("excipients", value)
                    }
                    modules={modules}
                    formats={formats}
                />

                <label>Nhập công dụng thuốc:</label>
                <ReactQuill
                    className={`ReactQuill-drug`}
                    value={formPaper.uses}
                    onChange={(value) => handleContentChange("uses", value)}
                    modules={modules}
                    formats={formats}
                />

                <label>Nhập tác dụng phụ của thuốc:</label>
                <ReactQuill
                    className={`ReactQuill-drug`}
                    value={formPaper.side_effects}
                    onChange={(value) =>
                        handleContentChange("side_effects", value)
                    }
                    modules={modules}
                    formats={formats}
                />
                {error && <p className="error-message">{error}</p>}
                <div className="layout-submit">
                    <button className="submit-paper" type="submit">
                        <FontAwesomeIcon
                            className="icon-submit-paper"
                            icon={faPaperPlane}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}
export default WriteInfoDrug;
