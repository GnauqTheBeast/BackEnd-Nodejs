module.exports = (query) => { 
    const searchInfo = {};
    if(query.keyword) {
        const re = new RegExp(query.keyword, "i");
        searchInfo.title = re;
        searchInfo.keyword = query.keyword;
    }
    return searchInfo;
}