import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export default function OrderCard({ orderObj }) {
  return (
    <Card className="card">
      <Card.Body className="card-body">
        <Card.Title className="card-title">Customer Name: {orderObj.customerName}</Card.Title>
        <Card.Text className="card-text">Phone Number: {orderObj.phoneNumber}</Card.Text>
        <Card.Text className="card-text">Email: {orderObj.email}</Card.Text>
        <Card.Text className="card-text">Order Type: {orderObj.orderType.type}</Card.Text>
        <Card.Text className="card-text">Order Status: {orderObj.isClosed ? 'Closed' : 'Open'}
        </Card.Text>
        <Card.Footer><Button variant="outline-light"><Link href={`/order/${orderObj.id}`}>Details</Link></Button></Card.Footer>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
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
