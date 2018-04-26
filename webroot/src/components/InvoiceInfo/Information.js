import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import Input from "../common/Input";
import Button from "../common/Button";
import moment from "moment/moment";
import cx from "classnames";

class Information extends Component {
  render() {
    const {
      state: {
        errors,
        invoiceAmount,
        paymentTarget
      },
      invoiceFile,
      recipient,
      onChange,
      onPaymentTargetChange,
      onRecipientClick
    } = this.props;

    return (
      <div className="row block">
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <Input
                addOn="$"
                label="Invoice Amount"
                type="number"
                name="invoiceAmount"
                value={invoiceAmount}
                placeholder={"1250"}
                error={errors.invoiceAmount}
                onChange={onChange}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="form-group">
                <label>Payment Target</label>
                <DatePicker
                  className={cx("date-picker form-control", errors.paymentTarget && "is-invalid")}
                  onChange={onPaymentTargetChange}
                  selected={moment(paymentTarget)}
                />
                {errors.paymentTarget &&
                <span className="error-label small float-right text-danger">{errors.paymentTarget}</span>}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>
                Invoice File:
                <span className="small filename">{invoiceFile && invoiceFile[0].filename.substr(20)}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-6 text-right">
          <div className="row">
            <div className="col-lg-6"></div>
            <div className="col-lg-6 text-left">
              <label>Recipient:</label>
              {
                recipient && (
                  <div className="text-muted">
                    <p>Full name: {recipient.name} {recipient.surname}</p>
                    <p>Address: {recipient.address}</p>
                    <p>Phone: {recipient.phone}</p>
                  </div>
                )
              }
              <Button
                className="btn-primary col-lg-12"
                text={`${recipient ? "Edit " : "Add "} Recipient`}
                onClick={onRecipientClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Information.propTypes = {
  state: PropTypes.object.isRequired,
  recipient: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onPaymentTargetChange: PropTypes.func.isRequired,
  onRecipientClick: PropTypes.func.isRequired
};

export default Information;