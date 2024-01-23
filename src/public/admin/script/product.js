// Change Product Status
const btnChangeStatus = document.querySelectorAll('[btn-change-status]');
if(btnChangeStatus) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    btnChangeStatus.forEach(btn => {
        btn.onclick = () => {
            const currentStatus = btn.getAttribute('badge-status');
            const productId = btn.getAttribute('data-id');
            let statusChange = currentStatus === 'active' ? 'inactive' : 'active';
            const action = `${path}/${statusChange}/${productId}?_method=PATCH`;
            formChangeStatus.setAttribute('action', action);
            formChangeStatus.submit();          
        }
    });
}
// Select Multiple
const deleteForm = document.forms["delete-product-form"];
const deleteBtn = document.querySelector("#delete-btn");
const deleteOneModal = document.getElementById("deleteOneModal");
const selectAllCheck = document.querySelector("#checkBoxAll");
const allOfProductCheckBox = Array.from(document.querySelectorAll('#productCheckBox'));
const selectBox = document.querySelector('#selectBox');
const btnSelectBox = document.querySelector('#btnSelectBox');
const confirmButton = document.querySelector('#confirmButton');
const selectedProductForm = document.querySelector('[name="selected-product-form"]');
var productId;
// Delete one
if (deleteOneModal) {
    deleteOneModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        productId = button.getAttribute("data-bs-id");
    });
    deleteBtn.onclick = () => {
        const path = deleteForm.getAttribute('data-path');
        deleteForm.setAttribute("action", `${path}/${productId}?_method=PATCH`);
        deleteForm.submit();
    };
}
// Check All 
var curNumberOfChecks;
function BtnCheck() { 
    curNumberOfChecks = document.querySelectorAll('input[id="productCheckBox"]:checked').length;
    selectBox.value > 0 && curNumberOfChecks > 0 ? btnSelectBox.disabled = false : btnSelectBox.disabled = true;
}
selectAllCheck.onclick = () => {
    allOfProductCheckBox.forEach(checkBox => checkBox.checked=selectAllCheck.checked);
    BtnCheck();
}
allOfProductCheckBox.forEach(checkBox => {
    checkBox.onclick = () => {
        curNumberOfChecks = document.querySelectorAll('input[id="productCheckBox"]:checked').length;
        curNumberOfChecks === allOfProductCheckBox.length ? selectAllCheck.checked=true : selectAllCheck.checked=false;
        BtnCheck();
    }
})
selectBox.onchange = () => {
    BtnCheck();
}
// Select Method Submit
confirmButton.onclick = () => { 
    const inputIds = document.querySelectorAll("input[name='product']:checked");
    const POS = [];
    inputIds.forEach(inputId => {
        const position = inputId
            .closest('tr')
            .querySelector("input[name='position']").value;
        POS.push(position);
    });
    console.log(POS);
    confirmButton.value = POS;
    selectedProductForm.submit();
}

