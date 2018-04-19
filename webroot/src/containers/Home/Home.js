import Home from "../../components/Home";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { testGET } from "../../actions/api/api";

function mapStateToProps(state) {
  return {
    api: {
      get: state.testGET
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    testGET
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);