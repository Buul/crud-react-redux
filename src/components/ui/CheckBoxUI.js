import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import pxToRem from '../../helpers/scales';

const CheckBoxStyle = styled.div`
  align-items: center;
  display: flex;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;

  .text {
    font-size: ${pxToRem(20)};
    margin-left: ${pxToRem(10)};
  }
`;

const Box = styled.div`
  align-items: center;
  background-color: ${props =>
    props.checked ? props.theme.colors.blueDark : props.theme.colors.white};
  border: ${pxToRem(2)} solid ${props => props.theme.colors.blueDark};
  border-radius: ${pxToRem(5)};
  display: flex;
  height: ${pxToRem(20)};
  justify-content: center;
  padding: ${pxToRem(4)};
  width: ${pxToRem(20)};
`;

class CheckBoxUI extends Component {
  state = {
    checkedState: false,
  };

  componentWillMount() {
    const { checked } = this.props;
    this.setState({ checkedState: checked });
  }

  render() {
    const { onCheck, text, name } = this.props;
    const { checkedState } = this.state;
    return (
      <CheckBoxStyle
        onClick={() => {
          this.setState({ checkedState: !checkedState });
          if (!checkedState) onCheck(name);
        }}
      >
        <Box checked={checkedState}>
          <Icon type="check" style={{ color: '#FFFFFF', fontSize: pxToRem(10) }} />
        </Box>
        <div className="text">{text}</div>
      </CheckBoxStyle>
    );
  }
}

CheckBoxUI.propTypes = {
  checked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

CheckBoxUI.defaultProps = {
  checked: false,
};

export default CheckBoxUI;
