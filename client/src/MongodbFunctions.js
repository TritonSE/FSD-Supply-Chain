const BACKEND_URL = "http://localhost:9000";

export const postNewItem = (token, itemName, itemId, weight, outByDate) => {
  fetch(BACKEND_URL + "/items/addItem", {
    method: "POST",
    headers: { "Content-Type": "application/json", token: token },
    body: JSON.stringify({
      itemName: itemName,
      itemId: itemId,
      weight: weight,
      outDate: outByDate,
    }),
  }).then((res) => {
    if (res.status !== 202) {
      console.error(res);
    }
  });
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
