import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    const { invoices: { invoiceFile }, fetchInvoices, history } = this.props;

    if (invoiceFile) {
      history.push("invoice-info")
    }

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

  handleEditUnsavedFile = (file) => {
    const { setInvoiceFile, history } = this.props;

    setInvoiceFile(file);
    history.push("invoice-info");
  };

  renderUnsavedInvoices = () => {
    const { invoices: { unsavedInvoiceFiles } } = this.props;

    if (!unsavedInvoiceFiles || unsavedInvoiceFiles.length === 0) {
      return (
        <p className="small text-muted">No unsaved files</p>
      )
    }

    return (
      <div className="row">
        <div className="col-lg-12 small text-muted">
          <div className="row">
            {
              unsavedInvoiceFiles.map((file) => {
                let name = file.filename;

                if (name.length > 20) {
                  let firstPart = name.substr(0, 10);
                  let lastPart = name.substr(-15);

                  name = firstPart + "..." + lastPart;
                }

                return (
                  <div className="col-lg-12" key={file.id}>
                    <div className="row">
                      <div className="col-lg-7 col-md-5 col">
                        {name}
                      </div>
                      <div className="col-1">
                        <FontAwesome
                          name="trash"
                          onClick={e => this.handleDeleteUnsavedFile(file)}
                          className="text-danger"/>
                      </div>
                      <div className="col-1">
                        <FontAwesome
                          name="pencil"
                          onClick={e => this.handleEditUnsavedFile(file)}
                          className="text-primary"/>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  };

  renderInvoices = () => {
    const { allInvoices } = this.state;

    if (allInvoices.length === 0) {
      return (
        <p>No invoices created</p>
      )
    }

    return (
      allInvoices.map((i) => {
        return (
          <div className="invoice" key={i.id}>
            <div className="col-lg-12">
              <div className="row">
                <span className="text-bold">{i.originalName}</span>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-lg-3 small text-muted">
                <span>{i.additionalFiles.length} additional files</span>
              </div>
              <div className="col-lg-3 small text-muted">
                <span>${i.invoiceInfo[0].invoiceAmount}</span>
              </div>
              <div className="col-lg-6 small text-muted">
                <div className="row">
                  <div className="col-lg-12">
                    {i.recipients[0].name} {i.recipients[0].surname}
                  </div>
                  <div className="col-lg-12">
                    {i.recipients[0].address}
                  </div>
                  <div className="col-lg-12">
                    {i.recipients[0].phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    )
  };

  render() {
    return (
      <div id="invoices">
        <div className="container">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-sm-12">
                <div className="col-lg-12">
                  <div className="row">
                    <h4>Unsaved Invoices</h4>
                    <hr/>
                  </div>
                </div>
                {this.renderUnsavedInvoices()}
              </div>
              <div className="col-lg-8 col-md-5 col-sm-12">
                <div className="col-lg-12">
                  <div className="row">
                    <h4 className="w-100">
                      Invoices
                      <span className="small text-primary float-right">
                        <Link to="/">New invoice</Link>
                      </span>
                    </h4>
                  </div>
                </div>
                {this.renderInvoices()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Invoices;