/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TypographyUI from '../ui/TypographyUI';
import { BoxLogin, Line } from './style';
import Form from './form';
import VerifyEmail from './VerifyEmail';

const Login = props => {
  const { verifyEmail, recoverPassword, activateUser } = props;
  return (
    <BoxLogin>
      <div className="title">
        <TypographyUI size={30} weight="600" lineheight="36">
          {verifyEmail
            ? 'Verifique seu e-mail!'
            : recoverPassword
            ? 'Recuperação de senha'
            : activateUser.active
            ? 'Ativar usuário'
            : 'Login'}
        </TypographyUI>
      </div>
      <Line />
      {(verifyEmail && <VerifyEmail />) || <Form {...props} />}
    </BoxLogin>
  );
};
Login.propTypes = {
  verifyEmail: PropTypes.bool,
  recoverPassword: PropTypes.bool,
  activateUser: PropTypes.shape({}),
};
Login.defaultProps = {
  verifyEmail: false,
  recoverPassword: false,
  activateUser: {},
};

const mapStateToProps = state => ({
  activateUser: state.authReducer.activateUser,
});

export default connect(mapStateToProps)(Login);
