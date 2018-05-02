import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import FontAwesome from "react-fontawesome";
import Button from "../common/Button";

class ConfirmDeletionModal extends BaseModal {
  constructor(props) {
    super(props);

    this.id = null;
  }

  setId = (id) => {
    this.id = id;
  };

  handleOnDeleteClick = () => {
    const { onDeleteClick } = this.props;
    this.id && onDeleteClick(this.id);
    this.close();
  };

  renderHeader = () => {
    return (
      <h5><FontAwesome name="trash"/> Delete?</h5>
    )
  };

  renderBody = () => {
    const { customMessage } = this.props;

    return (
      <p>{customMessage}</p>
    )
  };

  renderFooter = () => {


    return (
      <div className="row">
        <div className="col">
          <Button
            className="btn-danger"
            text="Yes"
            onClick={() => this.handleOnDeleteClick()}
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

ConfirmDeletionModal.propTypes = {
  invoices: PropTypes.object,
  customMessage: PropTypes.string,
  onDeleteClick: PropTypes.func
};

ConfirmDeletionModal.defaultProps = {
  customMessage: "Are you sure you want to proceed with the deletion?"
};

export default ConfirmDeletionModal;