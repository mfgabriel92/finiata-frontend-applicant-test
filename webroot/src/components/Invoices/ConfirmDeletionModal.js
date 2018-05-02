import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import FontAwesome from "react-fontawesome";
import Button from "../common/Button";

class InvoiceModal extends BaseModal {
  constructor(props) {
    super(props);

    this.id = null;
  }

  componentWillReceiveProps(nextProps) {
    const { invoices: { deletingInvoiceSuccess } } = nextProps;

    if (deletingInvoiceSuccess) {
      this.close();
    }
  }

  setId = (id) => {
    this.id = id;
    console.log(this.id);
  };

  renderHeader = () => {
    return (
      <h5><FontAwesome name="trash"/> Delete?</h5>
    )
  };

  renderBody = () => {
    return (
      <p>Do you want to delete this invoice?</p>
    )
  };

  renderFooter = () => {
    const { onDeleteClick } = this.props;

    return (
      <div className="row">
        <div className="col">
          <Button
            className="btn-danger"
            text="Yes"
            onClick={() => onDeleteClick(this.id)}
          />
        </div>
        <div className="col">
          <Button
            className="btn-primary"
            text="No"
            onClick={this.close}
          />
        </div>
      </div>
    )
  };
}

InvoiceModal.propTypes = {
  invoices: PropTypes.object,
  onDeleteClick: PropTypes.func
};

export default InvoiceModal;