document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1; // Trang hiện tại
    const itemsPerPage = 10; // Số lượng sản phẩm mỗi trang

    function displayData(data) {
        const orderContainer = document.getElementById('list-user-admin');
        // Hàm hiển thị sản phẩm
        orderContainer.innerHTML = ''; // Xóa nội dung trước đó

        data.forEach(element => {
            const orderCard = document.createElement('tr');
            orderCard.innerHTML = '';
            orderCard.innerHTML = `
                        <td>1</td>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td>2</td>
                        <td><a href="edit.html">Edit</a></td>
                        <td><a href="#">Delete</a></td>
                        `;
            orderContainer.appendChild(orderCard);
        });
    }

    function displayPagination(totalPages) {

        const paginationContainer = document.getElementById('panigation-list-user-admin');
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
        url = `http://127.0.0.1:8000/api/v1/admin/getusers?page=${page}`
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


