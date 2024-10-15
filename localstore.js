const handleProduct = ()=>{
    const productField = document.getElementById('product-name');
    const quantityField = document.getElementById('product-quantity');
    const priceField = document.getElementById('product-price');
    const messageField = document.getElementById('message');

    const productName = productField.value;
    const productQuantity = parseInt(quantityField.value);
    const productPrice = parseInt(priceField.value);
    console.log(productName,productQuantity,productPrice  );

    if(!productName ||!productQuantity ||!productPrice){
        return messageField.innerText = "Please fill all required fields";
    }

    const product = {
        name: productName,
        quantity: productQuantity,
        price: productPrice
    }
  
    displayProduct(product.name, product.quantity, product.price);
    saveProductToLocalStore(product.name, product.quantity, product.price);
}

const displayProduct = (product, quantity, price)=>{
    const productList = document.getElementById('product-list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${product}</td>
    <td>${quantity}</td>
    <td>${price}</td>
    <td><button onclick="clearCart('${product}')">Remove</button></td>
    `
    productList.appendChild(tr);

}

const getLocalStoreData = ()=>{
    let cart = {};
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
        cart = JSON.parse(storedCart);
    }
    return cart;
    
}

const saveProductToLocalStore = (product, quantity, price)=> {
    let cart = getLocalStoreData();
    cart[product] = {quantity, price};
    const cartStringfied =  JSON.stringify(cart)
    localStorage.setItem('cart',cartStringfied); 
}

const displayCartFromLocalStore = ()=>{
    const saveCart = getLocalStoreData();
    for(let product in saveCart){
        displayProduct(product, saveCart[product].quantity, saveCart[product].price);
    }
}

const clearCart = ()=>{
    localStorage.removeItem('cart');
    document.getElementById('product-list').innerHTML = '';
    alert('Cart cleared!');
}


displayCartFromLocalStore();