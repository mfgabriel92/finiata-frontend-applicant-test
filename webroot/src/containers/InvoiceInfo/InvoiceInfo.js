import InvoiceInfo from "../../components/InvoiceInfo";
import { connect } from "react-redux";
import { addFlashMessage } from "../../actions/app";
import { addInvoiceInfo } from "../../actions/invoices/invoices";
import { fetchRecipient, addRecipient } from "../../actions/recipients/recipients";

const mapActionCreators = {
  addFlashMessage,
  addInvoiceInfo,

  fetchRecipient,
  addRecipient
};

const mapStateToProps = state => ({
  invoices: state.invoices,
  recipients: state.recipients
});

export default connect(mapStateToProps, mapActionCreators)(InvoiceInfo);
