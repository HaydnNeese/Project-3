import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import logo from '../../images/atlas-white-logo.png';
import './style.css';

const Nav = () => (
  <Menu id="navbar">
    <Container>
      <Menu.Item as="a" header href="/home">
        <Image
          size="small"
          src={logo}
        />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as="a" name="login" href="/" id="nav-link-login">
          Login
        </Menu.Item>

        <Menu.Item as="a" name="sign-up" href="/signup" id="nav-link-signup">
          Sign Up
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default Nav;