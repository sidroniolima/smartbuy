import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} width={48} height="auto" alt="Logo" />
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/purchases">COMPRAS</Link>
        </nav>
        <aside>
          <strong>Sidronio Lima</strong>
          <Link to="/dashboard">Meu perfil</Link>
        </aside>
      </Content>
    </Container>
  );
}
