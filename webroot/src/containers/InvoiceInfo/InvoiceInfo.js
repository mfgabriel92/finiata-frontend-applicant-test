import InvoiceInfo from "../../components/InvoiceInfo";
import { connect } from "react-redux";
import { deleteInvoice, addInvoiceInfo, deleteInvoiceFile } from "../../actions/invoices/invoices";
import { fetchRecipient, addRecipient, updateRecipient } from "../../actions/recipients/recipients";
import { fetchAdditionalFiles, addAdditionalFile, removeAdditionalFile } from "../../actions/additionalFiles/additionalFiles";

const mapActionCreators = {
  deleteInvoice,
  deleteInvoiceFile,

  addInvoiceInfo,

  fetchRecipient,
  addRecipient,
  updateRecipient,

  fetchAdditionalFiles,
  addAdditionalFile,
  removeAdditionalFile
};

const mapStateToProps = state => ({
  invoices: state.invoices,
  recipients: state.recipients,
  additionalFiles: state.additionalFiles
});

export default connect(mapStateToProps, mapActionCreators)(InvoiceInfo);
