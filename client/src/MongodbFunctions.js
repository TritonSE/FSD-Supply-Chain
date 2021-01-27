export const postNewItem = (itemName, itemId, weight, outByDate) => {
    fetch('http://localhost:9000/items/addItem', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            itemName: itemName,
            itemId: itemId,
            weight: weight,
            outByDate: outByDate
        })
    }).then(res => {
        if (res.status != 202) {
            console.error(res);
        }
    });
}