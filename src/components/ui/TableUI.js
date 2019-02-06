/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { uniqueId, forEach } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu, Dropdown, Icon } from 'antd';
import pxToRem from '../../helpers/scales';
import { Typography, IconCircle } from './index';

const Painel = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(5)};
  box-shadow: 0 ${pxToRem(2)} ${pxToRem(2)} rgba(0, 0, 0, 0.14);
  -webkit-box-shadow: 0 ${pxToRem(2)} ${pxToRem(2)} rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  margin-top: ${pxToRem(30)};
  padding: ${pxToRem(30)};
  width: ${pxToRem(1080)};
  @media ${props => props.theme.device.md} {
    width: 100%;
  }
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: ${pxToRem(30)};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .dropdown {
    color: ${props => props.theme.colors.blueMedium100};
    cursor: pointer;
    font-size: ${pxToRem(15)};
    font-weight: 600;
    line-height: ${pxToRem(24)};
    margin-left: ${pxToRem(30)};
  }

  .order-by-text {
    color: ${props => props.theme.colors.blueMedium100};
    line-height: ${pxToRem(24)};
    margin-left: ${pxToRem(30)};
  }

  .order-by__icon {
    margin-left: ${pxToRem(30)};
  }
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-top: ${pxToRem(16)};

  .count-items {
    color: ${props => props.theme.colors.greyMedium};
    font-size: ${pxToRem(16)};
    font-weight: 600;
    line-height: ${pxToRem(22)};
  }

  .pagination {
    align-items: center;
    display: flex;
    color: ${props => props.theme.colors.blueMedium100};
    font-size: ${pxToRem(18)};
    font-weight: 600;
    line-height: ${pxToRem(24)};
  }
  .pagination__btn_left {
    align-items: center;
    color: ${props =>
      props.pagination[0].value !== 1
        ? props.theme.colors.blueMedium100
        : props.theme.colors.blueLight100};
    cursor: ${props => (props.pagination[0].value !== 1 ? 'pointer' : 'auto')};
    display: flex;
  }

  .pagination__btn_right {
    align-items: center;
    color: ${props =>
      props.pagination[props.pagination.length - 1].value !==
      props.paginationTotal[props.paginationTotal.length - 1].value
        ? props.theme.colors.blueMedium100
        : props.theme.colors.blueLight100};
    cursor: ${props =>
      props.pagination[props.pagination.length - 1].value !==
      props.paginationTotal[props.paginationTotal.length - 1].value
        ? 'pointer'
        : 'auto'};
    display: flex;
  }
`;

const PaginationNumbers = styled.div`
  align-items: center;
  display: flex;
  margin: 0 ${pxToRem(10)};

  .go-end {
    align-items: center;
    display: flex;
    margin: 0 ${pxToRem(10)};
  }
`;

const Number = styled.div`
  align-items: center;
  background-color: ${props =>
    props.numberSelected ? props.theme.colors.blueLight : props.theme.colors.white};
  border-radius: ${pxToRem(5)};
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: ${pxToRem(32)};
  margin: 0 ${pxToRem(3)};
  width: ${pxToRem(32)};
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class TableUI extends Component {
  state = {
    filterSelected: '',
    orderByIconAsc: false,
    pagination: [],
    paginationTotal: [],
    numberSelected: 0,
    listLengthPosition: 0,
  };

  componentWillMount() {
    const { listTotalLength, listFilter } = this.props;
    const qtdPagination = Math.ceil(listTotalLength / 10);
    const listLengthPosition = listTotalLength <= 10 ? listTotalLength : 10;
    const paginationTotal = [];
    const pagination = [];

    for (let i = 1; i <= qtdPagination; i += 1) {
      paginationTotal.push({
        value: i,
        selected: false,
      });
    }

    for (let i = 0; i < paginationTotal.length; i += 1) {
      if (i < 10) {
        pagination.push(paginationTotal[i]);
      } else {
        break;
      }
    }

    const filterSelected = listFilter[0];
    this.setState({ paginationTotal, pagination, listLengthPosition, filterSelected });
  }

  handleSelectFilter = value => {
    const { onFilterChange } = this.props;
    this.setState({ filterSelected: value });
    onFilterChange(value);
  };

  handleNumberSelected = value => {
    const { pagination } = this.state;
    const listPagination = { ...pagination };

    forEach(listPagination, pageParam => {
      const page = pageParam;
      if (page.value === value) {
        page.selected = true;
      } else {
        page.selected = false;
      }
    });
    this.setState({ pagination, numberSelected: value });
  };

  handleClickNext = () => {
    const { pagination, paginationTotal, numberSelected } = this.state;
    const listPagination = [];
    const endPoint = pagination[pagination.length - 1].value;
    if (endPoint !== paginationTotal[paginationTotal.length - 1].value) {
      for (let i = endPoint; i < endPoint + 10; i += 1) {
        listPagination.push({
          value: paginationTotal[i].value,
          selected: paginationTotal[i].value === numberSelected,
        });
      }
      this.setState({ pagination: listPagination });
    }
  };

  handleClickPrevious = () => {
    const { pagination, paginationTotal, numberSelected } = this.state;
    const listPagination = [];
    const startPoint = pagination[0].value - 11;
    if (startPoint >= 0) {
      for (let i = startPoint; i < startPoint + 10; i += 1) {
        listPagination.push({
          value: paginationTotal[i].value,
          selected: paginationTotal[i].value === numberSelected,
        });
      }
      this.setState({ pagination: listPagination });
    }
  };

  handleGoEnd = () => {
    const { paginationTotal, numberSelected } = this.state;
    const listPagination = [];
    const startPoint = paginationTotal.length - 11;

    for (let i = startPoint; i < paginationTotal.length; i += 1) {
      listPagination.push({
        value: paginationTotal[i].value,
        selected: paginationTotal[i].value === numberSelected,
      });
    }
    this.setState({ pagination: listPagination });
  };

  handleGoStart = () => {
    const { paginationTotal, numberSelected } = this.state;
    const listPagination = [];
    const startPoint = 0;

    for (let i = startPoint; i < 10; i += 1) {
      listPagination.push({
        value: paginationTotal[i].value,
        selected: paginationTotal[i].value === numberSelected,
      });
    }
    this.setState({ pagination: listPagination });
  };

  menu = listFilter => (
    <Menu>
      {listFilter.map(value => (
        <Menu.Item key={uniqueId()} onClick={() => this.handleSelectFilter(value)}>
          {value}
        </Menu.Item>
      ))}
    </Menu>
  );

  render() {
    const { listFilter, orderBy, listTotalLength, children, listFilterDesable } = this.props;
    const {
      filterSelected,
      orderByIconAsc,
      pagination,
      paginationTotal,
      listLengthPosition,
    } = this.state;

    return (
      <Painel>
        <Header>
          <div>
            <Typography size={20} lineheight="26">
              Lista de
              <Dropdown disabled={listFilterDesable} overlay={this.menu(listFilter)}>
                <div className="dropdown">
                  {filterSelected}
                  <Icon type="caret-down" style={{ marginLeft: pxToRem(8) }} />
                </div>
              </Dropdown>
            </Typography>
          </div>
          <div>
            <Typography size={15} lineheight="22" weight="600" color="greyMedium">
              Ordenar por:
              <div className="order-by-text">{orderBy}</div>
              <div className="order-by__icon">
                <IconCircle
                  border="none"
                  size="16"
                  color="#4F74AA"
                  icon={orderByIconAsc ? 'arrow-up' : 'arrow-down'}
                  onClick={() => {
                    this.setState({ orderByIconAsc: !orderByIconAsc });
                  }}
                  heightCircle="0"
                />
              </div>
            </Typography>
          </div>
        </Header>
        <Content>{children}</Content>
        <Footer pagination={pagination} paginationTotal={paginationTotal}>
          <div className="count-items">{`${listLengthPosition} de ${listTotalLength}`} </div>
          <div className="pagination">
            <div className="pagination__btn_left" onClick={this.handleClickPrevious}>
              <Icon type="left" style={{ fontSize: pxToRem(10), margin: `0 ${pxToRem(13)}` }} />
              Anterior
            </div>
            <PaginationNumbers>
              {pagination[0].value !== 1 && (
                <div className="go-end" onClick={this.handleGoStart}>
                  ...
                  <Number>{paginationTotal && paginationTotal[0].value}</Number>
                </div>
              )}
              {pagination.map(page => (
                <Number
                  key={uniqueId()}
                  numberSelected={page.selected}
                  onClick={() => this.handleNumberSelected(page.value)}
                >
                  {page.value}
                </Number>
              ))}
              {pagination[pagination.length - 1].value !==
                paginationTotal[paginationTotal.length - 1].value && (
                <div className="go-end" onClick={this.handleGoEnd}>
                  ...
                  <Number>
                    {paginationTotal && paginationTotal[paginationTotal.length - 1].value}
                  </Number>
                </div>
              )}
            </PaginationNumbers>
            <div className="pagination__btn_right" onClick={this.handleClickNext}>
              Próximo
              <Icon type="right" style={{ fontSize: pxToRem(10), margin: `0 ${pxToRem(13)}` }} />
            </div>
          </div>
          <div />
        </Footer>
      </Painel>
    );
  }
}

TableUI.propTypes = {
  orderBy: PropTypes.string,
  listTotalLength: PropTypes.number,
  children: PropTypes.node.isRequired,
  listFilter: PropTypes.arrayOf(PropTypes.string),
  listFilterDesable: PropTypes.bool,
  onFilterChange: PropTypes.func,
};

TableUI.defaultProps = {
  orderBy: '',
  listTotalLength: 0,
  listFilter: [],
  listFilterDesable: false,
  onFilterChange: () => {},
};

export default TableUI;
