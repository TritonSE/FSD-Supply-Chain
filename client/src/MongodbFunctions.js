const BACKEND_URL = "http://localhost:9000";

/**
 * Add a batch of an item.
 * @param {string} itemName The name of the item.
 * @param {string} batchId The id of the batch.
 * @param {number} weight The number of pounds to add.
 * @param {string} outDate The date that this batch should be sent by.
 * @returns A Promise resolving to whether the batch of the item was successfully added.
 */
export const postNewItem = async (
  token,
  itemName,
  batchId,
  weight,
  outDate
) => {
  try {
    const response = await fetch(BACKEND_URL + "/items/addItem", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        itemName: itemName,
        batchId: batchId,
        weight: weight,
        outDate: outDate,
      }),
    });

    if (response.status === 202) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

/**
 * Get all items and item batches.
 * @returns A Promise resolving to an array of item information, or null if the request fails.
 */
export const getAllItems = async (token) => {
  try {
    const response = await fetch(BACKEND_URL + "/items/getAllItems", {
      method: "GET",
      headers: { token: token },
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
};

export const editItem = async (token, itemName, oldBatchId, newBatchId, weight, outDate) => {
  try {
    const response = await fetch(BACKEND_URL + "/items/editItem", {
      method: "PUT",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({
        itemName: itemName,
        oldBatchId: oldBatchId,
        newBatchId: newBatchId,
        weight: weight,
        outDate: outDate,
      }),
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
};

export const auth = (route, email, password) => {
  return fetch(BACKEND_URL + "/" + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const signUp = (email, password) => {
  return auth("signup", email, password);
};

export const login = (email, password) => {
  return auth("login", email, password);
};

export const resetPassword = (token, password) => {
  return fetch(BACKEND_URL + "/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
};

export const forgotPassword = (email) => {
  return fetch(BACKEND_URL + "/forgot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};
