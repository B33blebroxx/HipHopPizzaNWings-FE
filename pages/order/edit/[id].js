import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getOrderDetails } from '../../../api/orderApi';
import OrderForm from '../../../components/Forms/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getOrderDetails(id).then(setEditOrder);
  }, [id]);

  return (
    <div className="card-container">
      <OrderForm orderObj={editOrder} />
    </div>
  );
}
