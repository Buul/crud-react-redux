import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, Icon as IconANTD } from 'antd';
import { Table, ToolSearchTable, ContainerPersist, Avatar } from '../ui';

import {
  toggleSpinner,
  showMessageBox,
  setUser,
  persistMode,
  setUsersByCompanyId,
} from '../../actions';
import { BoxConta, ActionRow } from '../user/style';

class UserSystem extends Component {
  componentWillMount() {
    const {
      usersByCompanyId: { listUser },
      history,
    } = this.props;

    if (listUser.length === 0) history.push('/conta');
  }

  handleEdit = item => {
    const { setUserAction, persistModeAction, history } = this.props;
    setUserAction(item);
    persistModeAction({
      active: true,
      title: `Editar usuário`,
      back: 'users',
    });
    history.push('/user-system-editar');
  };

  render() {
    const {
      usersByCompanyId: { listUser, company },
    } = this.props;
    return (
      <ContainerPersist>
        <ToolSearchTable
          title="Usuários"
          subtitle={`da empresa ${company.fantasy_name}`}
          back="users"
          routeNewItem="user-system-novo"
          titleHeaderPersist="Novo Usuário"
        />
        {listUser.length !== 0 && (
          <Table
            listFilter={['Usuários']}
            listFilterDesable
            orderBy="Nome"
            listEmpresa={listUser}
            listTotalLength={listUser.length}
            onClickEdit={this.handleEdit}
          >
            {listUser.map(user => (
              <BoxConta key={uniqueId()}>
                <Avatar text={user.name.substring(0, 1) + user.last_name.substring(0, 1)} />
                <div className="text">
                  <span className="title">{`${user.name} ${user.last_name}`}</span>
                  <br />
                  <span className="sub"> {user.cpf}</span>
                </div>
                <div className="icon">
                  <Popover
                    placement="right"
                    content={
                      <ActionRow
                        onClickDelete={() => {}}
                        onClickEdit={() => this.handleEdit(user)}
                        userMenuItem={false}
                      />
                    }
                    trigger="click"
                  >
                    <IconANTD
                      type="ellipsis"
                      style={{ fontSize: 16, color: '#999DAF', transform: 'rotate(90deg)' }}
                    />
                  </Popover>
                </div>
              </BoxConta>
            ))}
          </Table>
        )}
      </ContainerPersist>
    );
  }
}

UserSystem.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  persistModeAction: PropTypes.func.isRequired,
  setUserAction: PropTypes.func.isRequired,
  usersByCompanyId: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  usersByCompanyId: state.userReducer.usersByCompanyId,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      setUserAction: setUser,
      persistModeAction: persistMode,
      setUsersByCompanyIdAction: setUsersByCompanyId,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSystem);
