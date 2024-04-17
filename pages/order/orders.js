import { useEffect, useState } from 'react';
import { getAllOrders } from '../../api/orderApi';
import OrderCard from '../../components/Cards/OrderCard';

export default function DisplayOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    getAllOrders().then(setOrders);
  };

  useEffect(() => {
    getOrders();
  });

  return (
    <div className="text-center my-auto">
      <h1 className="header">Orders</h1><br />
      <div className="order-card-container">
        {orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} onUpdate={getOrders} />
        ))}
      </div>
    </div>
  );
}
