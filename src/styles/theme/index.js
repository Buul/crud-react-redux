import pxToRem from '../../helpers/scales';
import button from './button';
import linkButton from './linkButton';
import input from './input';
import avatar from './avatar';
import iconCircle from './iconCircle';
import select from './select';
import tag from './tag';

const size = {
  sm: '576px',
  md: '768px',
  lg: '1040px',
  xl: '1240px',
  xxl: '1600px',
  g: '1900px',
};

const theme = {
  colors: {
    primary: '#54a0ff',
    danger: '#ff6b6b',
    info: '#48dbfb',
    success: '#00A66B',
    default: '#576574',
    white: '#ffffff',
    black: '#1F2A41',
    grey: '#A0A3B4',
    grey100: '#F5F5F6',
    greyLight: '#EBEAED',
    greyLight2: 'rgba(112, 112, 112, 0.1)',
    greyLight3: '#E6E5E8',
    greyMedium: '#999DAF',
    greyDark: '#f5f4f6',
    blueLight: '#E6ECF8',
    blueLight100: '#AEC3E3',
    blueLight2: '#E6FFFF',
    blueMedium: '#445A93',
    blueMedium100: '#4F74AA',
    blueDark: '#284E86',
    hover: {
      primary: '#AEC3E3',
      danger: '#ff3333',
      info: '#05cdfa',
      success: '#159d79',
      default: '#373f49',
      white: '#f2f2f2',
      black: '#1a1a1a',
    },
    disabled: {
      text: '#999DAF',
    },
    error: '#F95E5A',
  },
  spacing: {
    none: '0',
    xxs: pxToRem(3),
    xs: pxToRem(5),
    xsm: pxToRem(8),
    sm: pxToRem(10),
    md: pxToRem(15),
    lg: pxToRem(20),
    xlg: pxToRem(25),
    xg: pxToRem(30),
    xxg: pxToRem(50),
  },
  fontSize: {
    none: '0',
    xs: pxToRem(12),
    sm: pxToRem(14),
    md: pxToRem(16),
    lg: pxToRem(18),
    xg: pxToRem(20),
  },
  rounded: {
    none: '0',
    sm: '3px',
    md: '5px',
    lg: '10px',
    full: '100%',
  },
  device: {
    sm: `(max-width: ${size.sm})`,
    md: `(max-width: ${size.md})`,
    lg: `(max-width: ${size.lg})`,
    xl: `(max-width: ${size.xl})`,
    xxl: `(max-width: ${size.xxl})`,
  },
  button,
  linkButton,
  input,
  avatar,
  iconCircle,
  select,
  tag,
};

export default theme;
