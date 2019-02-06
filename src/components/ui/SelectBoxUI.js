import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from './IconCircleUI';
import pxToRem from '../../helpers/scales';
import Radio from './RadioUI';

const Container = styled.div`
  background-color: ${props =>
    props.selected ? props.theme.colors.blueLight2 : props.theme.colors.white};

  border: ${pxToRem(2)} solid
    ${props => (props.selected ? props.theme.colors.blueDark : props.theme.colors.grey)};

  border-radius: ${pxToRem(5)};

  color: ${props => (props.selected ? props.theme.colors.blueDark : props.theme.colors.grey)};

  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: ${pxToRem(20)};
  font-weight: 600;
  height: ${pxToRem(160)};
  line-height: ${pxToRem(27)};
  margin-right: ${props => pxToRem(props.margin)};
  padding: ${pxToRem(23)};
  width: ${pxToRem(200)};

  .content {
    align-items: center;
    bottom: ${pxToRem(7)};
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .title {
    margin-top: ${pxToRem(22)};
  }
`;

const SelectBoxUI = ({ selected, title, icon, margin, onClick }) => (
  <Container selected={selected} margin={margin} onClick={() => onClick()}>
    <div>
      <Radio onClick={() => onClick()} checked={selected} selected={selected} />
    </div>
    <div className="content">
      <Icon
        icon={icon}
        size="42"
        color={selected ? 'blueDark' : 'grey'}
        border="none"
        backgroundcolor={selected ? 'blueLight2' : 'white'}
      />
      <div className="title">{title}</div>
    </div>
  </Container>
);

SelectBoxUI.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  margin: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SelectBoxUI.defaultProps = {
  selected: false,
  margin: '20',
};

export default SelectBoxUI;
