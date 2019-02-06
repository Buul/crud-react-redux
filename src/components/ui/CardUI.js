import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';
import IconCircle from './IconCircleUI';

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: ${props =>
    props.borderSucess ? `${pxToRem(2)} solid ${props.theme.colors.success}` : 'none'};
  border-radius: ${pxToRem(5)};
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(2)} rgba(0, 0, 0, 0.16);
  cursor: pointer;
  margin-bottom: ${pxToRem(16)};
  width: ${pxToRem(1080)};
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
  .title {
    color: ${props => props.theme.colors.black};
    font-size: ${pxToRem(18)};
    font-weight: 600;
    line-height: ${pxToRem(18)};
    margin-left: ${pxToRem(23)};

    .sub {
      color: ${props => props.theme.colors.greyMedium};
      font-size: ${pxToRem(15)};
      font-weight: 400;
    }
  }
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  height: ${props => (props.collapse ? pxToRem(96) : pxToRem(86))};
  padding: 0 ${pxToRem(28)};
`;

const Content = styled.div`
  cursor: auto;
  display: ${props => (props.collapse ? 'block' : 'none')};
  padding: ${pxToRem(64)} ${pxToRem(96)};
`;

const Line = styled.div`
  display: ${props => (props.collapse ? 'block' : 'none')};
  background-color: ${props => props.theme.colors.greyLight};
  height: ${pxToRem(1)};
  width: 100%;
`;

const CardUI = ({ children, onClick, collapse, title, subtitle, borderSucess, iconColor }) => (
  <Container borderSucess={borderSucess}>
    <Header onClick={() => onClick()} collapse={collapse}>
      <IconCircle icon="info-circle" border="none" size="32" cursor="auto" color={iconColor} />
      <div className="title">
        {title}
        <br />
        <div className="sub">{subtitle}</div>
      </div>
    </Header>
    <Line collapse={collapse} />
    <Content collapse={collapse}>{children}</Content>
  </Container>
);

CardUI.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  collapse: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  borderSucess: PropTypes.bool,
  iconColor: PropTypes.string,
};

CardUI.defaultProps = {
  onClick: () => {},
  collapse: false,
  title: '',
  subtitle: '',
  borderSucess: false,
  iconColor: '#999DAF',
};

export default CardUI;
