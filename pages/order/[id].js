import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrder, getOrderDetails, getOrderTotal } from '../../api/orderApi';
import OrderDetailsCard from '../../components/Cards/OrderDetailsCard';
import OrderItemCard from '../../components/Cards/OrderItemCard';
import { getOrderItems, addItemToOrder, removeItemFromOrder } from '../../api/orderItemsApi';
import getItems from '../../api/itemsApi';
import Spinbox from '../../components/Spinbox';

export default function ViewOrderDetails() {
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [itemQuantity, setItemQuantity] = useState({});
  const [orderTotal, setOrderTotal] = useState({ subTotal: 0, total: 0, tip: 0 });
  const router = useRouter();
  const { id } = router.query;
  const isClosed = order.isClosed === true;
  const deleteOrderPrompt = () => {
    if (window.confirm('Delete this order?')) {
      deleteOrder(order.id).then(() => router.push('/order/orders'));
    }
  };

  useEffect(() => {
    getOrderDetails(id).then(setOrder);
    getOrderItems(id).then(setOrderItems);
    getItems().then((items) => {
      setAvailableItems(items);
    });
  }, [id]);

  useEffect(() => {
    if (showModal) {
      const initialCounts = {};
      availableItems.forEach((item) => {
        initialCounts[item.id] = 0;
      });
      setItemQuantity(initialCounts);
    }
  }, [showModal, availableItems]);

  useEffect(() => {
    if (!order.id) {
      getOrderTotal(id)?.then(setOrderTotal);
    }
  }, [orderTotal]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    setItemQuantity((prevState) => ({ ...prevState, [itemId]: newQuantity }));
  };

  const handleDeleteItem = (orderItemId) => {
    removeItemFromOrder(orderItemId)
      .then(() => {
        getOrderItems(id).then((newItems) => setOrderItems(newItems));
      });
  };

  const handleSaveChanges = () => {
    availableItems.forEach((item) => {
      const quantity = itemQuantity[item.id];
      if (quantity > 0) {
        const addPromises = [];
        for (let i = 0; i < quantity; i++) {
          const payload = {
            orderId: id,
            itemId: item.id,
          };
          addPromises.push(addItemToOrder(payload));
        }
        Promise.all(addPromises)
          .then(() => {
            getOrderItems(id).then(setOrderItems);
          })
          .catch((error) => {
            console.error('Error adding items:', error);
          });
      }
    });
    handleCloseModal();
  };

  return (
    <>
      <div className="order-details">
        <OrderDetailsCard orderObj={order} onUpdate={setOrder} /><br />
        <Link href={`/order/edit/${order.id}`} passHref><Button>Edit Order Details</Button></Link><Button variant="danger" onClick={deleteOrderPrompt}>Delete Order</Button>{!isClosed && (<Link href={`/order/payment/${router.query.id}`} passHref><Button variant="dark">Close Order</Button></Link>)}
      </div><br />
      <hr
        style={{
          backgroundColor: 'black',
          color: 'black',
          borderColor: 'black',
          height: '1px',
        }}
      /><br />
      <div className="card-container">
        {orderItems.map((orderItem) => (
          <OrderItemCard key={orderItem.orderItemId} orderItemObj={orderItem} isOrderClosed={isClosed} onDelete={handleDeleteItem} onUpdate={setOrderItems} />
        ))}<br /><br />
      </div>
      {!isClosed && (
        <div id="add-item-button">
          <Button variant="primary" onClick={handleShowModal}>Add Item</Button>
        </div>
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Items to Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableItems.map((item) => (
            <Card key={item.id} className="mb-2">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                <Spinbox
                  value={itemQuantity[item.id] || 0}
                  onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                /><br />
                <Card.Text><strong>Order SubTotal: ${orderTotal.subTotal}.00</strong></Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
