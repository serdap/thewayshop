document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1; // Trang hiện tại
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang

    function displayData(data) {
        const productContainer = document.getElementById('productContainer');
        // Hàm hiển thị sản phẩm
        productContainer.innerHTML = ''; // Xóa nội dung trước đó

        data.forEach(element => {
            const productCard = document.createElement('div');
            productCard.className = 'col-sm-6 col-md-6 col-lg-4 col-xl-4';
            // ${item.thumbnail}
            productCard.innerHTML = `
                    <div class="products-single fix">
                        <div class="box-img-hover">
                            <div class="type-lb">
                                <p class="sale">Sale</p>
                            </div>
                            <img src="images/${element.thumbnail}" class="img-fluid" alt="Product Image">
                            <div class="mask-icon">
                                <ul>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                    <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                </ul>
                                <a id="add-to-cart" class="cart">Add to Cart</a>
                            </div>
                        </div>
                        <div class="why-text">
                            <h4>${element.name}</h4>
                            <h5>${element.price}</h5>
                        </div>
                    </div>
                `;
            var addToCartButton = productCard.querySelector('#add-to-cart');
            addToCartButton.addEventListener('click', function () {
                addToCart(element);
            });
            productContainer.appendChild(productCard);
        });
    }

    function displayPagination(totalPages) {

        const paginationContainer = document.getElementById('paginationProduct');
        // Hàm hiển thị phân trang
        paginationContainer.innerHTML = ''; // Xóa nội dung trước đó

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            pageItem.textContent = i;
            pageItem.addEventListener('click', function () {
                currentPage = i;
                fetchData(currentPage);
            });
            paginationContainer.appendChild(pageItem);
        }
    }
    // Gọi API ở đây

    function fetchData(page) {
        // Hàm tải dữ liệu từ API dựa trên trang hiện tại
        url = `http://127.0.0.1:8000/api/v1/products?page=${page}`
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                const totalPages = data.meta.last_page;
                displayData(data.data);
                displayPagination(totalPages);
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
            });
    }
    // Khi tải trang lần đầu
    fetchData(currentPage);


});
function addToCart(product) {
    const url = 'http://127.0.0.1:8000/api/v1/carts';
    const value = {
        "product_id":product.id,
        "quantity":1
    }
    const options= {
        method: "POST",
        headers: {
            "Content-Type":"Application/json",
            "Authorization": "Bearer" + localStorage.getItem("token"),
        },
        body: JSON.stringify()
    }

    fetch(url, options)
        .then(response => response.json)
        .then(data =>{
            if (data.status == 'success'){
                alert('Thêm sản phẩm vào giỏ hàng thành công');
            } else {
                alert('Có lỗi xảy ra! Vui lòng thử lại sau');
            }
        }).catch(error =>{
            console.log("lỗi rồi fix đê");
            window.location.href = "index.html";
        })
}

