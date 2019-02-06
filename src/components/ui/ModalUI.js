import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal } from 'antd';

import pxToRem from '../../helpers/scales';

const ModalStyle = styled(Modal)`
  .ant-modal-header {
    border-bottom: none !important;
    padding: 0 !important;
    padding-top: ${props => pxToRem(props.titlestyle.peddingtop)} !important;
  }

  .ant-modal-footer {
    border-top: none !important;
  }

  .ant-modal-content {
    border-radius: ${pxToRem(5)} !important;
    box-shadow: 0 ${pxToRem(20)} ${pxToRem(25)} rgba(0, 0, 0, 0.1) !important;
  }

  .ant-modal-close-x {
    font-size: ${pxToRem(15)} !important;
    width: ${pxToRem(46)};
    height: ${pxToRem(46)};
    line-height: ${pxToRem(46)};
  }
  .ant-modal-title {
    font-size: ${props => props.titlestyle.fontsize} !important;
    font-weight: 600;
    text-align: ${props => props.titlestyle.textalign} !important;
  }
`;

const ModalUI = ({ children, open, onCloseModal, titlestyle, title, size }) => (
  <ModalStyle
    titlestyle={titlestyle}
    width={pxToRem(size)}
    destroyOnClose
    footer={null}
    title={title}
    visible={open}
    onCancel={() => onCloseModal()}
  >
    {children}
  </ModalStyle>
);

ModalUI.propTypes = {
  onCloseModal: PropTypes.func,
  size: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  titlestyle: PropTypes.shape({
    fontsize: PropTypes.string,
    textalign: PropTypes.string,
    peddingtop: PropTypes.string,
  }),
};

ModalUI.defaultProps = {
  onCloseModal: () => {},
  size: 400,
  open: false,
  title: '',
  titlestyle: {
    fontsize: pxToRem(24),
    textalign: 'left',
  },
};

export default ModalUI;
