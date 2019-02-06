import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconCircle } from '../../ui';
import pxToRem from '../../../helpers/scales';

const CnaeBoxStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.blueLight};
  border-radius: ${pxToRem(5)};
  color: ${props => props.theme.colors.blueMedium100};
  display: ${props => (props.visible ? 'flex' : 'none')};
  font-family: proxima-nova;
  font-size: ${pxToRem(20)};
  font-weight: 600;
  height: ${pxToRem(50)};
  justify-content: space-between;
  line-height: ${pxToRem(26)};
  margin-bottom: ${pxToRem(32)};
  overflow: -webkit-paged-y;
  padding-left: ${pxToRem(20)};
  width: 100%;
  white-space: nowrap;
`;

class CnaeBox extends Component {
  state = {
    visible: true,
  };

  render() {
    const { cnae, onClose } = this.props;
    const { visible } = this.state;
    return (
      <CnaeBoxStyle visible={visible}>
        {cnae}
        <IconCircle
          size="15"
          backgroundcolor="blueLight"
          icon="close"
          border="none"
          onClick={() => {
            this.setState({ visible: false });
            onClose();
          }}
        />
      </CnaeBoxStyle>
    );
  }
}

CnaeBox.propTypes = {
  cnae: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CnaeBox;
