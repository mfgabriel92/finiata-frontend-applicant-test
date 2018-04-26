import Invoices from "../../components/Invoices";
import { connect } from "react-redux";
import { fetchInvoices } from "../../actions/invoices/invoices";

const mapActionCreators = {
  fetchInvoices
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Invoices);
