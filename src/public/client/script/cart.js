// Quantity Product On Change
const inputs = document.querySelectorAll('.quantity-product-input'); 

if(inputs) {
    inputs.forEach(input => {
        input.onchange = () => {
            const quantity = input.value;
            const productId = input.getAttribute('data-id');
            window.location.href = `/cart/update/${productId}/${quantity}`;
        }
    })
}
