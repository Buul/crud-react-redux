import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from '../../ui/TagUI';
import Icon from '../../ui/IconCircleUI';
import pxToRem from '../../../helpers/scales';
import Avatar from '../../ui/AvatarUI';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${pxToRem(24)} 0 ${pxToRem(44)} 0;
`;

const SelectGroupStyle = styled.div`
  display: flex;
  justify-content: center;
  margin: ${pxToRem(24)} 0 ${pxToRem(68)} 0;
`;

const LineStyle = styled.div`
  background-color: ${props => props.theme.colors.greyLight3};
  height: ${pxToRem(2)};
  width: ${pxToRem(640)};
`;

const TypePersonaStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: ${pxToRem(32)} 0 ${pxToRem(50)} 0;
`;

const TextTypePersonaStyle = styled.div`
  margin-bottom: ${pxToRem(50)};
`;

const TypePersonaRadioStyle = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonPersonaStyle = styled.div`
  margin-top: ${pxToRem(64)};
`;

const BoxPersonaStyle = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.grey100};
  border-radius: ${pxToRem(5)};
  display: flex;
  height: ${pxToRem(102)};
  justify-content: space-between;
  padding: 0 ${pxToRem(20)};
  width: 100%;
`;

const Empresa = styled.div`
  align-items: center;
  display: flex;

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
`;

const getAvatarName = data => {
  const array = (data && data.split(' ')) || 'Nova Empresa';
  const avatarName =
    (array &&
      (array[0] &&
        array[0].substring(0, 1).toUpperCase() + array[1].substring(0, 1).toUpperCase())) ||
    '';
  return avatarName;
};

export const SelectPersona = ({ children }) => <Content>{children}</Content>;

SelectPersona.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TextTypePersona = ({ children }) => (
  <TextTypePersonaStyle>{children}</TextTypePersonaStyle>
);

TextTypePersona.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TypePersonaRadio = ({ children }) => (
  <TypePersonaRadioStyle>{children}</TypePersonaRadioStyle>
);

TypePersonaRadio.propTypes = {
  children: PropTypes.node.isRequired,
};

export const TypePersona = ({ children }) => <TypePersonaStyle>{children}</TypePersonaStyle>;

TypePersona.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SelectGroup = ({ children }) => <SelectGroupStyle>{children}</SelectGroupStyle>;

SelectGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ButtonPersona = ({ children }) => <ButtonPersonaStyle>{children}</ButtonPersonaStyle>;

ButtonPersona.propTypes = {
  children: PropTypes.node.isRequired,
};

export const LinePersona = () => <LineStyle />;

export const BoxPersona = ({ onClose, empresa, tag }) => (
  <BoxPersonaStyle>
    <Empresa>
      <Avatar text={getAvatarName(empresa.fantasy_name)} />
      <div className="text">
        <span className="title">{empresa.fantasy_name}</span>
        <br />
        <span className="sub"> {empresa.cnpj}</span>
      </div>
    </Empresa>
    <Tag type="secundary">{tag}</Tag>
    <Icon
      icon="close"
      size="16"
      color="#999DAF"
      backgroundcolor="grey100"
      border="none"
      onClick={() => onClose()}
    />
  </BoxPersonaStyle>
);

BoxPersona.propTypes = {
  empresa: PropTypes.shape({
    text: PropTypes.string,
    cnpj: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  tag: PropTypes.string,
};

BoxPersona.defaultProps = {
  empresa: {
    fantasy_name: 'Nova Empresa',
    cnpj: '00.000.000/0000-00',
  },
  tag: '',
};
