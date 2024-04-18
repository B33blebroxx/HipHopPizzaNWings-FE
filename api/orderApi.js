import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getOrderDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.json().catch(() => resolve({}));
    }
    throw new Error('Network response was not ok.');
  })
    .then(resolve)
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orders/update/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getOrderTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderType`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const closeOrder = (orderId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRevenue = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/revenue`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve((data));
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

const getOrderTotal = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/${id}/total`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllOrders, getOrderDetails, deleteOrder, createOrder, updateOrder, getOrderTypes, closeOrder, getRevenue, getOrderTotal,
};
