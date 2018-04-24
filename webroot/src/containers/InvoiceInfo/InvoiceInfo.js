import InvoiceInfo from "../../components/InvoiceInfo";
import { connect } from "react-redux";
import { addInvoiceInfo } from "../../actions/invoices/invoices";
import { fetchRecipient, addRecipient, updateRecipient } from "../../actions/recipients/recipients";
import { fetchAdditionalFiles, addAdditionalFile } from "../../actions/additionalFiles/additionalFiles";

const mapActionCreators = {
  addInvoiceInfo,

  fetchRecipient,
  addRecipient,
  updateRecipient,

  fetchAdditionalFiles,
  addAdditionalFile
};

const mapStateToProps = state => ({
  invoices: state.invoices,
  recipients: state.recipients,
  additionalFiles: state.additionalFiles
});

export default connect(mapStateToProps, mapActionCreators)(InvoiceInfo);
