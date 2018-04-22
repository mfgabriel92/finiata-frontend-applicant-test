import InvoiceInfo from "../../components/InvoiceInfo";
import { connect } from "react-redux";
import { addInvoiceInfo } from "../../actions/invoices/invoices";

const mapActionCreators = {
  addInvoiceInfo
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(InvoiceInfo);
