import pxToRem from '../../helpers/scales';

const input = {
  font: {
    size: pxToRem(20),
  },
  border: {
    color: {
      primary: '#EBEAED',
    },
  },
  hover: {
    border: {
      color: {
        primary: '#AEC3E3',
        error: '#F95E5A',
      },
    },
  },
};

export default input;
