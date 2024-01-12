// Sidebar
const btnPage = document.querySelectorAll('[btn-page]');
if(btnPage) {
    let url = new URL(window.location.href);
    let new_url;
    const currentPage = url.toString().split('/').pop();
    btnPage.forEach(btn => {
        if (currentPage === btn.getAttribute('btn-page'))
            btn.classList.add('active');
        btn.onclick = () => {
            const pageName = btn.getAttribute('btn-page');
            new_url = url.pathname.replace(currentPage, pageName);
            window.location = new_url;
        }
    });
}
// Filter Product 
const btnFilter = document.querySelectorAll('[btn-status]');
if(btnFilter) {
    let url = new URL(window.location.href);
    btnFilter.forEach(btn_status => { 
        btn_status.onclick = () => {
            const status = btn_status.getAttribute('btn-status');
            status ? url.searchParams.set('status', status) : url.searchParams.delete('status');
            url.searchParams.delete('keyword');
            url.searchParams.delete('page');
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

// Pagination
const pageNumbers = document.querySelectorAll('[page-number]');
const previousPage = document.querySelector('.previous-page');
const nextPage = document.querySelector('.next-page');
if(pageNumbers && previousPage && nextPage) {
    let url = new URL(window.location.href);
    const currentPage = parseInt(url.searchParams.get('page'));
    // Previous Button
    currentPage === 1 ? previousPage.classList.add('disable') : previousPage.classList.remove('disable');
    previousPage.onclick = () => { 
        if(currentPage != 1) {
            url.searchParams.set('page', currentPage - 1);
            window.location = url;
        }
    }
    // Next Button
    currentPage === pageNumbers.length ? nextPage.classList.add('disable') : nextPage.classList.remove('disable');
    nextPage.onclick = () => { 
        if(currentPage != pageNumbers.length) {
            url.searchParams.set('page', currentPage + 1);
            window.location = url;
        }
    }
    // Page Number Button
    pageNumbers.forEach(page => {
        page.onclick = () => {
            const pageNumber = page.getAttribute('page-number');
            url.searchParams.set('page', pageNumber);
            window.location = url;
        }
    });
}   