import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const PainelStyle = styled.div`
  margin-top: 3.875rem;
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1.5)};
  width: 100%;
  margin: ${pxToRem(48)} 0;
`;

const BtnPainelStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: ${pxToRem(52)} 0;
`;

export const PersistBtnPainelUI = ({ children }) => <BtnPainelStyle>{children}</BtnPainelStyle>;

PersistBtnPainelUI.propTypes = {
  children: PropTypes.node.isRequired,
};

export const PersistLineUI = () => <LineStyle />;

export const PersistPainelUI = ({ children }) => <PainelStyle>{children}</PainelStyle>;

PersistPainelUI.propTypes = {
  children: PropTypes.node.isRequired,
};
