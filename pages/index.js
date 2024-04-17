import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Click the button below to logout!</p><br />
      <Link passHref href="/order/orders"><Button variant="info">Orders</Button></Link><br /><br />
      <Link href="/order/new" passHref><Button variant="primary">Create New Order</Button></Link><br /><br />
      <Link href="/revenue" passHref><Button variant="secondary">Revenue</Button></Link><br /><br />
    </div>
  );
}

export default Home;
