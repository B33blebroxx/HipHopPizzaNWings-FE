import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { closeOrder, getOrderDetails } from '../../api/orderApi';

const initialState = {
  isClosed: true,
  tip: 0,
};

export default function CloseOrderForm({ orderObj }) {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { id: orderId } = router.query;
  useEffect(() => {
    if (orderObj.id) {
      getOrderDetails(orderObj.id).then(setFormData);
    }
  }, [orderObj]);

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
    console.log(updatedFormData, orderId);
    closeOrder(orderId, updatedFormData)
      .then(() => {
        router.push('/order/orders');
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Order Close</Card.Title>
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