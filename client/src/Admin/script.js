const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function sendData() {
    var title = document.querySelector(".title_post").innerText;
    var content = document.querySelector(".content_post").innerHTML;
    var author = document.querySelector(".author_post").innerText;
    var cite = document.querySelector(".cite_post").innerText;

    axios
        .post(`${API_URL}:3001/posts`, {
            title: title,
            author: author,
            cite_source: cite,
            content: content,
        })
        .then((response) => {
            console.log("Data sent successfully: ", response);
        })
        .catch((error) => {
            console.error("Error sending data: ", error);
        });
}
