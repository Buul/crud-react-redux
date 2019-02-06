import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/pt_BR';
import IconUI from './IconUI';
import TypographyUI from './TypographyUI';
import pxToRem from '../../helpers/scales';

const DatePickerStyle = styled(DatePicker)`
  width: 100% !important;

  .ant-input {
    background-color: ${props => props.theme.colors.greyDark} !important;
    border: ${pxToRem(1)} solid ${props => props.theme.input.border.color[props.typeInput]};
    border-radius: ${pxToRem(5)} !important;
    box-shadow: none !important;
    color: ${props => props.theme.colors.black};
    font-family: proxima-nova;
    font-size: ${pxToRem(20)};
    height: ${pxToRem(50)} !important;
    outline: none !important;

    &:hover {
      border: ${pxToRem(2)} solid
        ${props => props.theme.input.hover.border.color[props.typeInput]}!important;
    }

    &:focus {
      border: ${pxToRem(2)} solid
        ${props => props.theme.input.hover.border.color[props.typeInput]}!important;
    }
  }

  .ant-calendar-picker-clear {
    background-color: ${props => props.theme.colors.greyDark} !important;
  }

  .ant-calendar-picker-icon {
    display: ${props => (props.error ? 'none' : 'block')};
  }

  ${props =>
    props.error
      ? `
    .ant-input {
          &:hover {
            border:  ${pxToRem(2)} solid ${props.theme.input.hover.border.color.error}!important;  
          }

          &:focus {
            border:${pxToRem(2)} solid ${props.theme.input.hover.border.color.error}!important;  
            
          }
          border: ${pxToRem(2)} solid ${props.theme.input.hover.border.color.error}!important;  
    }
        `
      : ''};
`;

const InputLayout = styled.div`
  position: relative;
  width: 100%;
`;

const IconBox = styled.div`
  position: absolute;
  right: ${pxToRem(12)};
  bottom: ${pxToRem(12)};
  display: ${props => props.display};
`;
const Container = styled.div`
  margin-bottom: ${props => pxToRem(props.margin)};
`;

const DatePickerUI = props => {
  // eslint-disable-next-line react/prop-types
  const { required, label, errortext, error, typeInput, margin, dateValue } = props;
  return (
    <Container margin={margin}>
      {label && (
        <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
          <TypographyUI size={20} weight="600" lineheight="26">
            {label} {required && <span style={{ marginLeft: 8, color: '#999DAF' }}> *</span>}
          </TypographyUI>
        </div>
      )}
      <InputLayout>
        <DatePickerStyle
          value={dateValue ? moment(dateValue, 'DD-MM-YYYY') : null}
          {...props}
          locale={locale}
          typeInput={typeInput}
          format="DD-MM-YYYY"
        />
        <IconBox display={error ? 'block' : 'none'}>
          <IconUI size="20" color="error" tag="exclamation" />
        </IconBox>
      </InputLayout>
      <div style={{ margin: ` ${pxToRem(15)} 0 0`, height: pxToRem(20) }}>
        <TypographyUI size={20} color="error" lineheight="26">
          {error && errortext}
        </TypographyUI>
      </div>
    </Container>
  );
};

DatePickerUI.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
  errortext: PropTypes.string,
  typeInput: PropTypes.string,
  margin: PropTypes.string,
  dateValue: PropTypes.string,
};

DatePickerUI.defaultProps = {
  required: false,
  label: '',
  errortext: '',
  typeInput: 'primary',
  margin: '28',
  dateValue: '',
};

export default DatePickerUI;
