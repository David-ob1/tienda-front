// alert("hola")
const cartIcon = document.querySelector("#cart-icon")
const cart = document.querySelector(".cart")
const closeCart = document.querySelector("#cart-close")

console.log(cartIcon)
console.log(cart)
console.log(closeCart)


cartIcon.addEventListener("click",()=>{
    console.log("1")
    cart.classList.add("active")
})


closeCart.addEventListener("click",()=>{
    cart.classList.remove("active")
})

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",start)
}else{
    start();

}
//comenzar
function start(){
    addEvents()
}

//actualizar y volver a presentar
function update(){
    addEvents();
    updateTotal()
}

//eventos
function addEvents(){
//quitar articulos del carrito
let cartRemove_btns = document.querySelectorAll(".cart-remove")
console.log(cartRemove_btns)

cartRemove_btns.forEach(btn =>{
    btn.addEventListener("click",handle_removeCartItem)
    
})

//CAMBIAR CANTIDAD DE ARTICULOS

let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
cartQuantity_inputs.forEach( input =>{
    input.addEventListener("change",handle_changeItemQuantity)
})

//AÑADIR ARTICULOS AL CARRITO  

let addCart_btns = document.querySelectorAll(".add-cart")
addCart_btns.forEach((btn)=>{
    btn.addEventListener("click", handle_addCartItem)
})

}

//COMPRAR ORDEN 
const buy_btn = document.querySelector(".btn-buy")
buy_btn.addEventListener("click",handle_buyOrden)

//funciones de manejos de eventos

let itemsAdded = []
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML
    let price = product.querySelector(".product-price").innerHTML
    let imgSrc = product.querySelector(".product-img").src;

    console.log(title,price,imgSrc);

let newToAdd = {
    title,
    price,
    imgSrc,
}   

// El elemento de manejo ya existente


if(itemsAdded.find(el => el.title == newToAdd.title)){
alert("Este Articulo ya existe");
// return
}else {
itemsAdded.push(newToAdd)
}


let carBoxElement = cartBoxComponent(title, imgSrc)
let newNode = document.createElement("div")
newNode.innerHTML = carBoxElement
const cartContent = cart.querySelector(".cart-contnt")
cartContent.appendChild(newNode)

update()
}


function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAdded = itemsAdded.filter( el =>
        el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
    )

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value)|| this.value < 1){
        this.value = 1;
    }

    this.value = Math.floor(this.value)//numero entero

    update();

}

function handle_buyOrden(){

    if(itemsAdded.length <= 0){
        alert("aun no hay pedidos para realizar")
        return;
    }

    const cartContent = cart.querySelector(".cart-content")
    cartContent.innerHTML ="";
    alert("Su pedido se realizo con exito");
    itemsAdded = []
}

//duncion actualizar y renderizar