import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import cx from "classnames";

class BaseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  open = () => {
    this.setState({ showModal: true })
  };

  close = () => {
    this.setState({ showModal: false })
  };

  renderHeader = () => {
  };

  renderBody = () => {
  };

  renderFooter = () => {
  };

  render() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          {this.renderHeader()}
        </Modal.Header>
        <Modal.Body>
          {this.renderBody()}
        </Modal.Body>
        <Modal.Footer>
          {this.renderFooter()}
        </Modal.Footer>
      </Modal>
    )
  }
}

export default BaseModal
