import React, { Component } from "react";
import RecipientModal from "./RecipientModal";
import moment from "moment";
import validate from "../../utils/validators/invoiceInfo";
import "react-datepicker/dist/react-datepicker.css";
import Information from "./Information";
import AdditionalFiles from "./AdditionalFiles";

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
        invoice,
        invoiceFile
      },
      history
    } = this.props;

    if (!invoice) {
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
      recipients: {
        fetchingRecipientSuccess,
        addingRecipientSuccess,
        updatingRecipientSuccess,
        addingInvoiceInfoSuccess,
        recipient
      },
      fetchAdditionalFiles,
      additionalFiles: {
        addingAdditionalFileSuccess,
        removingAdditionalFileSuccess
      },
      history
    } = nextProps;

    if (addingRecipientSuccess || updatingRecipientSuccess) {
      fetchRecipient();
    }

    if (addingAdditionalFileSuccess || removingAdditionalFileSuccess) {
      fetchAdditionalFiles()
    }

    if (addingInvoiceInfoSuccess) {
      history.push("/");
    }

    if (recipient && fetchingRecipientSuccess) {
      this.setState({ recipient });
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

      const { addInvoiceInfo } = this.props;
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

  render() {
    const { recipient } = this.state;
    const {
      addRecipient,
      updateRecipient,
      recipients,
      invoices: {
        invoiceFile
      },
      additionalFiles,
      removeAdditionalFile
    } = this.props;

    return (
      <div id="invoice-info">
        <RecipientModal ref="recipientModal" addRecipient={addRecipient} updateRecipient={updateRecipient} recipients={recipients}/>
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
              onSubmit={this.handleOnSubmit}
              addAdditionalFile={this.handleOnSubmitAdditionalFile}
              removeAdditionalFile={this.handleOnDeleteAdditionalFile}
              additionalFiles={additionalFiles}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceInfo;