import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";

class DeleteInvoiceModal extends BaseModal {
  componentWillReceiveProps(nextProps) {
    const { deletingInvoiceSuccess } = nextProps;

    if (deletingInvoiceSuccess) {
      this.close();
    }
  }

  handleOnSubmit = (e) => {
    const { deleteInvoice } = this.props;
    deleteInvoice();
  };

  renderHeader = () => {
    return (
      <h3>
        <FontAwesome name="trash"/> Delete
      </h3>
    )
  };

  renderBody = () => {
    return (
      <p>Cancelling this invoice will permanently delete it and its related information. <br/><br/> Proceed?</p>
    )
  };

  renderFooter = () => {
    return (
      <div className="row">
        <div className="col-lg-6">
          <Button
            className="btn-default col-lg-12"
            text="Cancel"
            onClick={this.close}
          />
        </div>
        <div className="col-lg-6">
          <Button
            className="btn-primary col-lg-12"
            onClick={this.handleOnSubmit}
          />
        </div>
      </div>
    )
  };
}

DeleteInvoiceModal.propTypes = {
  deleteInvoice: PropTypes.func,
  invoices: PropTypes.object
};

export default DeleteInvoiceModal;