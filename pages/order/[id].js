import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getOrderDetails, getOrderItems } from '../../api/orderApi';
import OrderDetailsCard from '../../components/Cards/OrderDetailsCard';
import OrderItemCard from '../../components/Cards/OrderItemCard';

export default function ViewOrderDetails() {
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const isClosed = order.isClosed === true;

  useEffect(() => {
    getOrderDetails(id).then(setOrder);
    getOrderItems(id).then(setOrderItems);
  }, [order.id]);

  return (
    <>
      <div className="card-container">
        <OrderDetailsCard orderObj={order} onUpdate={setOrder} /><br />
        {!isClosed && (<Button variant="primary">Close Order</Button>)}
      </div><br />
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      /><br />
      {!isClosed && (
        <div id="add-item-button">
          <Button variant="primary">Add Item</Button>
        </div>
      )}<br /><br />
      <div className="card-container">
        {orderItems.map((orderItem) => (
          <OrderItemCard key={orderItem.id} orderItemObj={orderItem} onUpdate={setOrderItems} />
        ))}
      </div>
    </>
  );
}
