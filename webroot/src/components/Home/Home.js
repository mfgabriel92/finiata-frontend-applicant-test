import React, { Component } from "react";
import Dropzone from "react-dropzone";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: []
    }
  }

  componentWillMount() {
    const { invoices: { invoiceFile }, history } = this.props;

    if (invoiceFile) {
      // history.push("invoice-info")
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      invoices: {
        uploadingInvoiceSuccess,
        invoice,
        invoiceFile
      },
      setInvoiceFile,
      history
    } = nextProps;

    if (uploadingInvoiceSuccess && invoice && !invoiceFile) {
      setInvoiceFile(invoice);
      // history.push("invoice-info");
    }
  }

  handleOnDrop = (invoice) => {
    const { uploadInvoice } = this.props;
    const data = new FormData();

    data.append("invoice", invoice[0]);

    uploadInvoice(data);
  };

  render() {
    const { invoice } = this.state;

    return (
      <div id="home">
        <div className="container">
          <h1>Upload your invoice</h1>
          <Dropzone
            accept="application/pdf"
            preventDropOnDocument={false}
            multiple={false}
            className={"invoice-dropzone"}
            activeClassName={"active-dropzone"}
            rejectClassName={"reject-dropzone"}
            onDrop={this.handleOnDrop}
          >
            <p className="align-self-center">
              {
                invoice.length > 0
                  ? invoice[0].name
                  : "drag your files here..."
              }
            </p>
          </Dropzone>
        </div>
      </div>
    )
  }
}

export default Home;