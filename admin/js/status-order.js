document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1; // Trang hiện tại
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang

    function displayData(data) {
        const orderContainer = document.getElementById('list-status-admin');
        // Hàm hiển thị sản phẩm
        orderContainer.innerHTML = ''; // Xóa nội dung trước đó

        data.forEach(element => {
            const orderCard = document.createElement('tbody');
            orderCard.className = 'table table-bordered';
            let status = '';
            switch (element.status) {
                case "PENDING":
                    status = "Đang xử lý";
                    break;
                case "WAIT_CONFIRMED":
                    status = "Đợi phản hồi";
                    break;
                case "SHIPPING":
                    status = "Đang vận chuyển";
                    break;
                case "CONFIRMED":
                    status = "Đã phản hồi";
                    break;
                    case "COMPLETED":
                    status = "Đã hoàn thành";
                    break;
                default: 
                    status = "Đơn đã bị hủy";
            }
            const itemListContainer = document.getElementById('item-list');
            itemListContainer.innerHTML = '';

            element.products.forEach(item =>{
                const itemList = document.createElement('ul');
                itemList.innerHTML =`<li>${item.name}</li>`;
                itemListContainer.appendChild(orderCard);
            })

            orderCard.innerHTML = `
                <tr>
                    <td>1</td>
                <td>
                    <ul>
                        ${itemListContainer}
                    </ul>
                </td>
                <td>21.990.000 VND</td>
                <td>${status}</td>
                <td>${element.status}</td>
                <td>
                    <a id="change-status" class="btn btn-warning"> <i class="fa-solid fa-angles-right"></i> </a>
                </td>
                </tr>
                `;
            var changeStatusButton = orderCard.querySelector('#change-status');
            changeStatusButton.addEventListener('click', function () {
                changeStatus(element);
            });
            orderContainer.appendChild(orderCard);
        });
    }

    function displayPagination(totalPages) {

        const paginationContainer = document.getElementById('panigation-list-status-admin');
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

    async  function fetchData(page) {
        // Hàm tải dữ liệu từ API dựa trên trang hiện tại
        url = `http://127.0.0.1:8000/api/v1/admin/ordes?page=${page}`
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
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
function changeStatus(product) {
    const url = 'http://127.0.0.1:8000/api/v1/changeStatusOrder';
    const value = {
        "code": product.code,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": "Bearer" + localStorage.getItem("token"),
        },
        body: JSON.stringify()
    }

    fetch(url, options)
        .then(response => response.json)
        .then(data => {
            if (data.status == 'success') {
                alert('Đã chuyển trạng thái đơn');
            } else {
                alert('Có lỗi xảy ra! Vui lòng thử lại sau');
            }
        }).catch(error => {
            console.log("lỗi rồi fix đê");
            window.location.href = "index.html";
        })
}

