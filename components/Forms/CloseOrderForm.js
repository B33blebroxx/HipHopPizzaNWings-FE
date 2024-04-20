import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { closeOrder, getOrderDetails, getOrderTotal } from '../../api/orderApi';

const initialState = {
  isClosed: false,
  tip: 0,
};

export default function CloseOrderForm({ orderObj }) {
  const [formData, setFormData] = useState(initialState);
  const [orderTotal, setOrderTotal] = useState({ subTotal: 0, total: 0, tip: 0 });
  const router = useRouter();
  const { id: orderId } = router.query;

  useEffect(() => {
    if (orderObj.id) {
      getOrderDetails(orderObj.id).then(setFormData);
    }
  }, [orderObj]);

  useEffect(() => {
    if (orderObj.isClosed === false) {
      getOrderTotal(orderId)?.then(setOrderTotal);
    }
    console.log(orderObj);
  }, [orderTotal.subTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      dateClosed: new Date(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tip = parseFloat(formData.tip);
    const updatedFormData = { ...formData, tip };
    closeOrder(orderId, updatedFormData)
      .then(() => {
        router.push('/order/orders');
      });
  };

  return (
    <div>
      <Card style={{ textAlign: 'center', marginTop: '150px', width: '350px' }}>
        <Card.Body>
          <Card.Title>Order Close</Card.Title>
          <Card.Text className="subtotal"><strong>Order SubTotal: ${orderTotal.subTotal}.00</strong></Card.Text>
        </Card.Body>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Tip</Form.Label>
            <Form.Control type="number" name="tip" value={formData.tip} onChange={handleChange} required />
          </Form>
        </Card.Body>
        <Card.Footer><Button onClick={handleSubmit} variant="primary">Close Order</Button></Card.Footer>
      </Card>
    </div>
  );
}

CloseOrderForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    tip: PropTypes.number,
    dateClosed: PropTypes.string,
    isClosed: PropTypes.bool,

  }),
};

CloseOrderForm.defaultProps = {
  orderObj: initialState,
};
