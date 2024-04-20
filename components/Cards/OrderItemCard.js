import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function OrderItemCard({ orderItemObj, isOrderClosed, onDelete }) {
  return (
    <Card id="orderitemcard" className="text-center" style={{ width: '275px' }}>
      <Card.Body>
        <Card.Title>{orderItemObj.name}</Card.Title>
        <Card.Text>Price: ${orderItemObj.price.toFixed(2)}</Card.Text>
        {!isOrderClosed && (
          <Button variant="danger" onClick={() => onDelete(orderItemObj?.orderItemId)}>
            Delete
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    orderItemId: PropTypes.number.isRequired,
    orderId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  isOrderClosed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
