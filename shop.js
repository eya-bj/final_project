import cart from "./cart.js";
import products from "./products.js";
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
const initApp =()=>{
    //load list product
    let list_product=document.querySelector('.list_product');
    list_product.innerHTML = null;
    products.forEach(product => {
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
$(function(){
    $(".toogle").on("click",function(){
        if($("menu").hasClass("active")){
            $(".menu").removeClass("active");
            $(this).find("a").html("<ion-icon name='menu-outline'></ion-icon>");
        }
        else{
            $(".menu").addClass("active");
            $(this).find("a").html("<ion-icon name='close-outline'></ion-icon>");
        }
    });
});