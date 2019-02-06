import pxToRem from '../../helpers/scales';

const Avatar = {
  small: {
    size: pxToRem(20),
    background: '#F95E5A',
    font: {
      lineHeight: pxToRem(24),
      size: pxToRem(18),
    },
    empty: {
      background: '#999DAF',
      size: pxToRem(12),
    },
  },
  medium: {
    size: pxToRem(45),
    background: '#FFCC43',
    font: {
      lineHeight: pxToRem(30),
      size: pxToRem(24),
    },
    empty: {
      background: '#999DAF',
      size: pxToRem(32),
    },
  },
  large: {
    size: pxToRem(60),
    background: '#4F74AA',
    font: {
      lineHeight: pxToRem(32),
      size: pxToRem(26),
    },
    empty: {
      background: '#999DAF',
      size: pxToRem(45),
    },
  },
  huge: {
    size: pxToRem(90),
    background: '#39D8DC',
    font: {
      lineHeight: pxToRem(40),
      size: pxToRem(36),
    },
    empty: {
      background: '#999DAF',
      size: pxToRem(45),
    },
  },
  giant: {
    size: pxToRem(120),
    background: '#27ED9C',
    font: {
      lineHeight: pxToRem(50),
      size: pxToRem(42),
    },
    empty: {
      background: '#999DAF',
      size: pxToRem(45),
    },
  },
};

export default Avatar;
