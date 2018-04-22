import Home from "../../components/Home";
import { connect } from "react-redux";
import { uploadInvoice } from "../../actions/invoices/invoices";

const mapActionCreators = {
  uploadInvoice
};

const mapStateToProps = state => ({
  invoices: state.invoices
});

export default connect(mapStateToProps, mapActionCreators)(Home);
