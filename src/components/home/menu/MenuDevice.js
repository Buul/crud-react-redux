import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon } from '../../ui';
import { IconBoxDevice } from './style';
import { setResponsiveMenu } from '../../../actions';

const MenuDevice = ({ setResponsiveMenuAction, responsiveMenu }) => (
  <IconBoxDevice
    onClick={() => {
      setResponsiveMenuAction({ active: !responsiveMenu.active });
    }}
  >
    <Icon size="25" color="greyMedium" tag="menu" />
  </IconBoxDevice>
);

MenuDevice.propTypes = {
  setResponsiveMenuAction: PropTypes.func.isRequired,
  responsiveMenu: PropTypes.shape({ active: PropTypes.bool }),
};

MenuDevice.defaultProps = {
  responsiveMenu: {
    active: false,
  },
};

const mapStateToProps = state => ({
  responsiveMenu: state.authReducer.responsiveMenu,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setResponsiveMenuAction: setResponsiveMenu,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDevice);
