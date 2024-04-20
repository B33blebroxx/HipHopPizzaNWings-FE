import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';

import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-row justify-content-center align-content-center"
      style={{
        height: '90vh',
        marginTop: '100px',
        padding: '50px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Card
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '30rem',
          width: '30rem',
          alignItems: 'center',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>
        <Link passHref href="/order/orders"><Button variant="outline-light">Orders</Button></Link><br /><br />
        <Link href="/order/new" passHref><Button variant="outline-light">Create New Order</Button></Link><br /><br />
        <Link href="/revenue" passHref><Button variant="outline-light">Revenue</Button></Link><br /><br />
      </Card>
    </div>

  );
}

export default Home;
