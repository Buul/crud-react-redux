import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Popover, Icon as IconANTD } from 'antd';
import { Table, ToolSearchTable, ContainerPersist, Avatar } from '../ui';
import {
  WORK_DOCTOR,
  WORK_NURSE,
  WORK_TECHNICIAN,
  SAFETY_ENGINEER,
  CLINIC,
  ENTERPRISE,
} from '../../helpers/constants';

import api from '../../services/api';
import {
  toggleSpinner,
  showMessageBox,
  setCompany,
  persistMode,
  setUsersByCompanyId,
} from '../../actions';
import { BoxConta, ActionRow } from './style';

class User extends Component {
  state = {
    listEmpresa: [],
  };

  componentWillMount() {
    const { spinner, showMessage } = this.props;
    spinner(true);
    api
      .get('companies')
      .then(resp => {
        this.setState({ listEmpresa: resp.data });
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: 'Erro ao buscar empresas', icon: 'error' });
        spinner(false);
      });
  }

  handleEdit = item => {
    const { setCompanyAction, persistModeAction, history } = this.props;
    setCompanyAction(item);
    persistModeAction({
      active: true,
      title: `Editar empresa`,
      back: 'conta',
    });
    history.push('/conta-editar');
  };

  handleUser = item => {
    const { spinner, showMessage, setUsersByCompanyIdAction, history } = this.props;
    spinner(true);
    api
      .get(`/companies/${item.id}`)
      .then(resp => {
        setUsersByCompanyIdAction({ listUser: resp.data.users, company: item });
        history.push('/users');
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: 'Erro ao buscar usuários da empresa', icon: 'error' });
        spinner(false);
      });
  };

  getAvatarName = data => {
    const array = (data && data.split(' ')) || 'Nova Empresa';
    const avatarName =
      (array &&
        (array[0] &&
          array[0].substring(0, 1).toUpperCase() + array[1].substring(0, 1).toUpperCase())) ||
      '';
    return avatarName;
  };

  getFilter = filter => {
    switch (filter) {
      case 'Empresa':
        return `t[]=${ENTERPRISE}`;
      case 'Clínica':
        return `t[]=${CLINIC}`;
      case 'Freelancer':
        return `t[]=${WORK_DOCTOR}&t[]=${WORK_NURSE}&t[]=${WORK_TECHNICIAN}&t[]=${SAFETY_ENGINEER}`;
      default:
        return '';
    }
  };

  handleFilterChange = value => {
    const { spinner, showMessage } = this.props;
    const filter = this.getFilter(value);
    spinner(true);
    api
      .get(`companies?${filter}`)
      .then(resp => {
        this.setState({ listEmpresa: resp.data });
        spinner(false);
      })
      .catch(err => {
        console.error(err);
        showMessage({ message: 'Erro ao buscar empresas', icon: 'error' });
        spinner(false);
      });
  };

  render() {
    const { listEmpresa } = this.state;
    return (
      <ContainerPersist>
        <ToolSearchTable
          title="Conta"
          back="conta"
          routeNewItem="conta-novo"
          titleHeaderPersist="Nova conta"
        />
        {listEmpresa.length !== 0 && (
          <Table
            listFilter={['Selecione', 'Empresa', 'Clínica', 'Freelancer']}
            orderBy="Nome"
            listEmpresa={listEmpresa}
            listTotalLength={listEmpresa.length}
            onClickEdit={this.handleEdit}
            onFilterChange={this.handleFilterChange}
          >
            {listEmpresa.map(empresa => (
              <BoxConta key={uniqueId()}>
                <Avatar text={this.getAvatarName(empresa.fantasy_name)} />
                <div className="text">
                  <span className="title">{empresa.fantasy_name}</span>
                  <br />
                  <span className="sub"> {empresa.cnpj}</span>
                </div>
                <div className="icon">
                  <Popover
                    placement="right"
                    content={
                      <ActionRow
                        onClickDelete={() => {}}
                        onClickEdit={() => this.handleEdit(empresa)}
                        onClickUser={() => this.handleUser(empresa)}
                        persona={empresa.type}
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

User.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  spinner: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  persistModeAction: PropTypes.func.isRequired,
  setCompanyAction: PropTypes.func.isRequired,
  setUsersByCompanyIdAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
      setCompanyAction: setCompany,
      persistModeAction: persistMode,
      setUsersByCompanyIdAction: setUsersByCompanyId,
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(User);
