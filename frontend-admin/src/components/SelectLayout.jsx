import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon, Modal } from 'semantic-ui-react';
import { reduxForm, submit } from 'redux-form';
import qs from 'query-string';
import { withAlert } from 'react-alert';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import { BackButton } from 'src/components/Common';


const SearchForm = (entityName, Fields) =>
  reduxForm({ form: `${entityName}/search` })(
    props => {
      const { handleSubmit, submitting, pristine, reset } = props;
      return <Form onSubmit={handleSubmit}>

        {Fields(props)}

        <Button type='submit' icon labelPosition="left" primary
          loading={submitting}>
          <Icon name='search' />
          جستجو
        </Button>
        <Button type='button' icon labelPosition="left" secondary
          disabled={pristine || submitting} onClick={reset}>
          <Icon name='refresh' />
          پاک‌سازی فرم
        </Button>
      </Form>;
    }
  );


const SearchResult = withAlert()(({ entityName, tableSchema, data, pagination, deleteAction, alert }) => {
  const editButton = entity =>
    <Link to={`/${entityName}/${!!entity ? entity.id : '?'}`}>
      <Icon name="edit" color="black" style={{ cursor: "pointer" }} />
    </Link>
  const deleteButton = entity =>
    <Modal
      trigger={
        <Icon name="times" size="large" color="red" style={{ cursor: "pointer" }} />
      }
      header='هشدار!'
      content={`آیا از حذف اطمینان دارید؟`}
      actions={[
        {
          key: 'yes', content: 'بله', negative: true,
          onClick: () => deleteAction(!!entity ? entity.id : undefined)
            .then(() => alert.success("رکورد با موفقیت حذف شد"))
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
    ...tableSchema,
  ];
  return <Table schema={schema} data={data} pagination={pagination} />;
});


class SelectLayout extends React.Component {
  state = {
    page: 1,
    page_size: 20,
  };
  SF = undefined;
  componentDidMount() {
    this.onSubmit({});
  }
  initForms() {
    this.SF = SearchForm(this.props.entityName, this.props.SearchFields);
  }
  onSubmit = values => {
    const params = qs.parse(this.props.location.search);
    return this.props.fetchMethod({
      filter: { ...params, ...values },
      page: this.state.page,
      page_size: this.state.page_size
    });
  };
  search = () => this.props.search(`${this.props.entityName}/search`);
  setPage = page => {
    this.setState({ page }, this.search);
  };
  setPageSize = page_size => {
    this.setState({ page_size }, this.search);
  };
  render() {
    if (this.props.entityList === undefined) return null;
    if (this.props.SearchFields && !this.SF) this.initForms();
    const { data, current_page, last_page } = this.props.entityList;
    const { search } = this.props.location;
    const { title, entityName, tableSchema, deleteAction } = this.props;
    return <Layout>
      <Segment raised textAlign="center" color="blue" inverted attached="top">
        <h1>{title}</h1>
      </Segment>
      <Segment attached>
        <BackButton history={this.props.history} />
        {this.props.SearchFields && <this.SF onSubmit={this.onSubmit} />}
      </Segment>
      <Segment attached="bottom">
        <Button color="green" icon labelPosition="left"
          as={Link} to={`/${entityName}/new${search}`}>
          <Icon name="plus" />
          جدید
        </Button>
        <SearchResult entityName={entityName}
          tableSchema={tableSchema}
          data={data}
          pagination={{
            current_page, last_page, per_page: this.state.page_size,
            setPage: this.setPage, setPageSize: this.setPageSize,
          }}
          deleteAction={deleteAction} />
      </Segment>
    </Layout>;
  }
}

export default connect(null, dispatch => ({
  search: formName => dispatch(submit(formName)),
}))(SelectLayout);