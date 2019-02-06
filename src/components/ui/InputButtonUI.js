import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactInputMask from 'react-input-mask';
import { Icon, Typography, Button } from './index';
import pxToRem from '../../helpers/scales';

const InputCustomize = styled.input`
  height: ${pxToRem(50)} !important;
  font-family: proxima-nova;
  font-size: ${props => props.theme.input.font.size};
  border-radius: ${pxToRem(5)} 0 0 ${pxToRem(5)} !important;
  background-color: ${props => props.theme.colors.greyDark} !important;
  width: 100%;
  border: ${pxToRem(1)} solid ${props => props.theme.input.border.color[props.typeInput]};
  padding: ${pxToRem(15)} 0 ${pxToRem(11)} ${pxToRem(22)};
  outline: none;
  &:hover {
    border: ${pxToRem(2)} solid ${props => props.theme.input.hover.border.color[props.typeInput]};
  }

  &:focus {
    border: ${pxToRem(2)} solid ${props => props.theme.input.hover.border.color[props.typeInput]};
  }

  ${props =>
    props.error
      ? `
          &:hover {
            border:  ${pxToRem(2)} solid ${props.theme.input.hover.border.color.error};
          }

          &:focus {
            border:${pxToRem(2)} solid ${props.theme.input.hover.border.color.error};
            
          }
          border: ${pxToRem(2)} solid ${props.theme.input.hover.border.color.error};

        `
      : ''};
`;

const InputLayout = styled.div`
  position: relative;
  width: 100%;
`;

const IconBoxFixo = styled.div`
  bottom: ${pxToRem(2)};
  display: ${props => props.display};
  position: absolute;
  right: ${pxToRem(12)};
`;

const Container = styled.div`
  margin-bottom: ${props => pxToRem(props.margin)};

  @media ${props => props.theme.device.sm} {
    margin-bottom: ${props => (props.formsimple ? 0 : pxToRem(28))};
  }
`;

const InputUI = props => {
  const {
    required,
    label,
    errortext,
    value,
    mask,
    maskchar,
    // eslint-disable-next-line react/prop-types
    error,
    typeInput,
    margin,
    iconSufix,
    formsimple,
    buttonProps,
  } = props;

  return (
    <Container margin={margin} formsimple={formsimple}>
      {label && (
        <div style={{ margin: `0 0 ${pxToRem(20)}` }}>
          <Typography size={20} weight="600" lineheight="26">
            {label} {required && <span style={{ marginLeft: 8, color: '#999DAF' }}> *</span>}
          </Typography>
        </div>
      )}
      <ReactInputMask mask={mask} maskChar={maskchar} value={value} {...props}>
        {inputProps => (
          <InputLayout>
            <div style={{ display: 'flex' }}>
              <InputCustomize {...inputProps} {...props} typeInput={typeInput} />
              <Button inputButton onClick={() => buttonProps.onClick()}>
                {buttonProps.text}
              </Button>
            </div>
            <IconBoxFixo display={iconSufix ? 'block' : 'none'}>
              <Icon type="search" style={{ fontSize: pxToRem(24) }} />
            </IconBoxFixo>
          </InputLayout>
        )}
      </ReactInputMask>
      {!formsimple && (
        <div style={{ margin: ` ${pxToRem(15)} 0 0`, height: pxToRem(20) }}>
          <Typography size={20} color="error" lineheight="26">
            {error && errortext}
          </Typography>
        </div>
      )}
    </Container>
  );
};

InputUI.propTypes = {
  required: PropTypes.bool,
  itembutton: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  errortext: PropTypes.string,
  maskchar: PropTypes.string,
  mask: PropTypes.string,
  typeInput: PropTypes.string,
  margin: PropTypes.string,
  iconSufix: PropTypes.string,
  formsimple: PropTypes.bool,
  buttonProps: PropTypes.shape({}).isRequired,
};

InputUI.defaultProps = {
  formsimple: false,
  required: false,
  label: '',
  value: '',
  errortext: '',
  mask: '',
  maskchar: null,
  typeInput: 'primary',
  margin: '28',
  iconSufix: '',
  itembutton: false,
};

export default InputUI;
