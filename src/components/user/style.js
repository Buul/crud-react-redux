/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon as IconANTD } from 'antd';
import pxToRem from '../../helpers/scales';
import { WORK_DOCTOR, WORK_NURSE, WORK_TECHNICIAN, SAFETY_ENGINEER } from '../../helpers/constants';

const PainelStyle = styled.div`
  margin-top: 3.875rem;
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1.5)};
  width: 100%;
  margin: ${pxToRem(48)} 0;
`;

const BtnPainelStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: ${pxToRem(52)} 0;
`;

const BoxContaStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.grey100};
  border-radius: ${pxToRem(5)};
  display: flex;
  height: ${pxToRem(102)};
  margin-bottom: ${pxToRem(16)};
  margin-right: ${pxToRem(16)};
  padding-left: ${pxToRem(20)};
  margin-right: ${pxToRem(16)};
  flex: 1 1 45%;
  max-width: 45%;

  .text {
    line-height: ${pxToRem(17)};
    margin-left: ${pxToRem(15)};
  }

  .title {
    font-size: ${pxToRem(18)};
    font-weight: 600;
    margin: 0;
  }

  .sub {
    font-size: ${pxToRem(16)};
    color: ${props => props.theme.colors.greyMedium};
  }

  .icon {
    cursor: pointer;
    display: flex;
    flex: 1 1 auto;
    flex-direction: row-reverse;
    margin-right: ${pxToRem(30)};
    margin-left: ${pxToRem(10)};
  }
`;

const ContentPopoverStyle = styled.div`
  padding: 0 ${pxToRem(6)};
`;

const OptionItem = styled.div`
  align-items: center;
  color: ${props => props.theme.colors.blueDark};
  cursor: pointer;
  display: flex;
  font-size: ${pxToRem(14)};
  font-weight: 600;
  margin: ${pxToRem(18)} 0;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  .text {
    margin-left: ${pxToRem(8)};
  }
`;

const isPersonaFreelancer = persona =>
  persona === WORK_DOCTOR ||
  persona === WORK_NURSE ||
  persona === WORK_TECHNICIAN ||
  persona === SAFETY_ENGINEER;

export const ActionRow = ({ onClickEdit, onClickDelete, onClickUser, persona, userMenuItem }) => (
  <ContentPopoverStyle>
    <OptionItem>
      <IconANTD type="delete" style={{ color: '#284E86', fontSize: pxToRem(14) }} />
      <div className="text" onClick={() => onClickDelete()}>
        Deletar
      </div>
    </OptionItem>
    <OptionItem>
      <IconANTD type="edit" style={{ color: '#284E86', fontSize: pxToRem(14) }} />
      <div className="text" onClick={() => onClickEdit()}>
        Editar
      </div>
    </OptionItem>
    {userMenuItem && !isPersonaFreelancer(persona) && (
      <OptionItem>
        <IconANTD type="user" style={{ color: '#284E86', fontSize: pxToRem(14) }} />
        <div className="text" onClick={() => onClickUser()}>
          Usuários
        </div>
      </OptionItem>
    )}
  </ContentPopoverStyle>
);

ActionRow.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickUser: PropTypes.func,
  persona: PropTypes.string,
  userMenuItem: PropTypes.bool,
};

ActionRow.defaultProps = {
  persona: '',
  onClickUser: () => {},
  userMenuItem: true,
};

export const BtnPainel = ({ children }) => <BtnPainelStyle>{children}</BtnPainelStyle>;

BtnPainel.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Line = () => <LineStyle />;

export const Painel = ({ children }) => <PainelStyle>{children}</PainelStyle>;

Painel.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BoxConta = ({ children }) => <BoxContaStyle>{children}</BoxContaStyle>;

BoxConta.propTypes = {
  children: PropTypes.node.isRequired,
};
