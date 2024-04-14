import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function OrderDetailsCard({ orderObj }) {
  return (
    <div>
      <Card className="card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">Customer Name: {orderObj.customerName}</Card.Title>
          <Card.Text className="card-text">Phone Number: {orderObj.phoneNumber}</Card.Text>
          <Card.Text className="card-text">Email: {orderObj.email}</Card.Text>
          <Card.Text className="card-text">Order Type: {orderObj.orderType?.type}</Card.Text>
          <Card.Text className="card-text">Order Status: {orderObj.isClosed ? 'Closed' : 'Open'}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

OrderDetailsCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customerName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    isClosed: PropTypes.bool,
    orderType: PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
    }),
  }).isRequired,
};
