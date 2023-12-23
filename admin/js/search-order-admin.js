document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-list-Input");
    const suggestionsList = document.getElementById("suggestions-input-list");

    searchInput.addEventListener("input", async function () {
        const value = this.value.toLowerCase();
        suggestionsList.innerHTML = '';

        console.log(value)
        url = `http://127.0.0.1:8000/api/v1/orders/${value}`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }

        // Gọi API với từ khóa tìm kiếm
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                const suggestions = data.data;
                console.log(data)

                suggestions.forEach(suggestion => {
                    const li = document.createElement("li");
                    li.textContent = suggestion.name; // Thay đổi dựa trên cấu trúc dữ liệu API
                    li.addEventListener("click", function () {
                        searchInput.value = suggestion.name;
                        suggestionsList.style.display = "none";
                        displayProducts(suggestion.name);
                    });
                    suggestionsList.appendChild(li);
                });

                suggestionsList.style.display = suggestions.length > 0 ? "block" : "none";
            })
            .catch(error => console.error("Error fetching data:", error));
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-container")) {
            suggestionsList.style.display = "none";
        }
    });
    function displayProducts(suggestionId) {
        // Assuming you have a function to fetch and display products based on the suggestion ID
        const productsUrl = `http://127.0.0.1:8000/api/v1/productname?value=${suggestionId}`;
        fetch(productsUrl)
            .then(response => response.json())
            .then(data => {
                // Display products in the product container
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

                element.products.forEach(item => {
                    const itemList = document.createElement('ul');
                    itemList.innerHTML = `<li>${item.name}</li>`;
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

                // Show the product container
                document.getElementById("list-status-admin").classList.add("show");
            })
            .catch(error => console.error("Error fetching products:", error));
    }
});
