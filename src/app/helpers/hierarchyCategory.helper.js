const createTree = (arr, parentId='') => {
    const tree = [];
    arr.forEach(item => {
        if(item.parentId === parentId) {
            const children = createTree(arr, item.id);
            if(children.length > 0)
                item.children = children;
            tree.push(item);
        }
    });
    return tree;
}

module.exports = createTree;