document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const suggestionsList = document.getElementById("suggestionsList");

    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();
        suggestionsList.innerHTML = '';

        console.log(value)
        url = `http://127.0.0.1:8000/api/v1/search?value=${value}`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
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
            .then(productsData => {
                // Display products in the product container
                productContainerDetail.innerHTML = ''; // Clear existing content
                productContainer.innerHTML = '';
                productsData.data.forEach(product => {
                    const productCard = document.createElement("div");
                    const productCard1 = document.createElement("div");
                    productCard.className = 'list-view-box';
                    productCard1.className = 'col-sm-6 col-md-6 col-lg-4 col-xl-4';
            // ${item.thumbnail}
                    productCard.innerHTML = `
                    <div class="row">
                        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
                            <div class="products-single fix">
                                <div class="box-img-hover">
                                    <div class="type-lb">
                                        <p class="sale">Sale</p>
                                    </div>
                                    <img src="images/big-img-02.jpg" class="img-fluid" alt="Image">
                                    <div class="mask-icon">
                                        <ul>
                                            <li><a href="#" data-toggle="tooltip"
                                                data-placement="right" title="View"><i
                                                    class="fas fa-eye"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip"
                                                data-placement="right" title="Compare"><i
                                                    class="fas fa-sync-alt"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip"
                                                data-placement="right"
                                                title="Add to Wishlist"><i
                                                    class="far fa-heart"></i></a></li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8">
                            <div class="why-text full-width">
                                <h4>${product.name}</h4>
                                <h5> $${product.price}</h5>
                                <p>${product.description}</p>
                                <a class="btn hvr-hover" href="#">Add to Cart</a>
                            </div>
                        </div>
                    </div>`;

                    productCard1.innerHTML = `
                        <div class="products-single fix">
                            <div class="box-img-hover">
                                <div class="type-lb">
                                    <p class="sale">Sale</p>
                                </div>
                                <img src="images/big-img-03.jpg" class="img-fluid" alt="Product Image">
                                <div class="mask-icon">
                                    <ul>
                                        <li><a href="#" data-toggle="tooltip" data-placement="right" title="View"><i class="fas fa-eye"></i></a></li>
                                        <li><a href="#" data-toggle="tooltip" data-placement="right" title="Compare"><i class="fas fa-sync-alt"></i></a></li>
                                        <li><a href="#" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i class="far fa-heart"></i></a></li>
                                    </ul>
                                    <a class="cart" href="#">Add to Cart</a>
                                </div>
                            </div>
                            <div class="why-text">
                                <h4>${product.name}</h4>
                                <h5>${product.price}</h5>
                            </div>
                        </div>
                    `;

                    productContainer.appendChild(productCard1)
                    productContainerDetail.appendChild(productCard);
                });
                // Show the product container
                document.getElementById("list-view-search").classList.add("show");
            })
            .catch(error => console.error("Error fetching products:", error));
    }
});
