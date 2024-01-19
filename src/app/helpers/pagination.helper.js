module.exports = (totalProduct, query) => { 
    const pagination = {
        limit: 4,
        currentPage: 1
    };
    const totalPage = Math.ceil(totalProduct / pagination.limit);
    pagination.totalPage = totalPage;
    if(query.page) {
        pagination.currentPage = parseInt(query.page);
    }
    pagination.indexStartProduct = (pagination.currentPage - 1) * pagination.limit;
    return pagination;
}