// Destroy Product
const destroyOneModal = document.getElementById("destroyOneModal");
const destroyForm = document.querySelector('#destroy-form');
const destroyBtn = document.querySelector('#destroy-btn');
var productId;
if (destroyOneModal) {
    destroyOneModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        productId = button.getAttribute("data-id");
    });
    destroyBtn.onclick = () => {
        const path = destroyForm.action;
        destroyForm.setAttribute("action", `${path}/${productId}?_method=DELETE`);
        destroyForm.submit();
    };
}

// Restore Product
const restoreForm = document.querySelector('#restore-form');
const restoreBtns = document.querySelectorAll('.restore-btn');
restoreBtns.forEach(restoreBtn => {
    restoreBtn.onclick = () => {
        const path = restoreForm.action;
        const productId = restoreBtn.getAttribute('data-id');
        restoreForm.action = `${path}/${productId}?_method=PATCH`;
        restoreForm.submit();
    }
});