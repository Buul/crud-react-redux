import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import { Modal, IconCircle, Button } from '../ui';
import { Container, Message, Line, MessageContent } from './style';

class MessageBox extends Component {
  state = {
    openState: true,
  };

  componentWillReceiveProps(nextProps) {
    const { openState } = this.state;

    if (nextProps.open !== undefined && openState !== nextProps.open) {
      this.setState({ openState: nextProps.open });
    }
  }

  handleClose = () => {
    const { open, onCloseModal } = this.props;

    if (open === undefined) {
      this.setState({ openState: false });
    }
    onCloseModal();
  };

  renderIcon = icon => {
    switch (icon) {
      case 'success':
        return <IconCircle size="110" icon="check-circle" color="#00A66B" border="none" />;
      case 'info':
        return <IconCircle size="110" icon="info-circle" color="#FFCC43" border="none" />;
      case 'error':
        return <IconCircle size="110" icon="warning" color="#F95E5A" border="none" />;
      default:
        break;
    }
    return <div />;
  };

  render() {
    const { openState } = this.state;
    const { open, message, icon } = this.props;
    return (
      <Modal
        open={open === undefined ? openState : open}
        onCloseModal={this.handleClose}
        size="844"
      >
        <Container>
          {this.renderIcon(icon)}
          <MessageContent>
            {message && message.map(item => <Message key={uniqueId()}>{item}</Message>)}
          </MessageContent>
          <Line />
          <Button onClick={this.handleClose}>Confirmar</Button>
        </Container>
      </Modal>
    );
  }
}
MessageBox.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.string,
  onCloseModal: PropTypes.func.isRequired,
};
MessageBox.defaultProps = {
  open: undefined,
  icon: '',
  message: [],
};

export default MessageBox;
