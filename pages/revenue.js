import { useEffect, useState } from 'react';
import RevenueCard from '../components/Cards/RevenueCard';
import { getRevenue } from '../api/orderApi';

export default function Revenue() {
  const [revenue, setRevenue] = useState({});

  useEffect(() => {
    getRevenue().then(setRevenue);
  });

  return (
    <div id="revenue-container" className="card-container">
      <RevenueCard revenueObj={revenue} />
    </div>
  );
}
