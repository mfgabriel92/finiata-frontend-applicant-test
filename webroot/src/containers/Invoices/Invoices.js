import Invoices from "../../components/Invoices";
import { connect } from "react-redux";
import { setInvoiceFile, fetchInvoices, deleteUnsavedInvoiceFile } from "../../actions/invoices/invoices";

const mapActionCreators = {
  setInvoiceFile,

  fetchInvoices,
  deleteInvoiceFile: deleteUnsavedInvoiceFile
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Invoices);
