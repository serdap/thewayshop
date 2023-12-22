document.addEventListener('DOMContentLoaded', function () {

    function displayData(data) {
        const productContainer = document.getElementById('show-cart');
        // Hàm hiển thị sản phẩm
        productContainer.innerHTML = ''; // Xóa nội dung trước đó

        data.forEach(element => {
            const productCard = document.createElement('li');
            productCard.className = 'cart-list';
            // ${item.thumbnail}
            productCard.innerHTML = `
                <li>
                    <a href="#" class="photo"><img src="images/img-pro-01.jpg" class="cart-thumb" alt="" /></a>
                    <h6><a href="#">${element.name} </a></h6>
                    <p>1x - <span class="price">${element.price * element.quantity}</span></p>
                </li>
                `;
            productContainer.appendChild(productCard);
        });
    }

    function displayTotals(data) {

        const totalContainer = document.getElementById('show-totals');

        const countCart = document.getElementById('count-cart')
        const countCartElement = document.createElement('span');
        countCartElement.className = "badge";
        countCartElement.innerHTML = `${data.length}`;
        countCart.appendChild(countCartElement);

        countCart.innerHTML = '';
        // Hàm hiển thị phân trang
        totalContainer.innerHTML = ''; // Xóa nội dung trước đó
        const productCard = document.createElement('li');
        let totals = 0;
        data.forEach(element => {
            totals = totals + element.quantity * element.price;
        })
        productCard.className = "total";
        productCard.innerHTML = `
                <a href="#" class="btn btn-default hvr-hover btn-cart">VIEW CART</a>
                <span class="float-right"><strong>Total</strong>: $${totals}</span>
                `;
        productContainer.appendChild(productCard);
    }
    // Gọi API ở đây

    function fetchData() {
        // Hàm tải dữ liệu từ API dựa trên trang hiện tại
        url = `http://127.0.0.1:8000/api/v1/carts`
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer" + localStorage.getItem("token"),
            }
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                displayData(data.data);
                displayTotals(totals);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
                window.location.href = "index.html";
            });
    }

    // Khi tải trang lần đầu
    fetchData();


});
