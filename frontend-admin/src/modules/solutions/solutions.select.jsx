import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Modal } from 'semantic-ui-react';
import { submit } from 'redux-form';
import qs from 'query-string';
import { withAlert } from 'react-alert';

import { fetchSolutions, deleteSolution } from './solutions.reducer';
import Solution from './solutions.model';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';


let SolutionSearchResult = ({ data, pagination, deleteSolution, alert }) => {
  const editButton = entity =>
    <Button icon as={Link} to={`/solutions/${!!entity ? entity.id : '?'}`}>
      <Icon name="edit" />
    </Button>;
  const deleteButton = entity =>
    <Modal
      trigger={
        <Button icon color="red">
          <Icon name="times" />
        </Button>
      }
      header='هشدار!'
      content={`آیا از حذف پاسخ اطمینان دارید؟`}
      actions={[
        {
          key: 'yes', content: 'بله', negative: true,
          onClick: () => deleteSolution(!!entity ? entity.id : undefined)
            .then(() => alert.success("پاسخ با موفقیت حذف شد"))
        },
        { key: 'no', content: 'خیر' },
      ]}
    />;
  const actionButtons = entity =>
    <>
      {editButton(entity)}
      {deleteButton(entity)}
    </>;
  const schema = [
    { key: "operations", header: "عملیات", render: actionButtons },
    { key: "text", header: Solution.text.label },
  ];
  return <Table schema={schema} data={data} pagination={pagination} />;
};

SolutionSearchResult = withAlert()(connect(null, dispatch => ({
  deleteSolution: id => dispatch(deleteSolution(id)),
}))(SolutionSearchResult));


class SolutionSelect extends React.Component {
  state = {
    page: 1,
    page_size: 20,
  };
  componentDidMount() {
    this.onSubmit({});
  }
  onSubmit = values => {
    const params = qs.parse(this.props.location.search);
    return this.props.fetchSolutions({
      filter: { ...params, ...values },
      page: this.state.page,
      page_size: this.state.page_size
    });
  };
  setPage = page => {
    this.setState({ page }, this.props.search);
  };
  setPageSize = page_size => {
    this.setState({ page_size }, this.props.search);
  };
  render() {
    const { data, current_page, last_page } = this.props.entityList;
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted>
        <h1>پاسخ‌ها</h1>
      </Segment>
      <Segment>
        <Button color="green" icon as={Link} to="/solutions/new"><Icon name="plus" />جدید</Button>
        <SolutionSearchResult data={data}
          pagination={{
            current_page, last_page, per_page: this.state.page_size,
            setPage: this.setPage, setPageSize: this.setPageSize,
          }} />
      </Segment>
    </Layout>;
  }
}

export default connect(state => ({
  entityList: state.solutions.entityList,
}), dispatch => ({
  fetchSolutions: searchParams => dispatch(fetchSolutions(searchParams)),
  search: () => dispatch(submit('solutions/search')),
}))(SolutionSelect);
