// Filter Product 
const btnFilter = document.querySelectorAll('[btn-status]');
if(btnFilter) {
    let url = new URL(window.location.href);
    btnFilter.forEach(btn_status => { 
        btn_status.onclick = () => {
            const status = btn_status.getAttribute('btn-status');
            status ? url.searchParams.set('status', status) : url.searchParams.delete('status');
            url.searchParams.delete('keyword');
            window.location = url;
        }
    });
}
// Search bar 
const formSearch = document.querySelector('#form-search');
const searchBar = document.querySelector('.search-bar');
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.onsubmit = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set('keyword', keyword);
        }
        else {
            url.searchParams.delete('keyword');
        }
        window.location = url;
    }
}