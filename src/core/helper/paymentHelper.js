import { API } from "../../backend";

export const getOrderData = (amount, token) => {
  return fetch(`${API}/getPaymentOrder`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
