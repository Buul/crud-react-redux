import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { BoxVerifyEmail } from './style';
import TypographyUI from '../ui/TypographyUI';
import LinkButton from '../ui/LinkButtonUI';

const VerifyEmail = ({ history }) => (
  <BoxVerifyEmail>
    <TypographyUI size={20} weight="600" textalign="center" lineheight="36">
      Enviamos uma mensagem para o seu e-mail cadastrado para que você possa acessar a nossa
      plataforma.
    </TypographyUI>
    <div className="actionVerify">
      <LinkButton onClick={() => history.push('/')}>Voltar a tela de Login!</LinkButton>
    </div>
  </BoxVerifyEmail>
);

VerifyEmail.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(VerifyEmail);
