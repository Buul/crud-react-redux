import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const ContainerStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${pxToRem(68)} ${pxToRem(78)} ${pxToRem(44)};
`;

const MessageContentStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${pxToRem(68)};
`;

const MessageStyle = styled.div`
  font-size: ${pxToRem(24)};
  font-weight: 600;
  line-height: ${pxToRem(30)};
  margin: ${pxToRem(10)} 0;
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1)};
  width: 100%;
  margin: ${pxToRem(64)} 0;
`;

export const Container = ({ children }) => <ContainerStyle>{children}</ContainerStyle>;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Message = ({ children }) => <MessageStyle>{children}</MessageStyle>;

Message.propTypes = {
  children: PropTypes.node.isRequired,
};

export const MessageContent = ({ children }) => (
  <MessageContentStyle>{children}</MessageContentStyle>
);

MessageContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Line = () => <LineStyle />;
