import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IconCircle, Typography, LinkButton, Input } from '.';
import { persistMode } from '../../actions/userActions';
import { toggleSpinner, showMessageBox } from '../../actions';
import pxToRem from '../../helpers/scales';

const Tool = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(5)};
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(2)} rgba(0, 0, 0, 0.14);
  display: flex;
  justify-content: space-between;
  height: ${pxToRem(96)};
  margin-top: ${pxToRem(60)};
  padding: 0 ${pxToRem(30)};
  width: ${pxToRem(1080)};
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

class ToolSearchTableUI extends Component {
  state = {
    search: false,
  };

  render() {
    const { search } = this.state;
    const {
      persistModeAction,
      history,
      title,
      back,
      routeNewItem,
      subtitle,
      titleHeaderPersist,
    } = this.props;
    return (
      <Tool>
        <IconCircle icon="search" onClick={() => this.setState({ search: true })} />
        {(search && (
          <div style={{ width: '70%' }}>
            <Input margin="0" formsimple />
          </div>
        )) || (
          <Typography size={30} weight="600" lineheight="36">
            {`${title} ${subtitle}`}
          </Typography>
        )}
        {(search && (
          <IconCircle icon="close" size="14" onClick={() => this.setState({ search: false })} />
        )) || (
          <LinkButton
            fontsize="18"
            onClick={() => {
              persistModeAction({
                active: true,
                title: titleHeaderPersist,
                back,
              });
              history.push(`${routeNewItem}`);
            }}
          >
            {`+ Adicionar ${title.toLowerCase()}`}
          </LinkButton>
        )}
      </Tool>
    );
  }
}

ToolSearchTableUI.propTypes = {
  persistModeAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  routeNewItem: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired,
  titleHeaderPersist: PropTypes.string,
  subtitle: PropTypes.string,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

ToolSearchTableUI.defaultProps = {
  subtitle: '',
  titleHeaderPersist: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      persistModeAction: persistMode,
      spinner: toggleSpinner,
      showMessage: showMessageBox,
    },
    dispatch
  );

const ToolSearchTableUIConnect = connect(
  null,
  mapDispatchToProps
)(ToolSearchTableUI);

export default withRouter(ToolSearchTableUIConnect);
