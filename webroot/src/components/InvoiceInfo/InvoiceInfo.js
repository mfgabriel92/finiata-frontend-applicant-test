import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import Input from "../common/Input";
import Button from "../common/Button";
import AddRecipientModal from "./AddRecipientModal";
import moment from "moment";
import validate from "../../utils/validators/invoiceInfo";
import cx from "classnames";
import "react-datepicker/dist/react-datepicker.css";

class InvoiceInfo extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      invoiceId: "",
      invoiceAmount: "",
      paymentTarget: moment().add(1, 'day'),
      files: [],
      errors: {},
      isLoading: false
    };

    this.state = this.defaultState;
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleOnChangePaymentTarget = (date) => {
    this.setState({
      paymentTarget: moment(date).format("YYYY-MM-DD HH:mm:ss")
    });
  };

  handleAddRecipientClick = () => {
    const { addRecipientModal } = this.refs;
    addRecipientModal.open();
  };

  isValid = (data) => {
    const { errors, isValid } = validate(data);

    if (!isValid) {
      this.setState({ errors });
      return false;
    }

    return true;
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    if (this.isValid(this.state)) {
      const { addInvoiceInfo } = this.props;
      const { invoiceId, invoiceAmount, paymentTarget } = this.state;

      addInvoiceInfo(1, { invoiceAmount, paymentTarget });
    }
  };

  render() {
    const { invoiceAmount, paymentTarget, errors } = this.state;
    const { addRecipient, recipients } = this.props;

    return (
      <div id="invoice-info">
        <AddRecipientModal ref="addRecipientModal" addRecipient={addRecipient} recipients={recipients}/>
        <div className="container">
          <div className="col-lg-12">
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
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label>Payment Target</label>
                      <DatePicker
                        className={cx("date-picker form-control", errors.paymentTarget && "is-invalid")}
                        onChange={this.handleOnChangePaymentTarget}
                        selected={moment(paymentTarget)}
                      />
                      {errors.paymentTarget && <span className="error-label small float-right text-danger">{errors.paymentTarget}</span>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 text-right">
                <label>Invoice file:</label>
                <Button
                  className="btn-primary col-lg-6 col-md-6 col-sm-12"
                  text="Add Recipient"
                  onClick={this.handleAddRecipientClick}
                />
              </div>
            </div>
            <div className="row block">
              <div className="col-lg-12">
                <Dropzone
                  accept="application/pdf"
                  className={"dropzone"}
                  activeClassName={"active-dropzone"}
                  rejectClassName={"reject-dropzone"}
                >
                  <p>Drag aditional files here</p>
                </Dropzone>
              </div>
              <div className="col-lg-12 text-right">
                <Button
                  className="btn-primary col-lg-2 col-md-6 col-sm-12"
                  text="Proceed"
                  onClick={this.handleOnSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceInfo;