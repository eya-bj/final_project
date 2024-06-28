/**************closing and opening the cart slide**************** */
import products from "./products.js";
    const cart=()=>{
    let iconCart=document.querySelector('.icon-cart');
    let closebtn=document.querySelector('.cartTab .close');
    let body=document.querySelector('body');
    let cart=[];
    
    iconCart.addEventListener('click',()=>{
        body.classList.toggle('activeTabCart');
    })
    closebtn.addEventListener('click',()=>{
        body.classList.toggle('activeTabCart');
    })
    const setproductincart = (idproduct, quantity, position) => {
            if (quantity > 0) {
              if (position < 0) {
                cart.push({ product_id: idproduct, quantity: quantity });
              } else {
                cart[position].quantity = quantity;
              }
            } else {
              cart.splice(position, 1);
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            refreshcarthtml();
          };
    const refreshcarthtml=()=>{
        let listhtml = document.querySelector('.listCart');
        let totalhtml = document.querySelector('.icon-cart span');
        let totalquantity = 0;
        listhtml.innerHTML = null;
        cart.forEach(item => {
            totalquantity = totalquantity + item.quantity;
            let position = products.findIndex((value)=> value.id == item.product_id);
            let info = products[position];
            let newitem = document.createElement('div');
            newitem.classList.add('item');
            newitem.innerHTML=
            `
            <div class="image">
                <img src="${info.image}" />
            </div>
            <div class="name">${info.name}</div>
            <div class="totalprice">
            ${info.price*item.quantity}DT
            </div>
            <div class="quantity">
                <span class="minus" data-id="${info.id}">-</span>
                <span>${item.quantity}</span>
                <span class="plus" data-id="${info.id}">+</span>
            </div>
            `;
            listhtml.appendChild(newitem);
        })
        totalhtml.innerText = totalquantity;
    }
    //event click
    document.addEventListener('click',(event)=>{
        let buttonclick= event.target;
        let idproduct= buttonclick.dataset.id;
        let position= cart.findIndex((value) => value.product_id == idproduct)
        let quantity= position < 0 ? 0 : cart[position].quantity;

        if (buttonclick.classList.contains('addcart') || buttonclick.classList.contains('plus')){
            quantity++;
            setproductincart(idproduct , quantity , position);
        }
        else if (buttonclick.classList.contains('minus')){
            quantity--;
            setproductincart(idproduct , quantity , position);
        }
    })
    const initApp=()=>{
       if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
       }
       refreshcarthtml();
    }
    initApp();
    }
    export default cart ;
 

