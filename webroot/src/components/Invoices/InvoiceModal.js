import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal";
import FontAwesome from "react-fontawesome";
import Button from "../common/Button";
import ConfirmDeletionModal from "./ConfirmDeletionModal";

class InvoiceModal extends BaseModal {
  constructor(props) {
    super(props);

    this.invoice = null;
  }

  componentWillReceiveProps(nextProps) {
    const { invoices: { deletingInvoiceSuccess } } = this.props;

    if (deletingInvoiceSuccess) {
      this.close();
    }
  }

  setInvoice = (invoice) => {
    this.invoice = invoice;
  };

  handleViewFileClick = () => {
    this.invoice && window.open(`http://localhost:3333/${this.invoice.path}`);
  };

  handleDeleteClick = () => {
    const { confirmDeletionModal } = this.refs;

    confirmDeletionModal.setId(this.invoice.id);
    confirmDeletionModal.open();
  };

  renderAdditionalFiles = () => {
    if (this.invoice && this.invoice.additionalFiles.length === 0) {
      return (
        <span className="small text-muted">No additional files</span>
      )
    }

    return (
      this.invoice && this.invoice.additionalFiles.map((file) => {

      const firstPart = file.originalName.substr(0, 20);
      const lastPart = file.originalName.substr(-10);
      const name = firstPart + "..." + lastPart;

        return (
          <div key={file.id}>
            <a className="small" href={`http://localhost:3333/${file.path}`} target="_blank">{name}</a>
          </div>
        )
      })
    )
  };

  renderHeader = () => {
    return (
      <div>
        {
          <div>
            { this.invoice && <h6 className="float-left">{this.invoice.originalName}</h6> }
            <a href="#" className="float-right view-file" onClick={this.handleViewFileClick}><FontAwesome name="eye"/></a>
          </div>
        }
      </div>
    )
  };

  renderBody = () => {
    const { onDeleteClick, invoices } = this.props;

    return (
      <div>
        <ConfirmDeletionModal ref="confirmDeletionModal" onDeleteClick={onDeleteClick} invoices={invoices}/>
        {
          this.invoice && <div className="invoice-info">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="amount">
                    <p>Invoice Value</p>
                    <div className="small">
                      <span className="text-bold">$ {this.invoice.invoiceInfo[0].invoiceAmount}</span>
                    </div>
                  </div>
                  <br/>
                  <div className="recipient">
                    <p>Recipient</p>
                    <div className="small">
                      <span>{this.invoice.recipients[0].name} {this.invoice.recipients[0].surname}</span><br/>
                      <span>{this.invoice.recipients[0].address}</span><br/>
                      <span>{this.invoice.recipients[0].phone}</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="additional-files">
                    <p>Additional Files</p>
                    {this.renderAdditionalFiles()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  };

  renderFooter = () => {
    return (
      <div className="row">
        <div className="col">
          <Button
            className="btn-danger"
            text="Delete"
            onClick={() => this.handleDeleteClick()}
          />
        </div>
        <div className="col">
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

InvoiceModal.propTypes = {
  invoices: PropTypes.object,
  onViewFileClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default InvoiceModal;