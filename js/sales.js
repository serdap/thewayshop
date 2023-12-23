document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1; // Trang hiện tại
    // Gọi API ở đây

    function fetchData(page) {
        // Hàm tải dữ liệu từ API dựa trên trang hiện tại
        url = `http://127.0.0.1:8000/api/v1/admin/sales?page=${page}`
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