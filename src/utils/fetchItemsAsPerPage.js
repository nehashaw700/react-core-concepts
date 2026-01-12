const fetchItems = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = [];
            for(let i = 1; i <= 10; i++){
                result.push('Items ' + ((page - 1) * 10 + i));
            }

            resolve(result);
        }, 500);

    });
}

export default fetchItems;