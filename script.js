let productID = 1;
let products = [];

const defaultImageUrl = "./img/banana.jpeg"

function addProduct() {
    const productName = document.getElementById("product-name").value;
    const productPrice = document.getElementById("product-price").value;
    const productImage = document.getElementById("product-img").value;


// create new product object

const product = {
    id: productID++,
    name: productName,
    price: parseFloat(productPrice).toFixed(2),
    image: productImage,
}

//add the product to the products array
products.push(product);


// render the product 

renderProduct(product);

// clear the form after saving
document.getElementById("input-form").reset(); 


}


function renderProduct(product) {
    const itemContainer = document.getElementById("product-list")
    // create item product list container
    const itemList = document.createElement("div")
    itemList.className = "flex gap-2"
     // create checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox";
    checkbox.className = "w-4 mr-4";

    // create image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "transition duration-300 ease-in-out rounded-lg max-h-40 hover:scale-110";

    // create product details container
    const productDetails = document.createElement("div");
    productDetails.className ="grid grid-cols-[50px_minmax(100px,_1fr)] justify-items-center"
    productDetails.id = "product-details"
    

    // create h1 element
    const pName = document.createElement("h1");
    pName.className = "text-xl text-indigo-900 justify-self-start"
    pName.textContent = product.name;

    // create p element
    const pPrice = document.createElement("p");
    pPrice.className = "text-yellow-800 text-l justify-self-end"
    pPrice.id = "price"
    pPrice.textContent = `Price: $${product.price}`;


    // append product name and price to product details

    productDetails.appendChild(checkbox);
    productDetails.appendChild(img);
    productDetails.appendChild(pName);
    productDetails.appendChild(pPrice);

    itemList.appendChild(productDetails);
    itemList.id ="itemList"
    itemContainer.appendChild(itemList);
    

}

function addToCart() {
    const dashboardList = document.getElementById("dashboard-list");
    // get all items in the product list
    const selectedItems = document.querySelectorAll("#product-list > div");
    // loop through selected items with checkbox
    selectedItems.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const productDetails = item.querySelector("#product-details");
            const checkboxInput = productDetails.querySelector('input[type="checkbox"]');
            productDetails.removeChild(checkboxInput);
            // move item to dashboard list
            dashboardList.appendChild(item);

        }
    });
}




function accuPrice() {
    let totalPrice = 0;
    const accuedItems = document.querySelectorAll("#dashboard-list > div");
    // loop through selected items with checkbox
    accuedItems.forEach((p) => {
            floatedPrice = parseFloat(p.querySelector("p:nth-child(3)").textContent.replace("Price: $",""));
            console.log(floatedPrice);
            totalPrice += floatedPrice;
    })

    document.querySelector("#result").textContent = totalPrice;
}