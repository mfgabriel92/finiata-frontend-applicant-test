import InvoiceInfo from "../../components/InvoiceInfo";
import { connect } from "react-redux";
import { addInvoiceInfo } from "../../actions/invoices/invoices";
import { fetchRecipient, addRecipient, updateRecipient } from "../../actions/recipients/recipients";

const mapActionCreators = {
  addInvoiceInfo,

  fetchRecipient,
  addRecipient,
  updateRecipient
};

const mapStateToProps = state => ({
  invoices: state.invoices,
  recipients: state.recipients
});

export default connect(mapStateToProps, mapActionCreators)(InvoiceInfo);
