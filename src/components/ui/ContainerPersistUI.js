import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  display: 'flex';
  flex-direction: 'column';
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

const ContainerPersistUI = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

ContainerPersistUI.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerPersistUI;
