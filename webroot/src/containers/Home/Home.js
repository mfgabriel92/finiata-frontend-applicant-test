import Home from "../../components/Home";
import { connect } from "react-redux";
import { uploadInvoice, setInvoiceFile } from "../../actions/invoices/invoices";

const mapActionCreators = {
  uploadInvoice,
  setInvoiceFile
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Home);
