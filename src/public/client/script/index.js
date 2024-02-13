// Search bar 
const formSearch = document.querySelector('#form-search');
const searchBar = document.querySelector('.search-bar');
const submitBtn = document.querySelector('.submit-btn');
if(formSearch) {
    let url = new URL(window.location.href);
    submitBtn.onclick = (e) => {
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set('keyword', keyword);
        }
        else {
            url.searchParams.delete('keyword');
        }
        formSearch.submit();
    }
}
// Hidden Showing Alert
const exitBtnAlert = document.querySelector('.message i'); 
const Alert = document.querySelector('.message');
if(exitBtnAlert) {
    exitBtnAlert.addEventListener('click', () => {
        Alert.remove();
    });
    const timeDelay = Alert.getAttribute('time-delay');
    setTimeout(() => {
        if(Alert) Alert.remove();
    }, timeDelay + 500)
}