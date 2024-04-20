/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import smallLogo from '../assets/logo.png';

export default function NavBar() {
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand><Image width={65} height={65} layout="fixed" alt="logo" id="nav-logo" src={smallLogo} /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Button variant="outline-dark">
              <Link passHref href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
            </Button>
            <Button variant="outline-warning">
              <Link passHref href="/order/orders">
                <Nav.Link>Orders</Nav.Link>
              </Link>
            </Button>
            <Button variant="outline-danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
