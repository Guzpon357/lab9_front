const $ = (name) => document.querySelector(name);

const inCategory = $("#incategory");
const createCategory = $("#createcategory");
const tbody = $("#tbody");

const inNameProduct = $("#innameproduct");
const inPriceProduct = $("#inpriceproduct");
const inimageProduct = $("#inimageproduct");
const indescProduct = $("#indescproduct");
const incategoryProduct = $("#incategoryproduct");
const createProduct = $("#createproduct");
const tbodyProducts = $("#tbodyproducts");

const dataCategory = {};
const dataProduct = {};

inCategory.onkeyup =  function (event) {dataCategory.name = event.target.value};
inNameProduct.onkeyup = function (event) {dataProduct.name = event.target.value};
inPriceProduct.onkeyup = function (event) {dataProduct.price = Number(event.target.value)};
inimageProduct.onkeyup = function (event) {dataProduct.url_image = event.target.value};
indescProduct.onkeyup = function (event) {dataProduct.discount = Number(event.target.value)};
incategoryProduct.onkeyup = function (event) {dataProduct.category = Number(event.target.value)};

async function getCategories() {
  try {
    const result = await get("/category");
    result.forEach((category) => renderRow(category));
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
    try {
      const result = await get("/product");
      result.forEach((product) => renderRowProduct(product));
    } catch (error) {
      console.log(error);
    }
  }

getCategories();
getProducts();

createCategory.onclick = async function () {
  try {
    const result = await post("/category", dataCategory);
    inCategory.value = "";
    renderRow(result);
  } catch (error) {
    console.log(error);
  }
};

createProduct.onclick = async function () {
    try {
      const result = await post("/product", dataProduct);
      inNameProduct.value = "";
      inPriceProduct.value = "";
      inimageProduct.value = "";
      indescProduct.value = "";
      incategoryProduct.value = "";
      renderRowProduct(result);
    } catch (error) {
      console.log(error);
    }
  };

function renderRow(category) {
  tbody.innerHTML += `
  <tr>
    <td>${category.id}</td>
    <td>${category.name}</td>
  </tr>
`;
}

function renderRowProduct(product) {
    tbodyProducts.innerHTML += `
    <tr>
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>
          <img src=${product.url_image} width="100px">
      
      </td>
      <td>${product.discount}</td>
      <td>${product.category}</td>
    </tr>
  `;
  }