url = "http://127.0.0.1:8000/api/v1/oders"
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + localStorage.getItem("token")
    },
    body: JSON.stringify({
        product_id: 3,
        quantity: 5
    })
}

fetch(url,options)
    .then(response => response.json)
    .then(data)
    .catch(error => {
        console.log("lỗi rồi fix đê");
        window.location.href = "index.html";
    })
