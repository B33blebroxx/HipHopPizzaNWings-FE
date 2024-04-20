import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function RevenueCard({ revenueObj }) {
  return (
    <Card id="revcard">
      <Card.Body>
        <Card.Title>Revenue</Card.Title><br /><br />
        <Card.Text> Order Totals : ${revenueObj.subTotal} </Card.Text><br />
        <Card.Text> Tip Totals : ${revenueObj.tip}</Card.Text><br />
        <Card.Text> Total Revenue : ${revenueObj.total}</Card.Text>
      </Card.Body>
    </Card>
  );
}

RevenueCard.propTypes = {
  revenueObj: PropTypes.shape({
    subTotal: PropTypes.number,
    tip: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};
