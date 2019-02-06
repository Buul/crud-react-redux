import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio } from 'antd';
import { Typography } from './index';
import pxToRem from '../../helpers/scales';

const RadioGroup = Radio.Group;

const RadioStyle = styled(Radio)`
  .ant-radio .ant-radio-inner {
    border-color: ${props =>
      props.selected ? props.theme.colors.blueDark : props.theme.colors.grey} !important;
    background-color: ${props =>
      props.selected ? props.theme.colors.blueLight2 : props.theme.colors.white} !important;
  }

  .ant-radio .ant-radio-inner:after {
    background-color: ${props => props.theme.colors.blueDark} !important;
  }
  .ant-radio-input:focus + .ant-radio-inner {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }

  .ant-radio-checked:after {
    -webkit-animation: none !important;
    animation: none !important;
    -webkit-animation-fill-mode: none !important;
    animation-fill-mode: none !important;
  }

  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${props =>
      props.selected ? props.theme.colors.blueDark : props.theme.colors.grey} !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }

  .ant-radio-checked:after {
    border-color: ${props =>
      props.selected ? props.theme.colors.blueDark : props.theme.colors.grey} !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }
  .ant-radio:hover:after,
  .ant-radio-wrapper:hover .ant-radio:after {
    visibility: hidden !important;
  }

  span.ant-radio + * {
    color: ${props => props.theme.colors.grey} !important;
    font-family: proxima-nova !important;
    font-size: ${pxToRem(20)} !important;
    font-weight: 600 !important;
    padding-left: ${pxToRem(20)} !important;
    padding-right: ${props => pxToRem(props.paddingright)} !important;
  }
`;

const RadioGroupStyle = styled(RadioGroup)`
  .ant-radio-group {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
  }
`;

export const RadioUI = props => {
  // eslint-disable-next-line react/prop-types
  const { children, paddingright } = props;
  return (
    <RadioStyle paddingright={paddingright} {...props}>
      {children}
    </RadioStyle>
  );
};

RadioUI.propTypes = {
  paddingright: PropTypes.string,
};

RadioUI.defaultProps = {
  paddingright: '20',
};

export const RadioGroupUI = props => {
  const { children, label, margintop } = props;
  return (
    <div style={{ marginTop: pxToRem(margintop) }}>
      {label && (
        <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
          <Typography size={20} weight="600" lineheight="26">
            {label}
          </Typography>
        </div>
      )}
      <RadioGroupStyle {...props}>{children}</RadioGroupStyle>
    </div>
  );
};

RadioGroupUI.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  margintop: PropTypes.string,
};

RadioGroupUI.defaultProps = {
  label: '',
  margintop: '0',
};

export default RadioUI;
