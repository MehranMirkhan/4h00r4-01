import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Statistic } from 'semantic-ui-react';

import { fetchReport } from './report.reducer';

import Layout from 'src/components/Layout';


class Report extends React.Component {
  componentDidMount() {
    this.props.fetchReport();
  }
  render() {
    const { report } = this.props;
    console.log("Report:", report);
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted style={{ margin: '16px 0' }}>
        <h1>گزارش</h1>
      </Segment>
      {report.server &&
        <Grid columns={3}>
          <Grid.Column>
            <Segment textAlign="center">
              <h2>سرور</h2>
              <div style={{ height: 12 }}/>
              زمان: {(new Date(report.server.timestamp)).toUTCString()}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment textAlign="center">
              <h2>کاربران</h2>
              <Statistic>
                <Statistic.Label>تعداد کاربران</Statistic.Label>
                <Statistic.Value>{report.users.count}</Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment textAlign="center">
              <h2>سؤالات</h2>
              <Statistic>
                <Statistic.Label>تعداد سؤالات</Statistic.Label>
                <Statistic.Value>{report.questions.count}</Statistic.Value>
              </Statistic>
            </Segment>
          </Grid.Column>
        </Grid>
      }
    </Layout>;
  }
}

export default connect(
  state => ({ report: state.report }),
  dispatch => ({ fetchReport: () => dispatch(fetchReport()) }),
)(Report);
