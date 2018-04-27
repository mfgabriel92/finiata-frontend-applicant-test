import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import Button from "../common/Button";
import FontAwesome from "react-fontawesome";

class UnsavedDataAlertModal extends BaseModal {
  renderHeader = () => {
    return (
      <h3>
        <FontAwesome name="exclamation"/> Unsaved Data
      </h3>
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
        <div className="col-lg-6">
          <Button
            className="btn-primary"
            text="Ok"
            onClick={this.close}
          />
        </div>
      </div>
    )
  };
}

UnsavedDataAlertModal.propTypes = {
  customMessage: PropTypes.string,
};

UnsavedDataAlertModal.defaultProps = {
  customMessage: "You have unsaved data. Please save or cancel first."
};

export default UnsavedDataAlertModal;