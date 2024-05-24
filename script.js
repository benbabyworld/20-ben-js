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
    checkbox.className = "w-6";

    // create image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = "rounded-lg shadow-2xl max-h-40 bg-red-950";

    // create product details container
    const productDetails = document.createElement("div");
    productDetails.id = "product-details"
    

    // create h1 element
    const pName = document.createElement("h1");
    pName.className = "text-xl text-pink-100"
    pName.textContent = product.name;

    // create p element
    const pPrice = document.createElement("p");
    pPrice.className = "text-blue-600 text-l"
    pPrice.id = "price"
    pPrice.textContent = `Price: $${product.price}`;


    // append product name and price to product details

    productDetails.appendChild(checkbox);
    productDetails.appendChild(img);
    productDetails.appendChild(pName);
    productDetails.appendChild(pPrice);

    itemList.appendChild(productDetails);
    itemContainer.appendChild(itemList);


}


function accuPrice() {
    let totalPrice = 0;

    const selectedItems = document.querySelectorAll("#product-list > div");
    
    // loop through selected items with checkbox

    selectedItems.forEach((p) => {
        const checkbox = p.querySelector('input[type="checkbox"]');

        if(checkbox.checked) {
            floatedPrice = parseFloat(p.querySelector("p:nth-child(4)").textContent.replace("Price: $",""));
            console.log(floatedPrice);
            totalPrice += floatedPrice;
        } 

    })

    document.querySelector("#result").textContent = totalPrice;
}