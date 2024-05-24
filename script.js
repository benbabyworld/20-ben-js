// แอพคำนวณราคาผมมี 4 ส่วนครับ  ฟอร์มให้ผู้ใช้กรอก // จุดพักสินค้า // ตะกร้าสินค้า // และ การคำนวณ 17 ขั้นตอน ดังนี้ครับ

// 1. กำหนด Product Array ให้ว่างและกำหนด Product ID ให้เป็น 1

let productID = 1;
let products = [];

//2. สร้างฟังก์ชัน addProduct() เพื่อเอาไปใช้กับปุ่มเพิ่มสินค้า ผมใช้ DOM จัดการตรงนี้ครับ

function addProduct() {
  const productName = document.getElementById('product-name').value;
  const productPrice = document.getElementById('product-price').value;
  const productImage = document.getElementById('product-img').value;

  // 3. สร้าง object ขึ้นมาใหม่ เอาไว้ .push ขึ้นไปใน array product ตอนที่ผู้ใช้กดผุ่มเพิ่ม product ครับ

  const product = {
    id: productID++,
    name: productName,
    price: parseFloat(productPrice).toFixed(2),
    image: productImage,
  };

  //4. เพิ่มเข้าไปในอาร์เรย์สินค้า แต่ต้องเช็ดว่า 1. ใส่ข้อมูลตรงตาม type ไหม 2. ไฟล์รูปถูกต้องไหม (สร้างฟังก์ชันเชค ไฟล์รูปด้านล่างตามข้อ 6.)
  //  >> ต้องขอบคุณ mini project ของพี่ลักษณ์ที่พาผมเช็คสินค้าจนละเอียดเลยครับ ^_^  นำมาปรับใช้ได้ดีเลยครับ<<

  if (
    typeof productName !== 'string' ||
    !productName ||
    productName.length < 3 ||
    productName > 255
  ) {
    alert('Warning: Product ID must be filled between 3 and 255 characters');
  } else if (isNaN(productPrice) || productPrice <= 0) {
    alert('Warning: Product price must be a number and filled');
  } else if (!isValidUrl(productImage) || !isValidImageUrl(productImage)) {
    alert(
      'Warning: Invalid URL, product image URL must be a file with a .jpg, .png, or .gif'
    );
  } else {
    //5. ถ้าตรงตามเงื่อนไขก็ เรียกใช้ฟังก์ชัน renderProduct(product) ที่จะไปสร้างข้างล่างครับ
    products.push(product);
    renderProduct(product);
  }

  document.getElementById('input-form').reset();
}

// 6. สร้างฟังก์ชั่น 2 ฟังก์ชั่นเพื่อตรวจสอบว่าไฟล์รูป 1). เป็น URL ที่่ valid ไหม  isValidUrl(url)
//2). "ลงท้ายด้วย" ใช้ isValidImageUrl เช็คว่าไฟล์ลงท้ายด้วยนามสกุลเหล่านี้ไหม jpg|jpeg|png|gif

function isValidImageUrl(url) {
  // Regular expression for URL validation with specific file extensions
  const urlPattern = /\.(jpg|jpeg|png|gif)$/i;
  return urlPattern.test(url);
}

function isValidUrl(url) {
  // Regular expression for URL validation
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

// 7. ฟังก์ชั่นนี้เรียกใช้ตอนที่ผู้ใช้กดปุ่มเพิ่มสินค้าเข้ามายังจุดพักสินค้า
function renderProduct(product) {
  // 8. ก่อนจะมาสร้าง elements เพื่อ appendchild เข้าไปใน html ผมเขียน html และ tailwindcss
  //ขึ้นมาก่อนเพื่อดูผลลัพธ์จากนั้นค่อย ๆ เอา style มาสร้าง element และ append เข้าไปครับ

  // 9. สร้าง div ใหญ่ครอบลิสต์สินค้าที่จะ append
  const itemContainer = document.getElementById('product-list');
  const itemList = document.createElement('div');
  itemList.className = 'flex gap-2';

  // สร้าง checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'relative w-4 mr-4 top-20 right-4 md:static';

  // สร้าง image
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;
  img.className =
    'transition duration-300 ease-in-out rounded-lg max-h-40 hover:scale-110';

  // สร้าง container ครอบทั้ง 4 element // checkbox + img + name + price
  const productDetails = document.createElement('div');
  productDetails.className = 'justify-items-center md:flex md:flex-1';
  productDetails.id = 'product-details';

  // สร้าง name
  const pName = document.createElement('h1');
  pName.className = 'text-xl text-indigo-900 justify-self-start';
  pName.textContent = product.name;

  // สร้าง ราคา
  const pPrice = document.createElement('p');
  pPrice.className = 'text-yellow-800 text-l justify-self-end';
  pPrice.id = 'price';
  pPrice.textContent = `Price: $${product.price}`;

  //10.  เริ่ม append แต่ละ element เข้าไปใน parents ด้วย .appendchild

  productDetails.appendChild(checkbox);
  productDetails.appendChild(img);
  productDetails.appendChild(pName);
  productDetails.appendChild(pPrice);

  itemList.appendChild(productDetails);
  itemList.id = 'itemList';
  itemContainer.appendChild(itemList);
}

// 11. ปุ่มเพิ่มเข้าไปในตะกร้า

function addToCart() {
  // เลือก dashbaordlist ที่เราไปสร้างไว้ใน html เข้ามาก่อน ตั้งชื่อให้เป็น dashboardList
  const dashboardList = document.getElementById('dashboard-list');

  // เลือก div ที่อยู่ในจุดพักสินค้าทั้งหมดมา เพราะในนั้นมี checkbox
  const selectedItems = document.querySelectorAll('#product-list > div');
  // ลูป checkbox ทั้งหมดใน div ที่เลือกมาด้วย forEach
  selectedItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    // กำหนด conditionals ว่าถ้าถูก checked ก็ให้ append item ซึ่งก็คือ div ที่โดน forEach ใน productlist ทั้งหมด
    // เข้าไปในตะกร้าสินค้า
    if (checkbox.checked) {
      dashboardList.appendChild(item);
    }
  });
}

// 12. ในโจทย์กำหนดว่าให้ใช้ปุ่มเดียวกันย้ายสินค้าจากตะกร้ากลับไปยังจุดพัก แต่ผมสร้าง removeProduct เพราะมองว่า makesense
// และเป็นผลดีต่อผู้ใช้งานในแง่ของ UX / UI ครับ

// สร้างปุ่มลบสินค้าออกจากตะกร้า กลับไปยังจดพักเหมือนเดิมโดยใช้เทคนิคเดิม
function removeProduct() {
  const productList = document.getElementById('product-list');

  const selectedItems = document.querySelectorAll('#dashboard-list > div');

  selectedItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      productList.appendChild(item);
    }
  });
}

//สุดท้ายคำนวณหาราคารวมที่ต้องจ่าย

function accuPrice() {
  // 13. กำหนดราคาสินค้าททั้งหมดเป็น 0 เพราะเมื่อสินค้าถูกคำนวณตอนลูป forEach จะได้บวกเพิ่มขึ้นเรื่อย ๆ
  let totalPrice = 0;
  // 14. สร้างตัวแปรเพื่อใช้ DOM เลือก div ทั้งหมดที่อยู่ในตะกร้า (dashboard-list)
  const accuedItems = document.querySelectorAll('#dashboard-list > div');
  // 15. ใช้ array method forEach() ในการลูปหาราคา
  accuedItems.forEach((p) => {
    // 16. ใช้ parseFloat แปลงค่า string มาเป็นคา่เงิน float ทศนิยม เลือกเข้าไปยัง
    // child ตัวที่ 4 [p:nth-child(4)] จาก children ทั้งหมด (children ใน แต่ละ div มี 1. checkbox 2. img 3. name 4. price)
    // และจะลบ Price: $ ออกจากการคำนวณ ด้วย .replace()
    floatedPrice = parseFloat(
      p.querySelector('p:nth-child(4)').textContent.replace('Price: $', '')
    );
    console.log(floatedPrice);
    totalPrice += floatedPrice;
  });
  // 17. คำนวณออกมาเเล้วราคารวมก็จะไปแทนที่ span text element ที่มี id ว่า result ใน html ครับ
  document.querySelector('#result').textContent = totalPrice;
}
