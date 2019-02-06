import pxToRem from '../../helpers/scales';

const button = {
  height: pxToRem(50),
  font: {
    color: {
      primary: '#FFFFFF',
      secundary: '#4F74AA',
    },
  },
  border: {
    primary: 'none',
    secundary: `${pxToRem(2)} solid #AEC3E3`,
  },
  background: {
    color: {
      primary: '#4F74AA',
      secundary: '#E6ECF8',
      danger: 'red',
    },
  },
  hover: {
    background: {
      color: {
        primary: '#18407C',
        secundary: '#E6ECF8',
      },
    },
    border: {
      primary: 'none',
      secundary: `${pxToRem(2)} solid #7C9BC9`,
    },
  },
  click: {
    background: {
      color: {
        primary: '#03275D',
      },
    },
    border: {
      primary: 'none',
      secundary: `${pxToRem(2)} solid #4F74AA`,
    },
  },
  disabled: {
    font: {
      color: '#AEC3E3',
    },
    background: {
      color: {
        primary: '#7C9BC9',
        secundary: '#AEC3E3',
      },
    },
  },
};

export default button;
