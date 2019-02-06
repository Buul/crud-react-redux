import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';

const PopoverUI = props => {
  const { children } = props;
  return <Popover {...props}>{children}</Popover>;
};

PopoverUI.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PopoverUI;
