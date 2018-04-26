import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allInvoices: [],
      isLoading: false
    }
  }

  componentWillMount() {
    const { fetchInvoices } = this.props;

    fetchInvoices();
  }

  componentWillReceiveProps(nextProps) {
    const {
      invoices: {
        fetchingInvoices,
        fetchingInvoicesSuccess,
        allInvoices
      }
    } = nextProps;

    if (fetchingInvoices && !fetchingInvoicesSuccess) {
      this.setState({
        isLoading: true
      })
    }

    if (allInvoices && allInvoices.length > 0) {
      this.setState({
        allInvoices,
        isLoading: false
      })
    }
  }

  handleDeleteUnsavedFile = (file) => {
    const { deleteInvoiceFile } = this.props;
    deleteInvoiceFile(file);
  };

  renderUnsavedInvoices = () => {
    const { invoices: { unsavedInvoiceFiles } } = this.props;

    if (unsavedInvoiceFiles && unsavedInvoiceFiles.length === 0) {
      return (
        <p className="small text-muted">No unsaved files</p>
      )
    }

    return (
      <div className="small text-muted">
        {
          unsavedInvoiceFiles && unsavedInvoiceFiles.map((file) => {
            let name = file.filename;

            if (file.filename.length > 25) {
              let firstPart = file.filename.substr(0, 10);
              let lastPart = file.filename.substr(-20);

              name = firstPart + "..." + lastPart;
            }

            return (
              <p key={file.id}>
                {name} - <FontAwesome name="trash" onClick={e => this.handleDeleteUnsavedFile(file)} className="text-danger"/>
              </p>
            )
          })
        }
      </div>
    )
  };

  renderInvoices = () => {
    const { allInvoices, isLoading } = this.state;

    if (isLoading && allInvoices.length === 0) {
      return (<p>Loading...</p>)
    }

    return (
      <div>
        {
          allInvoices.map((i) => {
            return (
              <p key={i.id}>{i.filename}</p>
            )
          })
        }
      </div>
    )
  };

  render() {
    return (
      <div id="invoices">
        <div className="container">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4">
                <div className="col-lg-12">
                  <div className="row">
                    <h4>Unsaved Invoices</h4>
                    <hr/>
                  </div>
                </div>
                {this.renderUnsavedInvoices()}
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <h4>Invoices</h4>
                    </div>
                  </div>
                  {this.renderInvoices()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Invoices;