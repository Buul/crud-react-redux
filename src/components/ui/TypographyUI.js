import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import pxToRem from '../../helpers/scales';

const Paragraph = styled.div`
  display: ${props => props.display};
  font-size: ${props => pxToRem(props.size)};
  font-weight: ${props => props.weight};
  margin: ${props => props.margin};
  color: ${props => props.theme.colors[props.color]};
  line-height: ${props => pxToRem(props.lineheight)};
  text-align: ${props => props.textalign};

  .link {
    cursor: pointer;
    display: inline;
    font-size: ${props => pxToRem(props.size + 6)};
    font-weight: 600;
  }
`;

const TypographyUI = ({
  lineheight,
  display,
  size,
  weight,
  margin,
  color,
  // eslint-disable-next-line react/prop-types
  children,
  textalign,
  onClickLink,
}) => (
  <Paragraph
    textalign={textalign}
    lineheight={lineheight}
    display={display}
    size={size}
    weight={weight}
    margin={margin}
    color={color}
    onClick={() => onClickLink()}
  >
    {children}
  </Paragraph>
);

TypographyUI.propTypes = {
  margin: PropTypes.string,
  display: PropTypes.string,
  size: PropTypes.number,
  weight: PropTypes.string,
  color: PropTypes.string,
  textalign: PropTypes.string,
  lineheight: PropTypes.string,
  onClickLink: PropTypes.func,
};

TypographyUI.defaultProps = {
  margin: '0',
  display: 'flex',
  size: 12,
  weight: '400',
  color: 'black',
  textalign: 'left',
  lineheight: '1',
  onClickLink: () => {},
};

export default TypographyUI;
