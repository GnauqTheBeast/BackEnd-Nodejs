// Image Preview
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage) {
    const uploadImagePreview = document.querySelector('#imagePreview');
    uploadImage.onchange = (e) => {
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    }
}