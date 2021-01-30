const host = 'http://localhost:9000';

export const postNewItem = (itemName, itemId, weight, outDate) => {
    fetch(host + '/items/addItem', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            itemName: itemName,
            itemId: itemId,
            weight: weight,
            outDate: outDate
        })
    }).then(res => {
        if (res.status != 202) {
            console.error(res.text());
        }
    });
}

export const getAllItems = async () => {
    const response = await fetch(host + '/items/getAllItems', {
        method: 'GET',
    });
    return response.json();
}