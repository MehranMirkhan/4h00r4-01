import React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

import { fetchReport } from './report.reducer';

import Layout from 'src/components/Layout';


class Report extends React.Component {
  componentDidMount() {
    this.props.fetchReport();
  }
  render() {
    const { report } = this.props;
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted style={{ margin: '16px 0' }}>
        <h1>گزارش</h1>
      </Segment>
      <Segment compact>
        {JSON.stringify(report)}
      </Segment>
    </Layout>;
  }
}

export default connect(
  state => ({ report: state.report }),
  dispatch => ({ fetchReport: () => dispatch(fetchReport()) }),
)(Report);
