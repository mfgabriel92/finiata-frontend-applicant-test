import Invoices from "../../components/Invoices";
import { connect } from "react-redux";
import { setInvoiceFile, fetchInvoices, deleteInvoiceFile } from "../../actions/invoices/invoices";

const mapActionCreators = {
  setInvoiceFile,

  fetchInvoices,
  deleteInvoiceFile
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Invoices);
