import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './IconUI';

const AvatarStyle = styled.div`
  align-items: center;
  background-color: ${props =>
    (props.text && props.theme.avatar[props.type].background) ||
    props.theme.avatar[props.type].empty.background};
  border-radius: 50%;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.avatar[props.type].font.size};
  font-weight: 600;
  height: ${props => props.theme.avatar[props.type].size};
  justify-content: center;
  line-height: ${props => props.theme.avatar[props.type].font.lineHeight};
  width: ${props => props.theme.avatar[props.type].size};

  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    height: ${props => props.theme.avatar[props.type].empty.size};
    width: ${props => props.theme.avatar[props.type].empty.size};
  }
`;

const AvatarUI = ({ type, text, onClick }) => (
  <AvatarStyle type={type} text={text} onClick={() => onClick()}>
    {(text && text) || (
      <div className="icon">
        <Icon color="white" tag="user" />
      </div>
    )}
  </AvatarStyle>
);

AvatarUI.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

AvatarUI.defaultProps = {
  text: '',
  type: 'medium',
  onClick: () => {},
};

export default AvatarUI;
