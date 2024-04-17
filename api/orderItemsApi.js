import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOrderItems = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addItemToOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/addItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const removeItemFromOrder = (orderItemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/removeItem/${orderItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export { getOrderItems, addItemToOrder, removeItemFromOrder };
