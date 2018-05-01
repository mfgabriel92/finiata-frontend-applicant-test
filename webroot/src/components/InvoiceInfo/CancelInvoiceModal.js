import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";

class CancelInvoiceModal extends BaseModal {
  handleOnSaveForLaterClick = () => {
    const { saveForLater } = this.props;
    saveForLater();
    this.close();
  };

  handleOnDiscardClick = () => {
    const { discardInvoice } = this.props;
    discardInvoice();
    this.close();
  };

  renderHeader = () => {
    return (
      <h5>
        <FontAwesome name="stop-circle"/> Cancel
      </h5>
    )
  };

  renderBody = () => {
    return (
      <p>Do you want to save it for later or completely discard the invoice?</p>
    )
  };

  renderFooter = () => {
    return (
      <div className="row">
        <div className="col float-left">
          <Button
            className="btn-default"
            text="Cancel"
            onClick={this.close}
          />
        </div>
        <div className="col">
          <Button
            className="btn-primary"
            text="Save for later"
            onClick={this.handleOnSaveForLaterClick}
          />
        </div>
        <div className="col">
          <Button
            className="btn-danger"
            text="Discard"
            onClick={this.handleOnDiscardClick}
          />
        </div>
      </div>
    )
  };
}

CancelInvoiceModal.propTypes = {
  saveForLater: PropTypes.func,
  discardInvoice: PropTypes.func
};

export default CancelInvoiceModal;