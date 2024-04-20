import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  createOrder, getOrderTypes, updateOrder,
} from '../../api/orderApi';

const initialState = {
  customerName: '',
  phoneNumber: '',
  email: '',
  dateCreated: '',
  orderTypeId: 1,
  isClosed: false,
};

export default function OrderForm({ orderObj }) {
  const [formData, setFormData] = useState({ ...initialState });
  const [orderTypes, setOrderTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (orderObj.id) setFormData(orderObj);
    getOrderTypes().then(setOrderTypes);
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'orderTypeId' ? Number(value) : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parsedValue,
      dateCreated: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.id) {
      updateOrder(formData).then(() => router.push(`/order/${orderObj.id}`));
    } else {
      createOrder(formData)?.then(() => router.push('/order/orders'));
    }
  };

  return (
    <Card className="form-card text-center" style={{ width: '350px' }}>
      <Card.Title>{orderObj.id ? 'Update' : 'Create New'} Order</Card.Title>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="customerName">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
          </Form.Group><br />
          <Form.Group controlId="phoneNumber">
            <Form.Label>Customer Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </Form.Group><br />
          <Form.Group controlId="email">
            <Form.Label>Customer Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group><br />
          <Form.Group>
            <Form.Label>Order Type</Form.Label>
            <Form.Select name="orderTypeId" onChange={handleChange} value={formData.orderTypeId} required>
              {orderTypes.map((orderType) => (
                <option key={orderType.id} value={orderType.id} label={orderType.type} />
              ))}
            </Form.Select>
          </Form.Group>
          <br />
          <Button type="submit" variant="primary">{orderObj.id ? 'Update' : 'Create'} Order</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    orderTypeId: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
