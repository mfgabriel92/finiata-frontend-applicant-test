import React, { Component } from "react";
import Button from "../common/Button";
import CancelInvoiceModal from "./CancelInvoiceModal";
import RecipientModal from "./RecipientModal";
import moment from "moment";
import validate from "../../utils/validators/invoiceInfo";
import "react-datepicker/dist/react-datepicker.css";
import Information from "./Information";
import AdditionalFiles from "./AdditionalFiles";
import _ from "lodash";

class InvoiceInfo extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      invoiceId: "",
      invoiceAmount: "",
      paymentTarget: moment().add(1, 'day'),
      recipient: null,
      files: [],
      errors: {},
      isLoading: false
    };

    this.state = this.defaultState;
  }

  componentWillMount() {
    const {
      fetchRecipient,
      fetchAdditionalFiles,
      invoices: {
        invoiceFile
      },
      history
    } = this.props;

    if (!invoiceFile) {
      history.push("/")
    }

    if (invoiceFile) {
      fetchRecipient();
      fetchAdditionalFiles();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      fetchRecipient,
      invoices: {
        deletingInvoiceSuccess,
        addingInvoiceInfoSuccess
      },
      recipients: {
        fetchingRecipientSuccess,
        addingRecipientSuccess,
        updatingRecipientSuccess,
        recipient
      },
      fetchAdditionalFiles,
      additionalFiles: {
        addingAdditionalFileSuccess,
        removingAdditionalFileSuccess
      },
      deleteInvoiceFile,
      history
    } = nextProps;

    if (addingRecipientSuccess || updatingRecipientSuccess) {
      fetchRecipient();
    }

    if (addingAdditionalFileSuccess || removingAdditionalFileSuccess) {
      fetchAdditionalFiles()
    }

    if (addingInvoiceInfoSuccess) {
      console.log("Redireciona para a puta que pariu, filho da puta.");
      history.push("/invoices");
    }

    if (recipient && fetchingRecipientSuccess) {
      this.setState({ recipient });
    }

    if (deletingInvoiceSuccess) {
      deleteInvoiceFile();
      history.push("/");
    }
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

  handleRecipientManagementClick = () => {
    const { recipientModal } = this.refs;
    recipientModal.open();
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
      this.setState({ errors: {} });

      const {
        addInvoiceInfo, } = this.props;
      const { invoiceAmount, paymentTarget } = this.state;

      addInvoiceInfo({ invoiceAmount, paymentTarget });
    }
  };

  handleOnSubmitAdditionalFile = (file, description) => {
    const { addAdditionalFile } = this.props;
    const data = new FormData();

    data.append("additionalFile", file);
    data.append("description", description);

    addAdditionalFile(data, description);
  };

  handleOnDeleteAdditionalFile = (id) => {
    const { removeAdditionalFile } = this.props;
    removeAdditionalFile(id);
  };

  handleOnCancelInvoiceClick = () => {
    const { deleteInvoiceModal } = this.refs;
    deleteInvoiceModal.open();
  };

  handleOnCancelInvoiceConfirm = () => {
    const {
      setUnsavedInvoiceFile,
      deleteUnsavedInvoiceFile,
      invoices: {
        invoiceFile,
        unsavedInvoiceFiles
      },
      history
    } = this.props;


    if (_.findIndex(unsavedInvoiceFiles, { id: invoiceFile[0].id }) !== -1) {
      deleteUnsavedInvoiceFile(invoiceFile[0]);
    }

    setUnsavedInvoiceFile(invoiceFile[0]);
    history.push("invoices");
  };

  render() {
    const { recipient } = this.state;
    const {
      addRecipient,
      updateRecipient,
      recipients,
      invoices: {
        invoiceFile,
      },
      additionalFiles,
    } = this.props;

    return (
      <div id="invoice-info">
        <RecipientModal
          ref="recipientModal"
          addRecipient={addRecipient}
          updateRecipient={updateRecipient}
          recipients={recipients}
        />
        <CancelInvoiceModal
          ref="deleteInvoiceModal"
          cancelInvoiceConfirm={this.handleOnCancelInvoiceConfirm}
        />
        <div className="container">
          <div className="col-lg-12">
            <Information
              state={this.state}
              invoiceFile={invoiceFile}
              recipient={recipient}
              onChange={this.handleOnChange}
              onPaymentTargetChange={this.handleOnChangePaymentTarget}
              onRecipientClick={this.handleRecipientManagementClick}
            />
            <AdditionalFiles
              addAdditionalFile={this.handleOnSubmitAdditionalFile}
              removeAdditionalFile={this.handleOnDeleteAdditionalFile}
              additionalFiles={additionalFiles}
            />
          </div>
          <div className="col-lg-12">
            <div className="row justify-content-between">
              <div className="col-lg-3 col-md-5 col-sm-6 col-xs-12">
                <Button
                  className="btn-default col-lg-12"
                  text="Cancel"
                  onClick={this.handleOnCancelInvoiceClick}
                />
              </div>
              <div className="col-lg-3 col-md-5 col-sm-6 col-xs-12">
                <Button
                  className="btn-primary col-lg-12"
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