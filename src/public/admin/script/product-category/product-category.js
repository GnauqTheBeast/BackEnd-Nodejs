// Delete Product Category
const deleteForm = document.querySelector('#delete-form');
const modal = document.querySelector('#deleteOneModal');
const deleteBtn = document.querySelector('#delete-btn');
let categoryId;
if(deleteForm && modal) {
    modal.addEventListener('show.bs.modal', e => {
        const button = e.relatedTarget;
        categoryId = button.getAttribute('data-bs-id');
    });
    deleteBtn.onclick = () => {
        const path = deleteForm.getAttribute('data-path');
        deleteForm.action = `${path}/${categoryId}?_method=DELETE`;
        deleteForm.submit();
    }
}
// Change Product Status
const btnChangeStatus = document.querySelectorAll('[btn-change-status]');
if(btnChangeStatus) {
    const formChangeStatus = document.querySelector('#form-change-status');
    const path = formChangeStatus.getAttribute('data-path');
    btnChangeStatus.forEach(btn => {
        btn.onclick = () => {
            const currentStatus = btn.getAttribute('badge-status');
            const categoryId = btn.getAttribute('data-id');
            let statusChange = currentStatus === 'active' ? 'inactive' : 'active';
            const action = `${path}/${statusChange}/${categoryId}?_method=PATCH`;
            formChangeStatus.setAttribute('action', action);
            formChangeStatus.submit();          
        }
    });
}
//
const selectAllCheck = document.querySelector("#checkBoxAll");
const allOfProductCheckBox = Array.from(document.querySelectorAll('#categoryCheckBox'));
const selectBox = document.querySelector('#selectBox');
const btnSelectBox = document.querySelector('#btnSelectBox');
const confirmButton = document.querySelector('#confirmButton');
const selectedCategoryForm = document.querySelector('#selected-category-form');

var curNumberOfChecks;
function BtnCheck() { 
    curNumberOfChecks = document.querySelectorAll('input[id="categoryCheckBox"]:checked').length;
    selectBox.value > 0 && curNumberOfChecks > 0 ? btnSelectBox.disabled = false : btnSelectBox.disabled = true;
}
selectAllCheck.onclick = () => {
    allOfProductCheckBox.forEach(checkBox => checkBox.checked=selectAllCheck.checked);
    BtnCheck();
}
allOfProductCheckBox.forEach(checkBox => {
    checkBox.onclick = () => {
        curNumberOfChecks = document.querySelectorAll('input[id="categoryCheckBox"]:checked').length;
        curNumberOfChecks === allOfProductCheckBox.length ? selectAllCheck.checked=true : selectAllCheck.checked=false;
        BtnCheck();
    }
})
selectBox.onchange = () => {
    BtnCheck();
}
// Select Method Submit
confirmButton.onclick = () => { 
    const inputIds = document.querySelectorAll("input[name='category']:checked");
    const POS = [];
    inputIds.forEach(inputId => {
        const position = inputId
            .closest('tr')
            .querySelector("input[name='position']").value;
        POS.push(position);
    });
    console.log(POS);
    confirmButton.value = POS;
    selectedCategoryForm.submit();
}