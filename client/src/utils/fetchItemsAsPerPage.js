const fetchItems = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = [];
            for(let i = 1; i <= 20; i++){
                result.push('Item ' + ((page - 1) * 20 + i));
            }

            resolve(result);
        }, 500);

    });
}

export default fetchItems;