import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select, Icon } from 'antd';
import pxToRem from '../../helpers/scales';
import TypographyUI from './TypographyUI';

const Container = styled.div`
  margin-bottom: ${props => pxToRem(props.margin)};

  @media ${props => props.theme.device.md} {
    margin-bottom: 0;
  }
`;

const SelectStyle = styled(Select)`
  .ant-select-focused {
    border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;

    &:focus {
      border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;
    }

    &:active {
      border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;
    }
  }

  .ant-select-selection-selected-value {
    font-family: proxima-nova !important;
    font-size: ${props => props.theme.input.font.size} !important;
    padding-left: ${pxToRem(9)} !important;
  }

  .ant-select-selection--single,
  .ant-select-selection {
    background-color: ${props => props.theme.colors.greyDark} !important;
    border: ${pxToRem(1)} solid ${props => props.theme.select.border.color[props.typeInput]};
    box-shadow: none !important;
    height: ${pxToRem(50)} !important;
    outline: none !important;
    &:focus {
      border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;
    }

    &:active {
      border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;
    }

    &:hover {
      border: ${pxToRem(2)} solid ${props => props.theme.select.hover.border.color[props.typeInput]} !important;
    }

    ${props =>
      props.error
        ? `
          &:hover {
            border:  ${pxToRem(2)} solid ${props.theme.select.hover.border.color.error}!important;
          }

          &:focus {
            border:${pxToRem(2)} solid ${props.theme.select.hover.border.color.error}!important;
            
          }
          border: ${pxToRem(2)} solid ${props.theme.select.hover.border.color.error}!important;

        `
        : ''};
  }

  .ant-select-selection__rendered {
    height: ${pxToRem(50)} !important;
    display: flex !important;
    align-items: center !important;
  }
`;

const IconSelect = icon => <Icon style={{ color: '#1F2A41' }} type={icon} />;

const SelectUI = props => {
  // eslint-disable-next-line react/prop-types
  const { typeInput, margin, label, required, error, errortext, suffixIcon } = props;
  return (
    <Container margin={margin}>
      {label && (
        <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
          <TypographyUI size={20} weight="600" lineheight="26">
            {label} {required && <span style={{ marginLeft: 8, color: '#999DAF' }}> *</span>}
          </TypographyUI>
        </div>
      )}

      <SelectStyle
        {...props}
        suffixIcon={IconSelect(suffixIcon)}
        typeInput={typeInput}
        margin={margin}
      />
      <div style={{ margin: ` ${pxToRem(15)} 0 0`, height: pxToRem(20) }}>
        <TypographyUI size={20} color="error" lineheight="26">
          {error && errortext}
        </TypographyUI>
      </div>
    </Container>
  );
};

SelectUI.propTypes = {
  required: PropTypes.bool,
  typeInput: PropTypes.string,
  margin: PropTypes.string,
  label: PropTypes.string,
  errortext: PropTypes.string,
};

SelectUI.defaultProps = {
  required: false,
  typeInput: 'primary',
  margin: '28',
  label: '',
  errortext: '',
};

export default SelectUI;
