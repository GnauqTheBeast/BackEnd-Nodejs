// Add to cart
const buyNowButton = document.querySelector('.buy-now-btn');
const addCartButton = document.querySelector('.cart-btn');
const form = document.querySelector('form');

if(form) {
    addCartButton.onclick = () => {
        form.submit();
    }
}