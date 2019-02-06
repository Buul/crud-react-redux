import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ContainerPersist, ToolSearchTable, Table } from '../../ui';
import { toggleSpinner, showMessageBox } from '../../../actions';

class Demanda extends Component {
  state = {
    listEmpresa: [],
  };

  render() {
    const { listEmpresa } = this.state;
    return (
      <ContainerPersist>
        <ToolSearchTable
          title="Configuracão de demanda"
          back="inicio"
          routeNewItem="configuracoes-demanda-novo"
        />
        {listEmpresa.length !== 0 && (
          <Table
            listFilter={['Empresa', 'Clínica', 'Freelancer']}
            orderBy="Nome"
            listEmpresa={listEmpresa}
            listTotalLength={listEmpresa.length}
          />
        )}
      </ContainerPersist>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      spinner: toggleSpinner,
      showMessage: showMessageBox,
    },
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(Demanda);
