import React from 'react';
import { Container, BoxIcon, Content } from './style';
import Login from './Login';
import Icon from '../ui/IconUI';

const Index = props => (
  <Container>
    <BoxIcon>
      <Icon size="96" color="blueMedium" tag="logo" />
    </BoxIcon>
    <Content>
      <Login {...props} />
    </Content>
  </Container>
);

export default Index;
