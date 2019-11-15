import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Form, Button, Icon, Modal } from 'semantic-ui-react';
import { Field, reduxForm, submit } from 'redux-form';
import qs from 'query-string';
import { withAlert } from 'react-alert';

import { fetchQuestions, deleteQuestion } from './questions.reducer';
import Question from './questions.model';

import Layout from 'src/components/Layout';
import Table from 'src/components/Table';
import { Field_ } from 'src/utils';


const QuestionSearchForm = reduxForm({ form: 'questions/search' })(
  ({ handleSubmit, submitting, pristine, reset }) =>
    <Form onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field component={Field_} as={Form.Input}
          name="id" label={Question.id.label} type="text" />
        <Field component={Field_} as={Form.Input}
          name="text" label={Question.text.label} type="text" />
        <Field component={Field_} as={Form.Dropdown} selection options={Question.time_type.options}
          name="time_type" label={Question.time_type.label} type="select" />
        <Field component={Field_} as={Form.Dropdown} selection options={Question.answer_type.options}
          name="answer_type" label={Question.answer_type.label} type="select" />
      </Form.Group>
      <Button type='submit' primary loading={submitting}>
        <Icon name='search' />
        جستجو
      </Button>
      <Button type='button' secondary disabled={pristine || submitting} onClick={reset}>
        <Icon name='refresh' />
        پاک‌سازی فرم
      </Button>
    </Form>
);

let QuestionSearchResult = ({ data, pagination, deleteQuestion, alert }) => {
  const editButton = entity =>
    <Button icon as={Link} to={`/questions/${!!entity ? entity.id : '?'}`}>
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
      content={`آیا از حذف سؤال اطمینان دارید؟`}
      actions={[
        {
          key: 'yes', content: 'بله', negative: true,
          onClick: () => deleteQuestion(!!entity ? entity.id : undefined)
            .then(() => alert.success("سؤال با موفقیت حذف شد"))
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
    { key: "id", header: Question.id.label },
    { key: "text", header: Question.text.label },
    { key: "time_type", header: Question.time_type.label },
    { key: "answer_type", header: Question.answer_type.label },
    { key: "start_time", header: Question.start_time.label },
    { key: "end_time", header: Question.end_time.label },
    { key: "score", header: Question.score.label },
    { key: "tries", header: Question.tries.label },
  ];
  return <Table schema={schema} data={data} pagination={pagination} />;
};

QuestionSearchResult = withAlert()(connect(null, dispatch => ({
  deleteQuestion: id => dispatch(deleteQuestion(id)),
}))(QuestionSearchResult));


class QuestionSelect extends React.Component {
  state = {
    page: 1,
    page_size: 20,
  };
  componentDidMount() {
    this.onSubmit({});
  }
  onSubmit = values => {
    const params = qs.parse(this.props.location.search);
    return this.props.fetchQuestions({
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
        <h1>سؤالات</h1>
      </Segment>
      <Segment>
        <QuestionSearchForm onSubmit={this.onSubmit} />
      </Segment>
      <Segment>
        <Button color="green" icon as={Link} to="/questions/new"><Icon name="plus" />جدید</Button>
        <QuestionSearchResult data={data}
          pagination={{
            current_page, last_page, per_page: this.state.page_size,
            setPage: this.setPage, setPageSize: this.setPageSize,
          }} />
      </Segment>
    </Layout>;
  }
}

export default connect(state => ({
  entityList: state.questions.entityList,
}), dispatch => ({
  fetchQuestions: searchParams => dispatch(fetchQuestions(searchParams)),
  search: () => dispatch(submit('questions/search')),
}))(QuestionSelect);
