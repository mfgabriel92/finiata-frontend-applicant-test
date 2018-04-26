import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";

class CancelInvoiceModal extends BaseModal {
  handleOnSubmit = (e) => {
    const { cancelInvoiceConfirm } = this.props;
    cancelInvoiceConfirm();
    this.close();
  };

  renderHeader = () => {
    return (
      <h3>
        <FontAwesome name="stop-circle"/> Cancel
      </h3>
    )
  };

  renderBody = () => {
    return (
      <p>Cancelling will leave this page, but you may continue edit it later. <br/><br/> Proceed?</p>
    )
  };

  renderFooter = () => {
    return (
      <div className="row">
        <div className="col-lg-6">
          <Button
            className="btn-default col-lg-12"
            text="No"
            onClick={this.close}
          />
        </div>
        <div className="col-lg-6">
          <Button
            className="btn-primary col-lg-12"
            text="Yes"
            onClick={this.handleOnSubmit}
          />
        </div>
      </div>
    )
  };
}

CancelInvoiceModal.propTypes = {
  cancelInvoiceConfirm: PropTypes.func,
};

export default CancelInvoiceModal;