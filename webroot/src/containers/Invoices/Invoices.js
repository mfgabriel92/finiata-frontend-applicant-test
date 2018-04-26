import Invoices from "../../components/Invoices";
import { connect } from "react-redux";
import { fetchInvoices, deleteInvoiceFile } from "../../actions/invoices/invoices";

const mapActionCreators = {
  fetchInvoices,
  deleteInvoiceFile
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Invoices);
