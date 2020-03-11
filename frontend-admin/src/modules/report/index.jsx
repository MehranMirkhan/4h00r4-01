import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Statistic } from 'semantic-ui-react';

import { fetchReport } from './report.reducer';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import User from 'src/modules/users/users.model';


class Report extends React.Component {
  componentDidMount() {
    this.props.fetchReport();
  }
  render() {
    const { report } = this.props;
    console.log("Report:", report);
    return <Layout>
      <Segment attached="top" raised textAlign="center" color="blue" inverted>
        <h1>گزارش</h1>
      </Segment>
      <Segment attached="bottom" textAlign="center" padded>
        {report.server && <>
          <Grid columns={3}>
            <Grid.Column>
              <Segment attached="top" color="teal" textAlign="center" inverted raised>
                <h2>سرور</h2>
              </Segment>
              <Segment attached="bottom" textAlign="center" raised>
                زمان: {(new Date(report.server.timestamp)).toUTCString()}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment attached="top" color="teal" textAlign="center" inverted raised>
                <h2>کاربران</h2>
              </Segment>
              <Segment attached="bottom" textAlign="center" raised>
                <Statistic>
                  <Statistic.Label>تعداد کاربران</Statistic.Label>
                  <Statistic.Value>{report.users.count}</Statistic.Value>
                </Statistic>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment attached="top" color="teal" textAlign="center" inverted raised>
                <h2>سؤالات</h2>
              </Segment>
              <Segment attached="bottom" textAlign="center" raised>
                <Statistic>
                  <Statistic.Label>تعداد سؤالات</Statistic.Label>
                  <Statistic.Value>{report.questions.count}</Statistic.Value>
                </Statistic>
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid columns={2}>
            <Grid.Column>
              <Segment attached="top" color="teal" textAlign="center" inverted raised>
                <h2>لیدربرد روزانه</h2>
              </Segment>
              <Segment attached="bottom" textAlign="center" raised>
                <Table schema={[
                  { key: "id", header: "id" },
                  { key: "name", header: User.name.label },
                  { key: "score_daily", header: User.score_daily.label }
                ]} data={report.users.top_daily} />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment attached="top" color="teal" textAlign="center" inverted raised>
                <h2>لیدربرد هفتگی</h2>
              </Segment>
              <Segment attached="bottom" textAlign="center" raised>
                <Table schema={[
                  { key: "id", header: "id" },
                  { key: "name", header: User.name.label },
                  { key: "score_weekly", header: User.score_weekly.label }
                ]} data={report.users.top_weekly} />
              </Segment>
            </Grid.Column>
          </Grid>
          <Segment attached="top" color="teal" textAlign="center" inverted raised>
            <h2>لیدربرد تبلیغات</h2>
          </Segment>
          <Segment attached="bottom" textAlign="center" raised>
            <Table schema={[
              { key: "id", header: "id" },
              { key: "name", header: User.name.label },
              { key: "ad_watch", header: User.ad_watch.label }
            ]} data={report.users.ad_watch} />
          </Segment>
        </>}
      </Segment>
    </Layout>;
  }
}

export default connect(
  state => ({ report: state.report }),
  dispatch => ({ fetchReport: () => dispatch(fetchReport()) }),
)(Report);
