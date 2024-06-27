import products from "./products.js";
import cart from "./cart.js";
let app=document.getElementById('app');
let temporary_content=document.getElementById("temprary_content");

//load template file
const loadtemplate=()=>{
    fetch('/template.html')
    .then (response => response.text())
    .then(html=>{
        app.innerHTML=html;
        let contenttab=document.getElementById('contentTab');
        contenttab.innerHTML=temporary_content.innerHTML;
        temporary_content.innerHTML= null;
        cart();//to upload the cart from the template page
        initApp();//if the cart function preforms functions related to the shopping cart the init will do the same in the current page
        })
}
loadtemplate();
const initApp = () =>{
    let idproduct = new URLSearchParams(window.location.search).get('id');
    let info = products.filter((value) => value.id == idproduct )[0];   //info has all the informations of a product of a certain id
    if (!info){//if the id don't exist , we go back to the main page
            window.location.href='shop.html';
    }
    let detail = document.querySelector('.detail');
    detail.querySelector('.image img').src = info.image;
    detail.querySelector('.name').innerText = info.name;
    detail.querySelector('.price').innerText = info.price + 'DT';
    detail.querySelector('.description').innerText = info.description;
    detail.querySelector('.addcart').dataset.id = idproduct;
    //similar products
    let list_product=document.querySelector('.list_product');
    list_product.innerHTML = null;
    products.filter((value)=> value.id != idproduct).forEach(product => {//the filter to prevent the display of the same product
        let newproduct=document.createElement('div');
        newproduct.classList.add('item');
        newproduct.innerHTML=
        `
        <a href="/detail.html?id=${product.id}">
        <img src="${product.image}"/>
        <h2>${product.name}</h2>
        <div class="price">${product.price}DT</div>
        <button class="addcart"
        data-id="${product.id}">Add To Cart</button>
        `;
        list_product.appendChild(newproduct);
    })
}