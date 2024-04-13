import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function OrderItemCard({ orderItemObj }) {
  return (
    <Card className="orderitem-card">
      <Card.Body>
        <Card.Title>{orderItemObj.name}</Card.Title>
        <Card.Text>Price: {orderItemObj.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    id: PropTypes.number,
    orderId: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
