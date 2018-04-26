import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";

class BaseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  open = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  renderHeader = () => {
  };

  renderBody = () => {
  };

  renderFooter = () => {
  };

  render() {
    const { show } = this.state;

    return (
      <Modal className="modal" visible={show} onClickBackdrop={this.close}>
        <div className="modal-header col-lg-12">
          <div className="modal-title">
            {this.renderHeader()}
          </div>
        </div>
        <hr/>
        <div className="modal-body col-lg-12">
          {this.renderBody()}
        </div>
        <hr/>
        <div className="modal-footer col-lg-12">
          {this.renderFooter()}
        </div>
      </Modal>
    )
  }
}

export default BaseModal;
