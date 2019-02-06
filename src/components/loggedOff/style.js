import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const BoxIconStyle = styled.div`
  width: ${pxToRem(96)};
  height: ${pxToRem(50)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${pxToRem(4)};
  margin: ${pxToRem(100)} 0;
`;

const ContentWhite = styled.div`
  width: ${pxToRem(540)};
  border-radius: ${pxToRem(5)};
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(2)} rgba(0, 0, 0, 0.14);
  @media ${props => props.theme.device.sm} {
    width: 100%;
  }
`;

const BoxLoginStyle = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    align-items: center;
    display: flex;
    justify-content: center;
    height: ${pxToRem(97)};
  }
`;

const BoxFormStyle = styled.div`
  display: flex;
  margin: ${pxToRem(48)} ${pxToRem(68)} ${pxToRem(68)};

  .actionRow {
    display: flex;
    align-items: center;
  }

  .actionCol {
  }
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1.5)};
  width: 100%;
`;

const BoxVerifyEmailStyle = styled.div`
  margin: ${pxToRem(80)} ${pxToRem(30)} ${pxToRem(58)};

  .actionVerify {
    display: flex;
    justify-content: center;
    margin-top: ${pxToRem(38)};
  }
`;

const ErrorFormStyle = styled.div`
  display: flex;
  height: ${pxToRem(20)};
  justify-content: center;
  position: relative;
  top: ${pxToRem(20)};
`;

export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Content = ({ children }) => <ContentWhite>{children}</ContentWhite>;

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxIcon = ({ children }) => <BoxIconStyle>{children}</BoxIconStyle>;

BoxIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxLogin = ({ children }) => <BoxLoginStyle>{children}</BoxLoginStyle>;

BoxLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxForm = ({ children }) => <BoxFormStyle>{children}</BoxFormStyle>;

BoxForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxVerifyEmail = ({ children }) => (
  <BoxVerifyEmailStyle>{children}</BoxVerifyEmailStyle>
);

BoxVerifyEmail.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ErrorForm = ({ children }) => <ErrorFormStyle>{children}</ErrorFormStyle>;

ErrorForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Line = () => <LineStyle />;
