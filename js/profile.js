document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1; // Trang hiện tại
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang

    function displayData(data) {
        const productContainer = document.getElementById('profile-user');
        // Hàm hiển thị sản phẩm
        productContainer.innerHTML = ''; // Xóa nội dung trước đó

        const productCard = document.createElement('form');
        productCard.className = 'needs-validation';
        // ${item.thumbnail}
        productCard.innerHTML = `
                <div class="mb-3">
                    <label for="username">Name</label>
                    <div class="input-group">
                        <div class="invalid-feedback" style="width: 100%;"> ${data.name} </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="username">email</label>
                    <div class="input-group">
                        <div class="invalid-feedback" style="width: 100%;"> ${data.email} </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="username">address</label>
                    <div class="input-group">
                        <div class="invalid-feedback" style="width: 100%;"> ${data.address} </div>
                    </div>
                </div>
                `;

        productContainer.appendChild(productCard);
    }
    // Gọi API ở đây

    function fetchData(page) {
        // Hàm tải dữ liệu từ API dựa trên trang hiện tại
        url = `http://127.0.0.1:8000/api/v1/profile`
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
            })
            .catch(error => {
                console.error('Lỗi khi tải dữ liệu:', error);
            });
    }

    // Khi tải trang lần đầu
    fetchData(currentPage);


});


