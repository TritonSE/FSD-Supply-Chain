const BACKEND_URL = 'http://localhost:9000';

/**
 * Add a batch of an item.
 * @param {string} itemName The name of the item.
 * @param {string} itemId The ID of the item.
 * @param {number} weight The number of pounds to add.
 * @param {string} outDate The date that this batch should be sent by.
 * @returns A Promise resolving to whether the batch of the item was successfully added.
 */
export const postNewItem = async (itemName, itemId, weight, outDate) => {
    try {
        const response = await fetch(BACKEND_URL + '/items/addItem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                itemName,
                itemId,
                weight,
                outDate,
            })
        });

        if (response.status === 202) {
            return true;
        } else {
            console.error(response);
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

/**
 * Get all items and item batches.
 * @returns A Promise resolving to an array of item information, or null if the request fails.
 */
export const getAllItems = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/items/getAllItems', {
            method: 'GET',
        });

        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const auth = (route, username, password) => {
  return fetch(BACKEND_URL + "/" + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
};

export const signUp = (username, password) => {
  return auth("signup", username, password);
};

export const login = (username, password) => {
  return auth("login", username, password);
};
